import express from "express";
import demoRouter from "./routes/demoRoute.js";
import connectMongoDb from "./config/mongo-db.js";
import userRouter from "./routes/userRoute.js";
import bookRouter from "./routes/bookRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://sundeeep.vercel.app"
];

// CORS options
 const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.post("/testing", (req, res) => {
    res.status(200).json({
        message: "/testing route has been hit successfully!",
        data: req.body,
        cookies: req.cookies
    })
})

app.use("/demo", demoRouter)
app.use("/users", userRouter)
app.use("/books", bookRouter)

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