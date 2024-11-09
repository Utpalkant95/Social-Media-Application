"use client";
import { explorePosts } from "@/ApiServices/PostServices";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FaComment, FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useWindowSize } from "@/hooks";

const Page = () => {
  const { width } = useWindowSize();
  const { data, isLoading } = useQuery({
    queryKey: ["explore"],
    queryFn: explorePosts,
  });
  return (
    <div className="max-w-6xl mx-auto w-full pt-2 sm:pt-8">
      {isLoading && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-1">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      )}
      <div className="grid  grid-cols-2 sm:grid-cols-3 gap-1">
        {data?.map((item) => (
          <Link href={`p/${item._id}?screenType=${width > 768 ? "desktop" : "mobile"}&type=explore`} key={item._id}>
            <div className="h-96 relative cursor-pointer" key={item._id}>
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
                    {item.likeCount.length || 0}
                  </p>
                  <p className="text-white font-bold flex items-center gap-x-1  text-sm">
                    <FaComment />
                    {item.commentCount || 0}
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