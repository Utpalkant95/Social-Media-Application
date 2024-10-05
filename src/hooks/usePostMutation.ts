// hooks/usePostMutations.ts
import { useMutation } from "@tanstack/react-query";
import {
  addSavedPost,
  removeSavedPost,
  likeThePost,
  unLikeThePost,
} from "@/ApiServices/PostServices";
import { enqueueSnackbar } from "notistack";
import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { AxiosError } from "axios";

export function usePostMutations() {
  const likePostMutation = useMutation({
    mutationKey: ["sendLike"],
    mutationFn: likeThePost,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data?.message, {
        variant: "success",
        autoHideDuration: 3000,
      });
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    },
  });

  const unLikePostMutation = useMutation({
    mutationKey: ["unLike"],
    mutationFn: unLikeThePost,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data?.message, {
        variant: "success",
        autoHideDuration: 3000,
      });
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    },
  });

  const savePostMutation = useMutation({
    mutationKey: ["save post"],
    mutationFn: addSavedPost,
    onSuccess: (data, { postId }) => {
      enqueueSnackbar(data?.message, {
        variant: "success",
        autoHideDuration: 2000,
      });
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    },
  });

  const unsavePostMutation = useMutation({
    mutationKey: ["unsave post"],
    mutationFn: removeSavedPost,
    onSuccess: (data, { postId }) => {
      enqueueSnackbar(data?.message, {
        variant: "success",
        autoHideDuration: 2000,
      });
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    },
  });

  return { likePostMutation,unLikePostMutation, savePostMutation, unsavePostMutation };
}