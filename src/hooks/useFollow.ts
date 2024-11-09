import { useState, useCallback, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendFollowRequest, sendUnFollowRequest } from "@/ApiServices/FriendServices";
import { enqueueSnackbar } from "notistack";
import debounce from "lodash/debounce";
import { AxiosError } from "axios";
import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { IUserInfo } from "@/helpers/userInfo";
import { User } from "@/model/User";

interface UseFollowProps {
  user: User;
  ActualUser: IUserInfo | null;
}

const useFollow = ({ user, ActualUser }: UseFollowProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  // Check if the user is already followed by the actual user
  useEffect(() => {
    if (user && ActualUser) {
      setIsFollowing(user?.followers.includes(ActualUser.userId as string));
    }
  }, [user, ActualUser]);

  const sendRequestObj = {
    senderId: ActualUser?.userId as string,
    receiverId: String(user?._id) as string,
  };

  const { mutate: SENDFOLLOWREQUEST } = useMutation({
    mutationKey: ["send follow request", user?.userName],
    mutationFn: sendFollowRequest,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data.message, { variant: "success" });
      setIsFollowing(true);
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    },
  });

  const { mutate: SENDUNFOLLOWREQUEST } = useMutation({
    mutationKey: ["send unfollow request", user?.userName],
    mutationFn: sendUnFollowRequest,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data.message, { variant: "success" });
      setIsFollowing(false);
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    },
  });

  // Debounced follow request
  const handleFollow = useCallback(
    debounce(() => SENDFOLLOWREQUEST(sendRequestObj), 1000),
    [sendRequestObj]
  );

  // Debounced unfollow request
  const handleUnfollow = useCallback(
    debounce(() => SENDUNFOLLOWREQUEST(sendRequestObj), 1000),
    [sendRequestObj]
  );

  return {
    isFollowing,
    handleFollow,
    handleUnfollow,
  };
};

export default useFollow;