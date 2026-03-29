import UserModel from "../../models/UserModel.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../../util/generateToken.js"

export const register = async(req, res)=>{
    try {
        const {userName, email, password} = req.body
        if(!userName || !email || !password){
            return res.json({success: false, message: "Missing details"})
        }
        const existingUsername = await UserModel.findOne({userName})
        const existingEmail = await UserModel.findOne({email})
        if(existingUsername){
            return res.json({success: false, message: "username already exist"})
        }
        if(existingEmail){
            return res.json({success: false, message: "email already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new UserModel({
            userName,
            email,
            password: hashedPassword
        })
        await user.save()

        return res.json({success: true, message: "User registered !"})
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Server error"
        });
    }
}

export const login = async(req, res) => {
    try {
        const {userName, password} = req.body
        if(!userName || !password){
            return res.json({success: false, message: "Missing details"})
        }
        const existUser = await UserModel.findOne({userName})
        if(!existUser){
            return res.json({success: false, message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, existUser.password)
        if(!isMatch){
            return res.json({success: false, message: "Invalid password"})
        }

        const token = generateToken(existUser._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.json({
            success: true,
            message: "Login successfully",
            user: existUser
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Server error"
        });  
    }
}

export const getUser = async(req, res) => {
    res.json({
        success: true,
        user: req.user
    });
}