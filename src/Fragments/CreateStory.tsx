"use client";
import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { setStory } from "@/ApiServices/UserServices";
import LoadingStateForm from "@/Atom/postCreateForm/LoadingStateForm";
import SelectFile from "@/Atom/postCreateForm/SelectFile";
import { PreviewStoryFile } from "@/Atom/postCreateForm/StoryCreateForm";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { Steps, StepsProvider, useSteps } from "react-step-builder";

const CreateStory = () => {
  return (
    <StepsProvider>
      <MySteps />
    </StepsProvider>
  );
};

const MySteps = () => {
  const { next, prev } = useSteps();
  const [file, setFile] = useState<any>();

  const { data, mutate, isLoading } = useMutation({
    mutationKey: ["setStory"],
    mutationFn: setStory,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar("Post Created Successfully", {
        variant: "success",
        autoHideDuration: 2000,
      });
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    },
  });

  return (
    <Steps>
      <SelectFile next={next} setFile={setFile} />
      <PreviewStoryFile next={next} prev={prev} file={file} mutate={mutate}/>
      <LoadingStateForm loading={isLoading} />
    </Steps>
  );
};

export default CreateStory;