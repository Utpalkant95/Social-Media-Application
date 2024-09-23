import { getAllSavedPosts } from "@/ApiServices/PostServices";
import { EmptyComp } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/model/User";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaComment, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { IoBookmarkOutline } from "react-icons/io5";
import { PostViewFrag } from "@/Fragments";

const ProfileSavedAtom = ({ user }: { user: User }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(
    null
  );
  const { data, isLoading } = useQuery({
    queryKey: ["saved posts"],
    queryFn: getAllSavedPosts,
  });

  const handleOpenDialogPost = (index: number) => {
    setSelectedPostIndex(index);
    setIsDialogOpen(true);
  };

  const handleCloseDialogPost = () => {
    setIsDialogOpen(false);
    setSelectedPostIndex(null);
  };

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

      {!isLoading && data?.length === 0 && (
        <EmptyComp
          Icon={IoBookmarkOutline}
          label="Save"
          des="Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved."
        />
      )}
      <div className="grid grid-cols-3 gap-x-1 gap-y-1">
        {data?.map((post, index) => {
          return (
            <div className="h-96 relative cursor-pointer" key={post.id} onClick={() => handleOpenDialogPost(index)}>
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
                    {post.commentCount || 0}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isDialogOpen && selectedPostIndex !== null && (
        <PostViewFrag
          posts={data}
          selectedIndex={selectedPostIndex}
          onClose={handleCloseDialogPost}
          setSelectedPostIndex={setSelectedPostIndex}
        />
      )}
    </>
  );
};

export default ProfileSavedAtom;
