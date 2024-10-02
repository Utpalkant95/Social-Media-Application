import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { updateUserProfileImage } from "@/ApiServices/UserServices";
import { Loader } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/model/User";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useRef } from "react";
import { FaCamera } from "react-icons/fa";

interface IProfileAvatarAtom {
  ownViewer: boolean;
  user: User;
}

const ProfileAvatarAtom = ({ ownViewer, user }: IProfileAvatarAtom) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate, isLoading } = useMutation({
    mutationKey: ["user profile image"],
    mutationFn: updateUserProfileImage,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data && data.message, {
        variant: "success",
      });
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
      });
    },
  });
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      <Avatar
        className=" cursor-pointer bg-yellow-800 relative max-w-36 max-h-36 w-full h-full"
        onClick={handleButtonClick}
      >
        {ownViewer && (
          <div
            className={`absolute w-full h-full bg-black/60 flex items-center justify-center ${
              user?.profileImage || isLoading ? "hidden" : ""
            } `}
          >
            <FaCamera className="text-white" size={40} />
          </div>
        )}
        <div
          className={`absolute w-full h-full bg-black/60 flex items-center justify-center ${
            isLoading ? "" : "hidden"
          }`}
        >
          <Loader className="h-10 w-10" />
        </div>
        <AvatarImage
          src={
            user?.profileImage ||
            "https://images.pexels.com/photos/28220699/pexels-photo-28220699/free-photo-of-nguoitamchuyenhouse-sai-gon-vi-t-nam-2020-saigon-vietnam-2020.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
          }
          alt="@shadcn"
          className=""
        />
        <AvatarFallback>
          <AvatarImage
            src="https://images.pexels.com/photos/28220699/pexels-photo-28220699/free-photo-of-nguoitamchuyenhouse-sai-gon-vi-t-nam-2020-saigon-vietnam-2020.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
            alt="@shadcn"
            className=""
          />
        </AvatarFallback>
      </Avatar>

      {ownViewer && (
        <input
          type="file"
          name="file"
          className="hidden"
          ref={fileInputRef}
          onChange={async (e) => {
            if (e.target.files) {
              const formData = new FormData();
              formData.append("file", e.target.files[0]);
              mutate(formData);
            }
          }}
        />
      )}
    </>
  );
};

export default ProfileAvatarAtom;