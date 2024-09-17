import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { updatePassword } from "@/ApiServices/UserServices";
import { useUpdatePasswordForm } from "@/forms";
import { updatePasswordSchema } from "@/schemas/updatePasswordSchema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { z } from "zod";

const useUpdatePassword = () => {
  const form = useUpdatePasswordForm();

  const {mutate, isLoading} = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: updatePassword,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data && data.message, {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      form.reset();
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    },
  });

  const onSubmit = (values: z.infer<typeof updatePasswordSchema>) => {
    mutate(values);

  };
  return { form, onSubmit , isLoading};
};

export default useUpdatePassword;
