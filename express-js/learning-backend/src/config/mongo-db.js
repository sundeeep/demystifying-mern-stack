import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const MONGO_DB_URI = process.env.MONGO_DB_URI;

async function connectMongoDb() {
    try {
        const mongo = await mongoose.connect(MONGO_DB_URI);
        console.log("MongoDB has been connected successfully!");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectMongoDb;