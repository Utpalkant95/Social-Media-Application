"use client";
import Image from "next/image";
import { decodeToken } from "@/helpers/userInfo";
import React from "react";
import { StoryFrag } from "@/Fragments";
import { PostCard, UserRecommendAtom } from "@/Atom";
import { useQuery } from "@tanstack/react-query";
import { getSignleUserData } from "@/ApiServices/UserServices";

const Page = () => {
  const user = decodeToken();
  const { data } = useQuery({
    queryKey: ["user", user?.username],
    queryFn: () => getSignleUserData(user?.username as string),
    enabled: !!user?.username,
  });

  return (
    <div className="min-[1144px]:grid grid-cols-[1fr_max-content] max-w-5xl w-full mx-auto py-6 gap-x-20">
      <div className="flex max-[1144px]:items-center flex-col max-[1144px]:justify-center gap-y-4">
        <StoryFrag user={data} />
        <PostCard />
      </div>
      <div className="w-64 hidden min-[1144px]:block">
        <UserRecommendAtom user={data}/>
      </div>
  </div>
  );
};

export default Page;