import { DialogWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { storySchema } from "@/schemas/StorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useRef } from "react";
import { useForm } from "react-hook-form";
import { TbPhotoVideo } from "react-icons/tb";
import { z } from "zod";

const SelectFile = ({
  next,
  setFile,
}: {
  next?: () => void;
  setFile: Dispatch<SetStateAction<File>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<z.infer<typeof storySchema>>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      file: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof storySchema>) {
    console.log(values);
    setFile(values.file);
    next && next();
  }

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("file", file);
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <DialogWrapper title="Create new post" className="max-w-2xl w-full">
      <div
        className="flex flex-col gap-y-4 items-center justify-center cursor-pointer h-[calc(100%-40px)]"
        onClick={handleFileButtonClick}
      >
        <TbPhotoVideo size={100} />
        <p className="text-xl">Drag photos and videos here</p>
        <Button
          variant="outline"
          className="bg-[#0095F6] text-white font-medium"
        >
          Select from computer
        </Button>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-full"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      ref={fileInputRef} // Ensure the ref is used for clicking
                      placeholder=""
                      type="file"
                      accept="image/*,video/*"
                      className="w-full hidden"
                      onChange={handleFileChange} // Handle the file change event
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </DialogWrapper>
  );
};

export default SelectFile;