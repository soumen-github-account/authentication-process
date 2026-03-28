import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true}
}, {timestamps: true})

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
