// import express from "express";
// const demoRouter = express.Router();

import {Router} from "express";
import { demoFunction, demoHealth } from "../controllers/demoController.js";
const demoRouter = Router();

// register the api end points
// http://localhost:8000/welcome
demoRouter.get("/welcome", demoFunction);
demoRouter.get("/health", demoHealth);

export default demoRouter;