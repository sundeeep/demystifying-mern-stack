import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../validators/user.Validator.js";

const userRouter = express.Router();
// http://localhost:8000/users
userRouter.post("/register", validate(createUserSchema), registerUser);
userRouter.post("/login", loginUser);

export default userRouter;