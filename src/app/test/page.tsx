// "use client";
// import { } from "@/Fragments/CreatePostFrag";
// import { useState } from "react";
// // // import React, { useState, useRef } from "react";
// // // import StepWizard, { StepWizardChildProps } from "react-step-wizard";
// // // import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
// // // import { zodResolver } from "@hookform/resolvers/zod";
// // // import { z } from "zod";

// // // // Zod schemas for validation
// // // const stepOneSchema = z.object({
// // //   firstName: z.string().nonempty("First Name is required"),
// // //   lastName: z.string().nonempty("Last Name is required"),
// // // });

// // // const stepTwoSchema = z.object({
// // //   email: z.string().email("Invalid email address").nonempty("Email is required"),
// // //   phoneNumber: z.string().nonempty("Phone Number is required"),
// // // });

// // // interface StepProps extends Partial<StepWizardChildProps> {}

// // // // Step 1 Component
// // // const StepOne: React.FC<StepProps> = ({ goToStep }) => {
// // //   const methods = useForm({
// // //     resolver: zodResolver(stepOneSchema),
// // //   });
// // //   const onSubmit = methods.handleSubmit(() => {
// // //     goToStep && goToStep(2); // Go to the next step if validation passes
// // //   });

// // //   return (
// // //     <FormProvider {...methods}>
// // //       <form onSubmit={onSubmit}>
// // //         <h2>Step 1: Basic Information</h2>
// // //         <input {...methods.register("firstName")} placeholder="First Name" />
// // //         {methods.formState.errors.firstName && <p>{methods.formState.errors.firstName.message}</p>}

// // //         <input {...methods.register("lastName")} placeholder="Last Name" />
// // //         {methods.formState.errors.lastName && <p>{methods.formState.errors.lastName.message}</p>}

// // //         <button type="submit">Next</button>
// // //       </form>
// // //     </FormProvider>
// // //   );
// // // };

// // // // Step 2 Component
// // // const StepTwo: React.FC<StepProps> = ({ goToStep }) => {
// // //   const methods = useForm({
// // //     resolver: zodResolver(stepTwoSchema),
// // //   });
// // //   const onSubmit = methods.handleSubmit(() => {
// // //     goToStep && goToStep(3); // Go to the next step if validation passes
// // //   });

// // //   return (
// // //     <FormProvider {...methods}>
// // //       <form onSubmit={onSubmit}>
// // //         <h2>Step 2: Contact Details</h2>
// // //         <input {...methods.register("email")} placeholder="Email" />
// // //         {methods.formState.errors.email && <p>{methods.formState.errors.email.message}</p>}

// // //         <input {...methods.register("phoneNumber")} placeholder="Phone Number" />
// // //         {methods.formState.errors.phoneNumber && <p>{methods.formState.errors.phoneNumber.message}</p>}

// // //         <button type="button" onClick={() => goToStep && goToStep(1)}>Previous</button>
// // //         <button type="submit">Next</button>
// // //       </form>
// // //     </FormProvider>
// // //   );
// // // };

// // // // Step 3 Component
// // // const StepThree: React.FC<StepProps> = ({ goToStep }) => {
// // //   return (
// // //     <div>
// // //       <h2>Step 3: Review & Submit</h2>
// // //       <p>Review your details...</p>
// // //       <button onClick={() => goToStep && goToStep(2)}>Previous</button>
// // //       <button type="submit">Submit</button>
// // //     </div>
// // //   );
// // // };

// // // const MultiStepForm: React.FC = () => {
// // //   const stepWizardRef = useRef<InstanceType<any> | null>(null);

// // //   const onStepChange = (stats: { activeStep: number }) => {
// // //     console.log(`Current Step: ${stats.activeStep}`);
// // //   };

// // //   return (
// // //     <StepWizard instance={(el) => (stepWizardRef.current = el)} onStepChange={onStepChange}>
// // //       <StepOne />
// // //       <StepTwo />
// // //       <StepThree />
// // //     </StepWizard>
// // //   );
// // // };

// // // export default MultiStepForm;

// // import { Button } from '@/components/ui/button';
// // import React, { useState } from 'react';
// // import Cropper from 'react-easy-crop';
// // import { Slider } from '@/components/ui/slider';

// // const ImageCrop = () => {
// //   const [crop, setCrop] = useState({ x: 0, y: 0 });
// //   const [zoom, setZoom] = useState(1);
// //   const [aspect, setAspect] = useState(4 / 3); // Default aspect ratio

// //   const handleZoomChange = (value : any) => {
// //     setZoom(value[0]); // Assuming the slider returns an array
// //   };

// //   return (
// //     <>
// //     <div className="crop-container" style={{ position: 'relative', width: '100%', height: '400px' }}>
// //       <Cropper
// //         image={"https://images.unsplash.com/photo-1518082593638-b6e73b35d39a?q=80&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
// //         crop={crop}
// //         zoom={zoom}
// //         aspect={aspect}
// //         onCropChange={setCrop}
// //         onZoomChange={setZoom}
// //       />
// //       <div className="controls mt-4">
// //         <Slider
// //           defaultValue={[zoom]}
// //           min={1}
// //           max={3}
// //           step={0.1}
// //           aria-labelledby="Zoom"
// //           onValueChange={handleZoomChange}
// //         />

// //       </div>

// //     </div>
// //     <div className="aspect-ratio-buttons mt-4">
// //           <Button variant="outline" onClick={() => setAspect(16 / 9)}>16:9 Aspect Ratio</Button>
// //           <Button variant="outline" onClick={() => setAspect(4 / 3)}>4:3 Aspect Ratio</Button>
// //         </div>
// //     </>
// //   );
// // };

// // export default ImageCrop;

// import { useForm } from "react-hook-form";
// import { Steps, StepsProvider, useSteps } from "react-step-builder";

// const Page = () => {
//   return (
//     <StepsProvider>
//       <MySteps />
//     </StepsProvider>
//   );
// };

// const MySteps = () => {
//   const { next, prev,isLast } = useSteps();
//   const [file, setFile] = useState<any>();

//   return (
//     <Steps>
//       <StepOne next={next} prev={prev} setFile={setFile} />
//       <StepTwo next={next} prev={prev} file={file}/>
//     </Steps>
//   );
// };

// export default Page;

import React from 'react'

const Page = () => {
  return (
    <div>Page</div>
  )
}

export default Page
