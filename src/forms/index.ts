import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { verifySchema } from "@/schemas/verifySchema";
import { signInSchema } from "@/schemas/signInSchema";

// Define a custom hook to encapsulate the useForm logic
export const useSignUpForm = () => {
  return useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      fullName: "",
      userName: "",
      phone: "",
      password: "",
    },
  });
};

export const useSignInForm = () => {
  return useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email : "",
      password : ""
    },
  });
};

export const useVerifyForm = () => {
  return useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      emailOtp : "",
      phoneOtp : "",
      userName : ""
    },
  });
};
