"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { DialogWrapper } from "@/components";
import { z } from "zod";
import { BsEmojiSmile } from "react-icons/bs";
import { TbPhotoVideo } from "react-icons/tb";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const stepOneSchema = z.object({
  file: z.instanceof(File).optional(),
});

const stepTwoSchema = z.object({
  description: z.string().optional(),
  location: z.string().optional(),
  altText: z.string().optional(),
  hideLikeViewCount: z.boolean().optional(),
  hideComment: z.boolean().optional(),
});

export const StepOne = ({
  next,
  prev,
  setFile,
}: {
  next: () => void;
  prev: () => void;
  setFile: any;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      file: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof stepOneSchema>) {
    console.log(values);
    setFile(values.file);
    next();
  }

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("file", file); // Set the file object in the form state
      form.handleSubmit(onSubmit)(); // Automatically submit the form
    }
  };

  return (
    <DialogWrapper title="Create new post" className="">
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

export const StepTwo = ({
  next,
  prev,
  file,
}: {
  next: () => void;
  prev: () => void;
  file: File | null;
}) => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const form = useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      description: "",
      location: "",
      altText: "",
      hideLikeViewCount: false,
      hideComment: false,
    },
  });
  console.log("text", text);

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    console.log("emoji object", emojiData); // This should log the correct emoji object
    setText((prevText) => prevText + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  function onSubmit(values: z.infer<typeof stepTwoSchema>) {
    console.log(values);
    console.log("file", file);

    next();
  }

  return (
    <DialogWrapper
      title="Crop"
      share={form.handleSubmit(onSubmit)}
      backward={prev}
      className="w-2/3"
    >
      <div className="flex">
        <div className="w-[60%] h-full">
          {file && (
            <Image
              src={URL.createObjectURL(file)} // Convert the file to a URL
              alt="Selected File"
              className="h-full w-full object-cover"
              width={500}
              height={700}
            />
          )}
        </div>
        <div className="w-[40%] border overflow-y-scroll h-96">
          <div className="flex items-center gap-x-2 px-2 py-3">
            <Image
              src="https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=05qe_AeNbowQ7kNvgHD_c7I&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYASaeyU9jSGFck1ZKRnFVaMFapEUGaG7JXM_5xPDs-3MQ&oe=66C4344F&_nc_sid=328259"
              alt="logo"
              width={30}
              height={30}
              className="overflow-hidden rounded-full"
            />
            <p className="font-medium text-sm">utpal_9540</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 w-full"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder="Add a caption..."
                          value={text}
                          onChange={(e) => {
                            setText(e.target.value);
                            field.onChange(text);
                          }}
                          rows={8}
                          className="w-full border-none focus:outline-none"
                          style={{ resize: "none" }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* emoji picker */}
              <div className="flex items-center justify-between px-2 py-1 border-b">
                <BsEmojiSmile
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  className="cursor-pointer"
                />
                <p className="text-xs">{text.length}/2,200</p>
                {showEmojiPicker && (
                  <div className="absolute bottom-10 top-0 z-10">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Add a location..."
                        className="border-none bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Accordion type="single" collapsible className="w-full px-2">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Accessibility</AccordionTrigger>
                  <AccordionContent>
                    <span className="text-xs text-[#7B7B7B]">
                      Alt text describes your photos for people with visual
                      impairments. Alt text will be automatically created for
                      your photos or you can choose to write your own.
                    </span>
                    <FormField
                      control={form.control}
                      name="altText"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Write alt text..."
                              className="focus:border-none mt-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Advanced settings</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="airplane-mode">
                            Hide like and view counts on this post
                          </Label>
                          <Controller
                            name="hideLikeViewCount"
                            control={form.control}
                            render={({ field }) => (
                              <Switch
                                id="hideLikeViewCount"
                                checked={field.value} // Bind the value to react-hook-form
                                onCheckedChange={field.onChange} // Update form state on change
                              />
                            )}
                          />
                        </div>
                        <span className="pt-2 text-xs">
                          Only you will see the total number of likes and views
                          on this post. You can change this later by going to
                          the ··· menu at the top of the post. To hide like
                          counts on other people posts, go to your account
                          settings.
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="airplane-mode">
                            Turn off commenting
                          </Label>
                          <Controller
                            name="hideComment"
                            control={form.control}
                            render={({ field }) => (
                              <Switch
                                id="hideComment"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            )}
                          />
                        </div>
                        <span className="pt-2 text-xs">
                          You can change this later by going to the ··· menu at
                          the top of your post.
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </form>
          </Form>
        </div>
      </div>
    </DialogWrapper>
  );
};

const PostCreateForm = () => {
  return <div>PostCreateForm</div>;
};

export default PostCreateForm;