"use client";
import { IAllPost, IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { deletePost } from "@/ApiServices/PostServices";
import { Post } from "@/app/api/home-page-post/route";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { Dispatch, SetStateAction } from "react";

interface IPostCardFun {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  post : Post | undefined;
}

const PostCardFun = ({ setIsOpen, post }: IPostCardFun) => {

  const handleCopyPostLink = () => {
    const fullUrl = window.location.href;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        enqueueSnackbar("Link copied to clipboard", {
          variant: "success",
          autoHideDuration : 1000
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        enqueueSnackbar("Failed to copy", {
          variant: "error",
          autoHideDuration : 1000
        });
      });
  };

  const {mutate : deleteMutate} = useMutation({
    mutationKey: ["deletePost"],
    mutationFn  : deletePost,
    onSuccess : (data : IRESSignUpUser) => {
      enqueueSnackbar(data && data.message, {
        variant: "success",
        autoHideDuration : 2000
      });
    },
    onError : (error : AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
        autoHideDuration : 2000
      })
    }
  })

  const menus = [
    {
      id: "1",
      title: "Delete",
      onClick: () => {
        setIsOpen(false);
        deleteMutate({postId : post?._id as string})
      },
    },
    {
      id: "2",
      title: "Hide like count to others",
      onClick: () => {
        alert("hide like count to others clicked");
      },
    },
    {
      id: "3",
      title: "Turn off commenting",
      onClick: () => {
        alert("turn off commenting clicked");
      },
    },
    {
      id: "4",
      title: "Copy link",
      onClick: () => {
        handleCopyPostLink()
      },
    },
    {
      id: "5",
      title: "Cancle",
      onClick: () => {
        setIsOpen(false);
      },
    },
  ];

  return (
    <div>
      {menus.map((item) => {
        return (
          <p
            key={item.id}
            onClick={item.onClick}
            className="cursor-pointer text-center text-sm font-medium border-t py-3 "
          >
            {item.title}
          </p>
        );
      })}
    </div>
  );
};

export default PostCardFun;
