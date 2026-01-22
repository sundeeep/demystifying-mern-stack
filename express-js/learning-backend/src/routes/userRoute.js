import express from "express";
import { createNewUser } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../validators/user.Validator.js";

const userRouter = express.Router();
// http://localhost:8000/users
userRouter.post("/", validate(createUserSchema), createNewUser)

export default userRouter;