import jwt from "jsonwebtoken"
import UserModel from "../../models/UserModel.js";

export const protect = async(req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token) 
            return res.status(401).json({ success: false, message: "Not authenticated, login now !" });

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        const user = await UserModel.findById(decode.id).select("-password")
        if (!user)
            return res.status(404).json({ success: false, message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
}