"use client";
import { DialogSheet, GroupAvatars, PopOver } from "@/components";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { addSavedPost } from "@/ApiServices/PostServices";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Textarea } from "@/components/ui/textarea";
import { IAllPost, IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { PrimaryPopOver } from "@/components/PrimaryPopOver";

const PostViewFrag = ({
  posts,
  selectedIndex,
  onClose,
  setSelectedPostIndex,
}: {
  posts: IAllPost[] | undefined;
  selectedIndex: number;
  onClose: () => void;
  setSelectedPostIndex: (index: number) => void;
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const data: IAllPost | undefined = posts?.[selectedIndex];
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const { mutate } = useMutation({
    mutationKey: ["add saved post"],
    mutationFn: addSavedPost,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data && data.message, {
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

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setText((prevText) => prevText + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <DialogSheet isOpen={true} onClose={onClose}>
        <div className="w-full h-screen flex items-center justify-center gap-x-10">
          <Button
            onClick={() => setSelectedPostIndex(selectedIndex - 1)}
            disabled={selectedIndex === 0}
          >
            Left
          </Button>
          <div className="max-w-6xl w-full bg-white h-5/6">
            <div className="grid grid-cols-2 h-full bg-white">
              <div className="h-full overflow-hidden">
                <Image
                  src={data?.file as string}
                  alt={data?.altText as string}
                  width={576}
                  height={1}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="comment section flex flex-col">
                {/* user profile */}
                <div className="flex items-center justify-between border-b py-2 px-4">
                  <div className="flex items-center gap-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h2>USERNAME</h2>
                  </div>
                  <Button
                    onClick={handleClick}
                  >
                    <HiDotsHorizontal />
                  </Button>
                </div>

                {/* Post details */}
                <div className="notification section px-4 flex-1 border-b">
                  {data?.description}
                </div>

                {/* Live, save, and comment section */}
                <div className="flex flex-col gap-y-1 py-2 border-b px-4">
                  <div className="live and save section flex items-center justify-between">
                    <div className="flex items-center gap-x-3">
                      <FaRegHeart size={20} />
                      <FaRegComment size={20} />
                    </div>
                    <div>
                      <CiSaveDown2 size={20} />
                    </div>
                  </div>
                  <div className="flex items-start">
                    <GroupAvatars />
                  </div>
                </div>

                {/* Comment input section */}
                <div className="flex items-center gap-x-2 px-4">
                  <BsEmojiSmile
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className="cursor-pointer"
                  />
                  {showEmojiPicker && (
                    <div className="absolute bottom-10 top-0 z-10">
                      <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                  )}
                  <Textarea
                    placeholder="Add a comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={0}
                    className="w-full border-none focus:outline-none"
                    style={{ resize: "none" }}
                  />
                  <span className="cursor-pointer text-sm font-medium">
                    Post
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setSelectedPostIndex(selectedIndex + 1)}
            disabled={selectedIndex === (posts?.length as number) - 1}
          >
            Right
          </Button>
        </div>
      </DialogSheet>

      <PrimaryPopOver anchor={anchor} open={open} onClose={handleClose}>
        <div>The content of the Popup.</div>
      </PrimaryPopOver>
    </>
  );
};

export default PostViewFrag;