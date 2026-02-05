import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt-tokens.js";
import jwt from "jsonwebtoken";

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
        console.log("LogIn Request Body: ", req.body);
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

        // set the httpOnly cookies - refreshToken
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: true, // ONLY  for production: https
            sameSite: 'strict',
            maxAge: 7* 24 * 60 * 60 * 1000
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

async function getUserById(req, res) {
    try {
        const userId = req.params.id;

        const existingUser = await User.exists({ _id: userId })
        console.log("Existing User:", existingUser)
        if (!existingUser._id) {
            throw new Error("User doesn't exist!")
        }

        const user = await User.findById(userId);

        res.status(200).json({
            message: "User found successfully!",
            user: user
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

async function refreshAccessToken(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;
        console.log("refreshToken from: ",refreshToken)
        if (!refreshToken) {
            throw new Error("No refresh token found in cookies.")
        }

        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const userId = decodedRefreshToken.userId;

        const existingUser = await User.findById(userId);

        if (!existingUser._id) {
            throw new Error("User not found!")
        }

        const newAccessToken = generateAccessToken(userId);

        res.status(200).json({
            success: true,
            message:"Access token has been refreshed successfully!",
            accessToken: newAccessToken
        })

    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

async function getMyProfile(req, res) {
    try {
        const userId = req.user.userId;

        const existingUser = await User.exists({ _id: userId })
        console.log("Existing User:", existingUser)
        if (!existingUser._id) {
            throw new Error("User doesn't exist!")
        }

        const user = await User.findById(userId);

        res.status(200).json({
            message: "User found successfully!",
            user: user
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

export { registerUser, loginUser, logOut, getUserById, refreshAccessToken, getMyProfile };