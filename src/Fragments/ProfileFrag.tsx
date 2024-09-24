import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { DialogSheet, Loader, Tab } from "@/components";
import {
  ProfilePostAtom,
  ProfileSavedAtom,
  ProfileSettingUiAtom,
  ProfileTagedAtom,
} from "@/Atom";
import { useMutation } from "@tanstack/react-query";
import { updateUserProfileImage } from "@/ApiServices/UserServices";
import { User } from "@/model/User";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { sendFollowRequest } from "@/ApiServices/FriendServices";
import { decodeToken } from "@/helpers/userInfo";
import { ISendFriendRequest } from "@/ApiServices/interfaces/request";
import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useSocket } from "@/lib/SocketProvider";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsPostcardHeart } from "react-icons/bs";
import { CiSaveDown2 } from "react-icons/ci";
import { FaUserTag } from "react-icons/fa";
import ChangePassword from "./ChangePassword";

const ProfileFrag = ({
  user,
  userName,
  ownViewer,
}: {
  user: User;
  userName: string;
  ownViewer: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const ActualUser = decodeToken();
  const { sendFollow } = useSocket();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const tabItems = [
    {
      label: "POSTS",
      value: "posts",
      content: <ProfilePostAtom userName={userName} />,
      Icon: BsPostcardHeart,
    },
    {
      label: "SAVED",
      value: "saved",
      content: <ProfileSavedAtom user={user} />,
      Icon: CiSaveDown2,
    },
    {
      label: "TAGGED",
      value: "tagged",
      content: <ProfileTagedAtom user={user} />,
      Icon: FaUserTag,
    },
  ];

  // console.log("userInPofile", user);
  // console.log("ActualUser", ActualUser);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["user profile image"],
    mutationFn: updateUserProfileImage,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data && data.message, {
        variant: "success",
      })
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
      })
    },
  });

  const {
    data: sendRequestData,
    mutate: sendRequest,
    isLoading: sendRequestLoading,
  } = useMutation({
    mutationKey: ["send friend request"],
    mutationFn: sendFollowRequest,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data && data.message, {
        variant: "success",
      });
      sendFollow(ActualUser?.userId as string, String(user?._id));
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      console.log("error", error);
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
      });
    },
  });

  const sendRequestOnj: ISendFriendRequest = {
    senderId: ActualUser?.userId as string,
    receiverId: String(user?._id),
  };

  return (
    <>
      <div className="max-w-4xl mx-auto w-full">
        {/* User name profile section */}
        <div className="profile section  py-10 flex flex-col gap-y-10">
          {/* Profile Section */}
          <div className="flex items-center gap-x-24">
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

            {/* detail section */}
            <div className="flex  flex-col gap-y-4">
              {/* fist */}
              <div className="flex items-center gap-x-4">
                {/* username */}
                <div>
                  <p>{user?.userName}</p>
                </div>
                {/* buttons */}
                {ownViewer && (
                  <div className="flex items-center gap-x-2">
                    <div>
                      <Link href={`/${user?.userName}/edit`}>
                        <Button variant="profileButton">Edit profile</Button>
                      </Link>
                    </div>
                    <div>
                      <Button variant="profileButton">view archive</Button>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setOpenDialog(true);
                        setDialogContent(ProfileSettingUiAtom);
                      }}
                    >
                      <IoIosSettings size={30} />
                    </div>
                  </div>
                )}

                {!ownViewer && (
                  <div className="flex items-center gap-x-2">
                    <div>
                      {user?.followers.includes(ActualUser?.userId as string) ? (
                        <Button
                          variant="profileButton"
                          className="bg-[#0095F6] text-white"
                          onClick={() => sendRequest(sendRequestOnj)}
                        >
                          Following
                        </Button>
                      ) : (
                        <Button
                          variant="profileButton"
                          className="bg-[#0095F6] text-white"
                          onClick={() => sendRequest(sendRequestOnj)}
                        >
                          Follow
                        </Button>
                      )}
                      {/* <Button
                        variant="profileButton"
                        className="bg-[#0095F6] text-white"
                        onClick={() => sendRequest(sendRequestOnj)}
                      >
                        Follow
                      </Button> */}
                    </div>
                    <div>
                      <Button variant="profileButton">Message</Button>
                    </div>
                    {/* <div
                      className="cursor-pointer"
                      onClick={() => {
                        setOpenDialog(true);
                        setDialogContent(ChangePassword);
                      }}
                    >
                      <HiOutlineDotsHorizontal size={30} />
                    </div> */}
                  </div>
                )}
              </div>
              {/* second */}
              <div className="flex items-center gap-x-8">
                <div>
                  <p>{user?.posts.length} posts</p>
                </div>
                <div>
                  <Link href={`/${user?.userName}/followers`}>
                    <p>{user?.followers.length} followers</p>
                  </Link>
                </div>
                <div>
                  <Link href={`/${user?.userName}/following`}>
                    <p>{user?.following.length} following</p>
                  </Link>
                </div>
              </div>
              {/* third */}
              <div>
                <p className="text-sm font-medium">{user?.fullName}</p>
              </div>
            </div>
          </div>

          {/* Highlish Section */}
          <div>
            <div className="w-20 h-20 rounded-full border flex items-center justify-center bg-[#FAFAFA] cursor-pointer">
              <GoPlus size={50} className="text-[#C7C7C7]" />
            </div>
          </div>
        </div>
        {/* post saved tagged section */}
        <div className="post section">
          <Tab
            defaultValue="posts"
            tabItems={tabItems}
            className="w-full border-t"
            TabsListClassName="bg-white"
            TabsTriggerClassName="data-[state=active]:border-t border-black rounded-none shadow-none text-xs py-2 flex items-center gap-x-1"
          />
        </div>
      </div>

      {/* three dot menu */}
      <DialogSheet
        isOpen={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        {dialogContent}
      </DialogSheet>
    </>
  );
};

export default ProfileFrag;