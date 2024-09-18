import { IAllPost, IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { addSavedPost, getAllPosts } from "@/ApiServices/PostServices";
import {
  DialogSheet,
  EmptyComp,
  GroupAvatars,
} from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebarCompFactory } from "@/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaComment } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiSaveDown2 } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Textarea } from "@/components/ui/textarea";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";

const ProfilePostAtom = ({ userName }: { userName: string }) => {
  const [isDailog, setIsDailog] = React.useState<boolean>(false);
  const [postData, setPostData] = React.useState<IAllPost | undefined>(
    undefined
  );

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const Component = useSidebarCompFactory({ key: 6 });

  const { data, isLoading } = useQuery({
    queryKey: ["posts", userName],
    queryFn: () => getAllPosts(userName),
  });

  const {mutate} = useMutation({
    mutationKey : ["add saved post"],
    mutationFn : addSavedPost,
    onSuccess : (data : IRESSignUpUser) => {
      enqueueSnackbar(data && data.message, {
        variant : "success",
        autoHideDuration : 2000
      })
    },
    onError : (error : AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.response?.data?.message, {
        variant : "error",
        autoHideDuration : 2000
      })
    }
  })

  const handleClick = (post: IAllPost) => {
    setPostData(post);
    setIsDailog(true);
  };

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setText((prevText) => prevText + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <>
      {isLoading && (
        <div className="grid grid-cols-3 gap-x-1 gap-y-1">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      )}

      {!isLoading && data?.length === 0 && (
        <EmptyComp
          Icon={CiCamera}
          des="When you share photos, they will appear on your profile."
          label="Share Photos"
        />
      )}
      <div className="grid grid-cols-3 gap-x-1 gap-y-1">
        {data?.map((post: IAllPost) => {
          return (
            <div
              className="h-96 relative cursor-pointer"
              key={post.id}
              onClick={() => handleClick(post)}
            >
              <Image
                src={post.file}
                alt={post.altText}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 bg-black/40 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-1/2 flex items-center gap-x-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <p className="text-white font-bold text-sm flex  gap-x-1 items-center">
                    <FaHeart />
                    {post.likeCount || 0}
                  </p>
                  <p className="text-white font-bold flex items-center gap-x-1  text-sm">
                    <FaComment />
                    {post.commnetCount || 0}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* <div onClick={() => setIsDailog(true)} className="cursor-pointer">
        hello open form
      </div> */}

        {/* <DialogSheet
        isOpen={isDailog}
        onClose={() => {``
          setIsDailog(false);
        }}
      >
        <Component />
      </DialogSheet> */}
      </div>

      <DialogSheet isOpen={isDailog} onClose={() => setIsDailog(false)}>
        <div className="bg-white max-w-6xl w-full h-5/6">
          {/* <div className="grid grid-cols-2 w-full">
            <div className="">
              <Image
                src={postData?.file as string}
                alt={postData?.altText as string}
                width={500}
                height={500}
                className="w-full h-4/5 object-cover"
              />
            </div>
            <div></div>
          </div> */}
          <div className="grid grid-cols-2 h-full bg-white">
            <div className="h-full overflow-hidden">
              <Image
                src={postData?.file as string}
                alt={postData?.altText as string}
                width={576}
                height={1}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="cooment section flex flex-col">
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
                  <h2>{userName}</h2>
                </div>
                <div>
                  <HiDotsHorizontal />
                </div>
              </div>

              <div className="notification seciton px-4 flex-1 border-b">hello</div>

              <div className="flex flex-col gap-y-1 py-2 border-b px-4">
                <div className="live and save section flex items-center justify-between">
                  <div className="flex items-center gap-x-3">
                    <div>
                      <FaRegHeart size={20} />
                    </div>
                    <div>
                      <FaRegComment size={20} />
                    </div>
                  </div>
                  <div className="cursor-pointer" onClick={() => mutate({postId : postData?._id as string})}>
                    <CiSaveDown2 size={20} />
                  </div>
                </div>
                <div className="flex items-start">
                  <GroupAvatars />
                </div>
              </div>

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
                <div className="w-full">
                  <Textarea
                    placeholder="Add a comment..."
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                      // field.onChange(text);
                    }}
                    rows={0}
                    className="w-full border-none focus:outline-none"
                    style={{ resize: "none" }}
                  />
                </div>
                <div>
                  <span className="cursor-pointer text-sm font-medium">Post</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogSheet>
    </>
  );
};

export default ProfilePostAtom;
