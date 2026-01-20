import express from "express";
import { createNewUser } from "../controllers/userController.js";

const userRouter = express.Router();
// http://localhost:8000/users
userRouter.post("/", createNewUser)

export default userRouter;