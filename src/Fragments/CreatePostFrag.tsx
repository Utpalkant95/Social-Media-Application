"use client";
import { StepOne, StepTwo } from "@/Atom/postCreateForm/PostCreateForm";
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
  const { next, prev} = useSteps();
  const [file, setFile] = useState<any>();

  return (
    <Steps>
      <StepOne next={next} prev={prev} setFile={setFile} />
      <StepTwo next={next} prev={prev} file={file}/>
    </Steps>
  );
};

export default CreatePostFrag;