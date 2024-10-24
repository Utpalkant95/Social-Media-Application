import { getAllSavedPosts } from "@/ApiServices/PostServices";
import { EmptyComp } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/model/User";
import { useQuery } from "@tanstack/react-query";
import { FaComment, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { IoBookmarkOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Post } from "@/app/api/home-page-post/route";
import { useWindowSize } from "@/hooks";

const ProfileSavedAtom = ({ user }: { user: User }) => {
  const router = useRouter();
  const {width} = useWindowSize();
  const { data, isLoading } = useQuery({
    queryKey: ["saved posts"],
    queryFn: getAllSavedPosts,
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

      {!isLoading && data?.length === 0 && (
        <EmptyComp
          Icon={IoBookmarkOutline}
          label="Save"
          des="Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved."
        />
      )}
      <div className="grid grid-cols-3 gap-x-1 gap-y-1">
        {data?.map((post : Post) => {
          return (
            <div
              className="h-96 relative cursor-pointer"
              key={post._id}
              onClick={() => router.push(`/p/${post._id}?type=savedPost&screenType=${width > 768 ? "desktop" : "mobile"}&userName=${user.userName}`)}
            >
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
                    {post.likeCount.length || 0}
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
    </>
  );
};

export default ProfileSavedAtom;