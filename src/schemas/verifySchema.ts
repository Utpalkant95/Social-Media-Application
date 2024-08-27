import { z } from "zod";

export const verifySchema = z.object({
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .trim()
    .regex(
      /^[a-z0-9]+$/,
      "Username must contain only lower letters and numbers."
    ),
  emailOtp: z
    .string()
    .length(6, " OTP must be 6 digits long")
    .regex(/^[0-9]+$/, "Email OTP must contain only numbers"),
  phoneOtp: z
    .string()
    .length(6, " OTP must be 6 digits long")
    .regex(/^[0-9]+$/, "Phone OTP must contain only numbers"),
});
