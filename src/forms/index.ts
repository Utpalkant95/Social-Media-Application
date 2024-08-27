import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";

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
