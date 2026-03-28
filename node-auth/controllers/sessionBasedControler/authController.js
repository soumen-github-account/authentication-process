import UserModel from "../../models/UserModel.js"
import bcrypt from "bcryptjs"


export const register = async(req, res) =>{
    try {
        const {userName, email, password} = req.body;
        if(!userName || !email || !password){
            return res.json({"success": false, "message": "Missing Details..."})
        }

        const existingEmail = await UserModel.findOne({email});
        const existingUserName = await UserModel.findOne({userName});

        if(existingEmail){
            return res.json({"success": false, "message": "Email already exist.."})
        }
        if(existingUserName){
            return res.json({"success": false, "message": "Username already exist.."})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            userName,
            email,
            password: hashedPassword
        })
        await user.save();
        return res.json({"success": true, "message": "Registered successfully !"})

    } catch (error) {
        console.log(error);
        res.json({"success": false, "message": "server error"})
    }
}

export const login = async(req, res) =>{
    try {
        const {userName, password} = req.body;
        if(!userName || !password) {
            return res.json({"success": false, "message": "Missing details"});
        }

        const user = await UserModel.findOne({userName});
        if(!user) {
            return res.json({"success": false, "message": "user not found.."})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({"success": false, "message": "Invalid password"})
        }

        req.session.userId = user._id;

        // -------- force save --------
        // req.session.save(() => {
        //     res.json({
        //         success: true,
        //         message: "Login successfully!"
        //     });
        // });
        res.json({
            success: true,
            message: "Login successfully!"
        });
    } catch (error) {
        console.log(error);
        res.json({"success": false, "message": error})
    }
}

export const logout = (req, res)=>{
    req.session.destroy();
    res.json({"success": true, "message": "Logout successfully !"});
}

export const getUser = async(req, res) => {
    try {
        const userId = req.session.userId;

        if(!userId){
            return res.json({success: false, message: "Not logged in"})
        }

        const user = await UserModel.findById(userId).select("-password");

        if(!user) {
            return res.json({success: false, message: "user not found"})
        }
        return res.json({success: true, user})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "server error"})
    }
}