import express from "express";
import demoRouter from "./routes/demoRoute.js";
import connectMongoDb from "./config/mongo-db.js";
import userRouter from "./routes/userRoute.js";

const app = express();

app.use(express.json());

app.use("/demo", demoRouter)
app.use("/users", userRouter)

const PORT = 8000;

async function startBackendApplication(){
    await connectMongoDb();
    startHttpServer()
}


function startHttpServer(){
    app.listen(PORT, async() => {
            console.log("Server is running!")
    })
}


startBackendApplication();