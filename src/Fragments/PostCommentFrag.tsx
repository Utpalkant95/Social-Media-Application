import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { addComment } from "@/ApiServices/PostServices";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";

interface IPostCommentFrag {
  postId: string;
  refetchComments: () => void;
}

const PostCommentFrag = ({ postId, refetchComments }: IPostCommentFrag) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

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
            postId,
          })
        }
      >
        Post
      </span>
    </div>
  );
};

export default PostCommentFrag;
