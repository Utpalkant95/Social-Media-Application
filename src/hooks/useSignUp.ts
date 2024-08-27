import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { signUpUser } from "@/ApiServices/AuthServices";
import { useSignUpForm } from "@/forms";
import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";

const useSignUp = () => {
  const router = useRouter();
  const form = useSignUpForm();

  const { data, mutate, isLoading, status } = useMutation({
    mutationKey: ["signUp"],
    mutationFn:signUpUser,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data && data.message, {
        variant: "success",
      })
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error.response?.data.message, {
        variant: "error",
      })
      console.log("error", error);
    }
  });


  console.log("data", data);
  
  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    mutate(values);
  };
  return { form, onSubmit, status, isLoading, data };
};

export default useSignUp;

