import {z} from "zod";

const createBookSchema = z.object({
    title: z.string().min(4, "Title should contain 4 letters").max(50, "Title must be less than 50 letters."),
    author: z.string().min(4, "Author should contain 4 letters").max(50, "Author must be less than 50 letters."),
    publishedYear: z.number().min(1000, "Published year must be after 1000").max(new Date().getFullYear(), "Published year can't be future").positive("PublishedYear must be a positive number"),
    pages: z.number().min(1).positive("Pages must be a positive number"),
    genre: z.string().min(3, "Genre should contain 3 letters").max(10, "Genre must be less than 10 letters.")
})

export {createBookSchema};