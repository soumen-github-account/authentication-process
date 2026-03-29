import UserModel from "../../models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../../util/generateAccessToken.js";
import { generateRefreshToken } from "../../util/generateRefreshToken.js";
import jwt from "jsonwebtoken"

export const login = async(req, res) => {
    const { userName, password } = req.body;

    const user = await UserModel.findOne({ userName });
    if (!user) {
        return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ success: false, message: "Invalid password" });
    }
    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    res.json({
        success: true,
        accessToken,
        refreshToken
    });

}

export const refreshAccessToken = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "No refresh token"
        });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid refresh token"
            });
        }

        const newAccessToken = generateAccessToken(decoded.id);

        res.json({
            success: true,
            accessToken: newAccessToken
        });
    });
}
export const getUser = async(req, res) => {
    const userId = req.userId;

    const user = await UserModel.findById(userId)
    res.json({
        success: true,
        user
    });
}