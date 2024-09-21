"use client";
import { DialogWrapper } from "@/components";
import Image from "next/image";

export const PreviewStoryFile = ({
  next,
  prev,
  file,
  mutate,
}: {
  next: () => void;
  prev: () => void;
  file: File | null;
  mutate: (data: FormData) => void;
}) => {

  const handleSubmit = () => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    mutate(formData);
    next();
  }

  return (
    <DialogWrapper
      title="Preview"
      share={handleSubmit}
      backward={prev}
      className="max-w-2xl w-full"
    >
        <div className="h-[calc(100%-40px)] overflow-hidden rounded-xl">
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