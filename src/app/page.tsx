"use client";
import Image from "next/image";
import { decodeToken } from "@/helpers/userInfo";
import React from "react";
import { StoryFrag } from "@/Fragments";
import { PostCard, UserRecommendAtom } from "@/Atom";

const Page = () => {
  const user = decodeToken();
  return (
    <div className="min-[1144px]:grid grid-cols-[1fr_max-content] max-w-5xl w-full mx-auto py-6 gap-x-20">
      <div className="flex max-[1144px]:items-center flex-col max-[1144px]:justify-center gap-y-4">
        <StoryFrag user={user}/>
        <PostCard />
      </div>
      <div className="w-64 hidden min-[1144px]:block">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-x-2">
            <div className="w-11 h-11 overflow-hidden rounded-full">
              <Image
                src={user?.profileImage as string}
                alt="profile"
                width={44}
                height={44}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.username}</span>
              <span className="text-xs font-light text-gray-500">
                {user?.username}
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs text-blue-500 cursor-pointer">Switch</span>
          </div>
        </div>
        <UserRecommendAtom />
      </div>
    </div>
  );
};

export default Page;