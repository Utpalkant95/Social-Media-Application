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
      <div className="max-[1144px]:flex items-center flex-col justify-center gap-y-4">
        <StoryFrag user={user}/>
        <PostCard />
      </div>
      <div className="w-64 hidden min-[1144px]:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <div>
              <Image
                src={
                  "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=05qe_AeNbowQ7kNvgHD_c7I&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYASaeyU9jSGFck1ZKRnFVaMFapEUGaG7JXM_5xPDs-3MQ&oe=66C4344F&_nc_sid=328259"
                }
                alt="profile"
                width={44}
                height={44}
                className="rounded-full border overflow-hidden transform transition-transform duration-300 ease-in-out"
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
