"use client";
import { explorePosts } from "@/ApiServices/PostServices";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaComment, FaHeart } from "react-icons/fa";

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["explore"],
    queryFn: explorePosts,
  });

  return (
    <div className="max-w-6xl mx-auto w-full pt-8">
      {isLoading && (
        <div className="grid grid-cols-3 gap-1">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      )}
      <div className="grid grid-cols-3 gap-1">
        {data?.map((item, index) => (
          <Link href={`p/${item._id}`}>
            <div
              className="h-96 relative cursor-pointer"
              key={item._id}
              //  onClick={() => handleClick(post)}
            >
              <Image
                src={item.file}
                alt={item.altText}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 bg-black/40 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-1/2 flex items-center gap-x-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <p className="text-white font-bold text-sm flex  gap-x-1 items-center">
                    <FaHeart />
                    {item.likeCount || 0}
                  </p>
                  <p className="text-white font-bold flex items-center gap-x-1  text-sm">
                    <FaComment />
                    {item.commnetCount || 0}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;