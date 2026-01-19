import express from "express";
import demoRouter from "./routes/demoRoute.js";

const app = express();

app.use("/demo", demoRouter)

const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server is running!")
})