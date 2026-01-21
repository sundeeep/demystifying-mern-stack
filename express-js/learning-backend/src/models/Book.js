import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    publishedYear: {
        type: Number,
        required: true,
        min: 1000,
        max: new Date().getFullYear()
    },
    pages:{
        type: Number,
        required: true,
        min: 1
    },
    genre: {
        type: String,
        trim: true
    }

}, {timestamps: true});

const Book = mongoose.model("Book", bookSchema);

export default Book;