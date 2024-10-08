import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { signInUser } from "@/ApiServices/AuthServices";
import { AxiosError } from "axios";
import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { signInSchema } from "@/schemas/signInSchema";
import { useSignInForm } from "@/forms";

const useSignIn = () => {
  const router = useRouter();
  const form = useSignInForm();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: signInUser,
    onSuccess: (signInData: IRESSignUpUser) => {
      enqueueSnackbar(signInData && signInData.message, {
        variant: "success",
      });
      router.push(signInData.route);
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error.response?.data.message, {
        variant: "error",
      });

      router.push(error.response?.data.route as string);
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    mutate(values);
  };

  return { form, onSubmit, isLoading };
};

export default useSignIn;
