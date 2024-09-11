import { z } from "zod";

export const editProfileSchema = z.object({
  fullName: z
    .string()
    .min(5, "Full Name must be at least 5 characters.")
    .trim().regex(
      /^[A-Za-z ]+$/,
      "Full Name must not contain numbers or special characters"
    ),
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .trim()
    .regex(
      /^[a-z0-9]+$/,
      "Username must contain only lower letters and numbers."
    ),
  bio: z.string().max(300, "Bio must be less than 300 characters"),
  phone: z
    .string()
    .min(10, "Phone Number length must be 10.")
    .regex(
      /^[6-9]\d{9}$/,
      "Phone must start with 6, 7, 8, or 9 and be exactly 10 digits."
    )
    .regex(
      /^\d{10}$/,
      "Phone must contain exactly 10 digits and no letters or special characters."
    ),
    gender: z.string()
});
