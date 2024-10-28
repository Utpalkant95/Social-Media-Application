"use client";
import { DialogWrapper, Loader } from "@/components";
import { useUploadThing } from "@/lib/uploadthing";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export const PreviewStoryFile = ({
  next,
  prev,
  file,
  mutate,
}: {
  next: () => void;
  prev: () => void;
  file: File | null;
  mutate: (data: { file: string }) => void;
}) => {
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const { startUpload } = useUploadThing("imageUploader");

  const handleSubmit = async () => {
    setUploadingImage(true);
    const uploadedImages = await startUpload([file] as File[]);

    if (!uploadedImages) {
      enqueueSnackbar("Please try again or file size is too large", {
        variant: "error",
      });
      return;
    }

    setUploadingImage(false);

    mutate({ file: uploadedImages[0].url });
    next();
  };

  return (
    <DialogWrapper
      title="Preview"
      share={handleSubmit}
      backward={prev}
      className="max-w-2xl w-full"
    >
      <div className=" relative h-[calc(100%-40px)] overflow-hidden rounded-xl">
        <div className={`w-full h-full absolute top-0 bg-black/50 flex items-center justify-center ${uploadingImage ? "" : "hidden"}`}>
          <Loader />
        </div>
        {file && (
            <Image
              src={URL.createObjectURL(file)}
              alt="Selected File"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          )}
      </div>
    </DialogWrapper>
  );
};
