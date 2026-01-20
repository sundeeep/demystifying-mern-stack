import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    mobile: String,
    fullName: String
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
export default User;