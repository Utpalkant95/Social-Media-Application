import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { signUpUser } from "@/ApiServices/AuthServices";
import { useSignUpForm } from "@/forms";

const useSignUp = () => {
  const router = useRouter();
  const form = useSignUpForm();

  const { data, mutate, isLoading, status } = useMutation({
    mutationKey: ["signUp"],
    mutationFn:signUpUser,
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    mutate(values);
  };
  return { form, onSubmit, status, isLoading, data };
};

export default useSignUp;

