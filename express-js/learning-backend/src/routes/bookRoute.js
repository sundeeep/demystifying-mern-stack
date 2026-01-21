import express from "express";
import createNewBook from "../controllers/bookController.js";
import { validate } from "../middlewares/validate.js";
import { createBookSchema } from "../validators/bookValidator.js";

const bookRouter = express.Router();

bookRouter.post("/", validate(createBookSchema), createNewBook);
// bookRouter.put("/:id");


export default bookRouter;