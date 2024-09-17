import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { verifySchema } from "@/schemas/verifySchema";
import { signInSchema } from "@/schemas/signInSchema";
import { editProfileSchema } from "@/schemas/editProfileSchema";
import { updatePasswordSchema } from "@/schemas/updatePasswordSchema";
import { postSchema } from "@/schemas/PostSchema";
import { stepTwoSchema } from "@/Atom/postCreateForm/PostCreateForm";

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

export const useEditProfileForm = () => {
  return useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName : "",
      bio : "",
      gender : "",
      phone : "",
      userName : ""
    },
  });
};

export const useUpdatePasswordForm = () => {
  return useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      newPassword : "",
      currentPassword : "",
      confirmPassword : ""
    },
  });
};


export const useCreatePostForm = () => {
  return useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      altText : "",
      commentCount : 0,
      description : "",
      hideComment : false,
      hideLikeViewCount : false,
      likeCount : 0,
      location : "",
      shareCount : 0
    },
  });
};
