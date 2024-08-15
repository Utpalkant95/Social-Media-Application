import {z} from "zod";

export const signInSchema = z.object({
    email: z.string().email("Invalid email address").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
    password : z.string().min(8, "Password must be at least 8 characters long"),
})