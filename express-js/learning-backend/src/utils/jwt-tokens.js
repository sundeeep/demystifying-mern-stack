import jwt from "jsonwebtoken";

// example token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNzY5MjM0NzgxLCJleHAiOjE3NjkyMzU2ODF9.8WYpM-z_2BTFRGXdH4ANz5i2cJKI-7okne635Oi64fI

// create access token
const generateAccessToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

// create refresh token 
const generateRefreshToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

export {generateAccessToken, generateRefreshToken} // named export