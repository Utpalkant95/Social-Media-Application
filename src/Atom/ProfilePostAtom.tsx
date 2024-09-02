import { getAllPosts } from "@/ApiServices/PostServices";
import { DialogSheet } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebarCompFactory } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";

const ProfilePostAtom = ({ userName }: { userName: string }) => {
  const [isDailog, setIsDailog] = React.useState<boolean>(false);
  const Component = useSidebarCompFactory({ key: 6 });

  const { data, isLoading } = useQuery({
    queryKey: ["posts", userName],
    queryFn: () => getAllPosts(userName),
  });

  return (
    <>
      {isLoading && (
        <div className="grid grid-cols-3 gap-x-1 gap-y-1">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      )}
      <div className="grid grid-cols-3 gap-x-1 gap-y-1">
        {data?.map((post) => {
          return (
            <div className="h-96 relative cursor-pointer">
              <Image
                src={post.file}
                alt={post.altText}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 bg-black/40 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-1/2 flex items-center gap-x-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <p className="text-white font-bold text-sm flex  gap-x-1 items-center">
                    <FaHeart />
                    {post.likeCount || 0}
                  </p>
                  <p className="text-white font-bold flex items-center gap-x-1  text-sm">
                    <FaComment />
                    {post.commnetCount || 0}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* <div onClick={() => setIsDailog(true)} className="cursor-pointer">
        hello open form
      </div> */}

        {/* <DialogSheet
        isOpen={isDailog}
        onClose={() => {``
          setIsDailog(false);
        }}
      >
        <Component />
      </DialogSheet> */}
      </div>
    </>
  );
};

export default ProfilePostAtom;
