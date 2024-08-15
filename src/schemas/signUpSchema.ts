import {z} from "zod";

export const signUpSchema = z.object({
    fullName: z.string().min(5, "Full Name must be at least 5 characters long").regex( /[^a-zA-Z\s]/ , "Full Name must not contain numbers or special characters"),
    email: z.string().email("Invalid email address").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
    userName : z.string().min(5, "User Name must be at least 5 characters long").regex( /[^a-zA-Z0-9\s]/ , "User Name must not contain special characters"),
    password : z.string().min(8, "Password must be at least 8 characters long"),
})