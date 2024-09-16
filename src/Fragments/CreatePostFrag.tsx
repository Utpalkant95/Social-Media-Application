"use client";
import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { createPost } from "@/ApiServices/PostServices";
import {
  StepOne,
  StepThree,
  StepTwo,
} from "@/Atom/postCreateForm/PostCreateForm";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { Steps, StepsProvider, useSteps } from "react-step-builder";

const CreatePostFrag = () => {
  return (
    <StepsProvider>
      <MySteps />
    </StepsProvider>
  );
};

const MySteps = () => {
  const { next, prev } = useSteps();
  const [file, setFile] = useState<any>();

  const { data, mutate, isLoading, isSuccess } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPost,
    onSuccess: (data : IRESSignUpUser) => {
      enqueueSnackbar("Post Created Successfully", {
        variant: "success",
        autoHideDuration: 2000,
      })
    },
    onError: (error : AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
        autoHideDuration: 2000,
      })
    },
  });

  console.log("data of post creating form", data);

  return (
    <Steps>
      <StepOne next={next} setFile={setFile} />
      <StepTwo next={next} prev={prev} file={file} mutate={mutate} />
      <StepThree loading={isLoading} />
    </Steps>
  );
};

export default CreatePostFrag;
