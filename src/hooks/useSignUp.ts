import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .trim(),
  fullName: z
    .string()
    .min(5, "Full Name must be at least 5 characters.")
    .trim()
    .regex(
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
  password: z.string().min(2, "Password must be at least 2 characters."),
});

const useSignUp = () => {
  const router = useRouter();
  const signUpFun = async (data: any): Promise<unknown> => {
    const response = await axios.post(
      "http://localhost:3000/api/sign-up",
      data
    );
    const user = await response.data;
    return user;
  };
  const {
    mutate,
    data: signUpData,
    isLoading,
    error,
    isSuccess,
    status,
  } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: (data: any) => signUpFun(data),
    onSuccess: (signUpData: any) => {
      enqueueSnackbar(signUpData && (signUpData.message as string), {
        variant: "success",
      });
      router.push("/account/sign-in");
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      userName: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return { form, onSubmit, signUpData, isLoading, error, isSuccess, status };
};

export default useSignUp;
