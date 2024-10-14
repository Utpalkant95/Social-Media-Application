import { Button } from "@/components/ui/button";
import { IUserInfo } from "@/helpers/userInfo";
import { User } from "@/model/User";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { IoIosSettings } from "react-icons/io";
import ProfileSettingUiAtom from "./ProfileSettingUiAtom";
import { DialogSheet } from "@/components";
import { useMutation } from "@tanstack/react-query";
import {
  sendFollowRequest,
  sendUnFollowRequest,
} from "@/ApiServices/FriendServices";
import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import debounce from "lodash/debounce";
// import { useSocket } from "@/lib/SocketProvider";

interface IProfileHeaderAtom {
  user: User;
  ownViewer: boolean;
  ActualUser: IUserInfo | null;
}

const ProfileHeaderAtom = ({
  user,
  ownViewer,
  ActualUser,
}: IProfileHeaderAtom) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  // const { sendFollowNotification } = useSocket();

  useEffect(() => {
    if (user && ActualUser) {
      setIsFollowing(user?.followers.includes(ActualUser.userId as string));
    }
  }, [user, ActualUser]);

  const { mutate: SENDFOLLOWREQUEST } = useMutation({
    mutationKey: ["send follow request", user?.userName],
    mutationFn: sendFollowRequest,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data && data.message, {
        variant: "success",
      });
      setIsFollowing(true);
      // sendFollowNotification(
      //   String(user?._id) as string,
      //   ActualUser?.userId as string
      // );
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
      });
    },
  });

  const { mutate: SENDUNFOLLOWREQUEST } = useMutation({
    mutationKey: ["send unfollow request", user?.userName],
    mutationFn: sendUnFollowRequest,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data && data.message, {
        variant: "success",
      });
      setIsFollowing(false);
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
      });
    },
  });

  const sendRequestObj = {
    senderId: ActualUser?.userId as string,
    receiverId: String(user?._id) as string,
  };

  // Apply debounce of 1 second to API calls
  const handleFollow = useCallback(
    debounce(() => SENDFOLLOWREQUEST(sendRequestObj), 1000),
    [sendRequestObj]
  );

  const handleUnfollow = useCallback(
    debounce(() => SENDUNFOLLOWREQUEST(sendRequestObj), 1000),
    [sendRequestObj]
  );

  return (
    <>
      <div className="flex items-center gap-x-4">
        {/* username */}
        <div>
          <p>{user?.userName}</p>
        </div>
        {/* buttons */}
        {ownViewer && (
          <div className="flex items-center gap-x-2">
            <div className="">
              <Link href={`/${user?.userName}/edit`}>
                <Button variant="profileButton">Edit profile</Button>
              </Link>
            </div>
            {/* <div className="hidden sm:block">
              <Button variant="profileButton">view archive</Button>
            </div> */}
            <div
              className="cursor-pointer"
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              <IoIosSettings size={30} />
            </div>
          </div>
        )}

        {!ownViewer && (
          <div className="flex items-center gap-x-2">
            <div>
              {isFollowing ? (
                <Button
                  variant="profileButton"
                  className="bg-[#0095F6] text-white"
                  onClick={handleUnfollow} // Debounced unfollow
                >
                  Following
                </Button>
              ) : (
                <Button
                  variant="profileButton"
                  className="bg-[#0095F6] text-white cursor-pointer"
                  onClick={handleFollow} // Debounced follow
                >
                  Follow
                </Button>
              )}
            </div>
            <div>
              <Button variant="profileButton">Message</Button>
            </div>
          </div>
        )}
      </div>

      <DialogSheet isOpen={openDialog} onClose={() => setOpenDialog(false)}>
        <ProfileSettingUiAtom />
      </DialogSheet>
    </>
  );
};

export default ProfileHeaderAtom;
