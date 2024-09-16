"use client";
import { createPost } from "@/ApiServices/PostServices";
import {
  StepOne,
  StepThree,
  StepTwo,
} from "@/Atom/postCreateForm/PostCreateForm";
import { useMutation } from "@tanstack/react-query";
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
