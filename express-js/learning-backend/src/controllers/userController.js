import User from "../models/User.js";

async function createNewUser(req, res){
    try {
        const newUser = await User.create(req.body)
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

export {createNewUser};