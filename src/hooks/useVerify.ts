import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useVerifyForm } from "@/forms";
import { verifySchema } from "@/schemas/verifySchema";
import { verifyUser } from "@/ApiServices/AuthServices";
import { IRESSignUpUser } from "@/ApiServices/interfaces/response";

const useVerify = () => {
  const router = useRouter();
  const form = useVerifyForm();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: verifyUser,
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


  const onSubmit = (values: z.infer<typeof verifySchema>) => {
    mutate(values);
  };

  return { form, onSubmit, isLoading };
};

export default useVerify;