"use client";
import { DialogSheet, GroupAvatars, PopOver } from "@/components";
import React, { useState } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addComment,
  addSavedPost,
  getComment,
} from "@/ApiServices/PostServices";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Textarea } from "@/components/ui/textarea";
import { IComment, IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import PostCardFun from "./PostCardFun";
import { PrimaryDialog } from "@/components/PrimaryDialog";
import { useRouter } from "next/navigation";
import { Post } from "@/app/api/home-page-post/route";
import RenderCommentFrag from "./RenderCommentFrag";

const PostViewFrag = ({
  posts,
  type,
  selectedIndex,
  onClose,
  setSelectedPostIndex,
}: {
  posts: Post[] | undefined;
  selectedIndex: number;
  type: string | null;
  onClose: () => void;
  setSelectedPostIndex: (index: number) => void;
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const post = posts && posts[selectedIndex];

  const { data: postComments , refetch : refetchComments} = useQuery({
    queryKey: ["get comment of post", post?._id],
    queryFn: () => getComment({ postId: post?._id as string }),
    enabled: !!post?._id,
  });

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

  const { mutate: addCommentMutation } = useMutation({
    mutationKey: ["post comment"],
    mutationFn: addComment,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data && data.message, {
        variant: "success",
        autoHideDuration: 2000,
      });
      setText("");
      refetchComments();
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
  return (
    <>
      <DialogSheet isOpen={true} onClose={onClose}>
        <div className="w-full h-screen flex items-center justify-center gap-x-10">
          <Button
            onClick={() => {
              if (post && selectedIndex > 0) {
                const prevIndex = selectedIndex - 1;
                const prevPost = posts?.[prevIndex];
                setSelectedPostIndex(prevIndex); 
                router.push(`/p/${prevPost?._id}?type=${type}`);
              }
            }}
            disabled={selectedIndex === 0}
          >
            Left
          </Button>
          <div className="max-w-6xl w-full bg-white h-5/6">
            <div className="grid grid-cols-2 h-full bg-white">
              <div className="h-full overflow-hidden">
                <Image
                  src={post?.file as string}
                  alt={post?.altText as string}
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
                        src={
                          post?.ownerId.profileImage ||
                          "https://github.com/shadcn.png"
                        }
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h2>{post?.ownerId.userName}</h2>
                  </div>
                  <Button onClick={() => setOpen(true)}>
                    <HiDotsHorizontal />
                  </Button>
                </div>

                {/* Post details */}
                <div className="notification section px-4 flex-1 border-b">
                  {/* {post?.description} */}
                  <ul className="h-full flex flex-col gap-y-4 mt-4">
                    {postComments?.map((comment: IComment) => {
                      return (
                        <RenderCommentFrag comment={comment} postId = {post?._id} key={comment._id} refetchComments={refetchComments}/>
                      );
                    })}
                  </ul>
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
                  <span
                    className="cursor-pointer text-sm font-medium"
                    onClick={() =>
                      addCommentMutation({
                        comment: text,
                        postId: post?._id as string,
                      })
                    }
                  >
                    Post
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              if (post && selectedIndex < (posts?.length as number) - 1) {
                const nextIndex = selectedIndex + 1;
                const nextPost = posts?.[nextIndex];
                setSelectedPostIndex(nextIndex); // Update the index state
                router.push(`/p/${nextPost?._id}?type=${type}`); // Update the post ID in the URL
              }
            }}
            disabled={selectedIndex === (posts?.length as number) - 1}
          >
            Right
          </Button>
        </div>
      </DialogSheet>

      <PrimaryDialog isOpen={open}>
        <PostCardFun setIsOpen={setOpen} post={post} />
      </PrimaryDialog>
    </>
  );
};

export default PostViewFrag;
