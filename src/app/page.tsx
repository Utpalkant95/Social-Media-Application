"use client";
import { decodeToken, IUserInfo } from "@/helpers/userInfo";
import { StoryFrag } from "@/Fragments";
import { PostCard, SearchAtom, UserRecommendAtom, UserRecommentUserProfile } from "@/Atom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { changeFirstLoginOfUser, getAllUsers, getSignleUserData } from "@/ApiServices/UserServices";
import { useEffect } from "react";
import { User } from "@/model/User";
import { Button } from "@/components/ui/button";
import Logout from "@/helpers/Logout";
import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";

const Page = () => {
  const user: IUserInfo | null = decodeToken();
  const { data } = useQuery({
    queryKey: ["user", user?.username],
    queryFn: () => getSignleUserData(user?.username as string),
    enabled: !!user?.username,
  });

  const {data : allUsers} = useQuery({
    queryKey: ["getallusers"],
    queryFn: getAllUsers,
  })

  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");
    if (!hasRefreshed) {
      sessionStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }
  }, []);

  const {mutate} = useMutation({
    mutationFn : changeFirstLoginOfUser,
    onSuccess : () => {
      Logout();
    },
    onError : (error : AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error.response?.data.message, {variant : "error"})
    }
  })

  return (
    <>
      {user?.isFirstTimeLogin ? (
        <div className="border w-full h-screen px-4">
          {allUsers?.slice(0, 5).map((user : User) => {
            return (
              <UserRecommentUserProfile key={String(user._id)} profileImage={user.profileImage} userName={user.userName} followType={true}/>
            )
          })}
          <Button className="bg-[#0095F6] text-white cursor-pointer absolute bottom-4 right-8" onClick={() => mutate()}> Next</Button>
        </div>
      ) : (
        <div className="min-[1144px]:grid grid-cols-[1fr_max-content] max-w-5xl w-full mx-auto py-6 gap-x-20">
          <div className="flex max-[1144px]:items-center flex-col max-[1144px]:justify-center gap-y-4">
            <StoryFrag user={data} />
            <PostCard />
          </div>
          <div className="w-64 hidden min-[1144px]:block">
            <UserRecommendAtom user={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
