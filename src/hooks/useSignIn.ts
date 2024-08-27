import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { signInUser } from "@/ApiServices/AuthServices";
interface CustomError {
  message: string;
  response?: {
    data?: {
      message?: string;
    };
  };
}

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .trim(),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

const useSignIn = () => {
  const router = useRouter();

  const {
    mutate,
    data,
    isLoading,
    error,
    isSuccess,
    status,
  } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: signInUser,
    onSuccess: (signInData: any) => {
      enqueueSnackbar(signInData && signInData.message, {
        variant: "success",
      });
      router.push("/");
    },
    onError: (error: CustomError) => {
      const errorMessage =
        error?.response?.data?.message || error.message || "An error occurred";
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });

      if (
        error?.response?.data?.message == "User Is Not Exist. Please Signup"
      ) {
        router.push("/account/sign-up");
      }
    },
  });

  console.log("signInData", data);
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  console.log("signInData", data);

  return { form, onSubmit, data, isLoading, error, isSuccess, status };
};



export default useSignIn;
