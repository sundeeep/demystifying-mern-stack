import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt-tokens.js";

async function registerUser(req, res) {
    try {

        const existingUserWithEmail = await User.exists({ email: req.body.email })
        console.log(existingUserWithEmail);
        if (existingUserWithEmail?._id) {
            throw new Error("User with the same email, already exists!");
        }

        const existingUserWithUsername = await User.exists({ username: req.body.username })
        console.log(existingUserWithUsername);
        if (existingUserWithUsername?._id) {
            throw new Error("User with the same username, already exists!");
        }

        const existingUserWithMobile = await User.exists({ username: req.body.mobile })
        console.log(existingUserWithMobile);
        if (existingUserWithMobile?._id) {
            throw new Error("User with the same mobile, already exists!");
        }

        const newUser = new User(req.body)
        await newUser.save()
        // const newUser = await User.create(req.body)
        console.log(newUser)
        res.status(200).json({
            data: newUser,
            message: "Data has been recieved successfully!"
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        // check if user exists, with username, if not throw error
        const existedUser = await User.findOne({ username });
        console.log(existedUser);
        if (!existedUser) {
            throw new Error("User doesn't exists with the username!")
        }
        // check if password matches
        const isPasswordSame = await bcrypt.compare(password, existedUser.password);
        console.log("isPasswordSame: ", isPasswordSame);
        if (!isPasswordSame) {
            throw new Error("Wrong password!")
        }

        // create accessToken, refreshToken
        const accessToken = generateAccessToken(existedUser._id);
        const refreshToken = generateRefreshToken(existedUser._id);

        // save the refresh token inside user
        existedUser.refreshToken = refreshToken;
        await existedUser.save()

        // set the browser cookies - accessToken, refreshToken
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: true, // ONLY  for production: https
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        })

        // send the response - accessToken, refreshTOken
        res.status(200).json({
            success: true,
            message: "User loggedin successfully!",
            accessToken,
            user: {
                _id: existedUser._id
            }
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

async function logOut(req, res) {
    try {
        // get the userId from the req object
        const { userId } = req.user;
        console.log(userId);
        // Remove refresh token from the db.
        // we have to get the userId - find user document in mongodb - nullify the refreshToken
        await User.findByIdAndUpdate(userId, { refreshToken: null })

        // clear the cookie
        res.clearCookie('refreshToken');

        res.status(200).json({
            success: true,
            message: "Logged out successfully."
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

export { registerUser, loginUser, logOut };