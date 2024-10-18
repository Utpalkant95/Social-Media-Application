"use client";
import { explorePosts } from "@/ApiServices/PostServices";
import { getHomePageContent } from "@/ApiServices/UserServices";
import PostFooter from "@/Atom/PostFooter";
import PostHeader from "@/Atom/PostHeader";
import { PostViewFrag } from "@/Fragments";
import { usePostInteractions } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CarDetailPage = ({ params }: { params: { postId: string } }) => {
  const searchParams = useSearchParams();
  const [selectedPostIndex, setSelectedPostIndex] = useState<number>(0);
  const router = useRouter();
  const type = searchParams.get("type");
  const screenType = searchParams.get("screenType");

  const fetchPosts = async () => {
    if (type === "home") {
      return await getHomePageContent();
    } else {
      return await explorePosts();
    }
  };

  const { data } = useQuery({
    queryKey: ["posts", params.postId],
    queryFn: fetchPosts,
  });

  useEffect(() => {
    if (data) {
      const selectedIndex = data.findIndex(
        (post) => post._id === params.postId
      );
      setSelectedPostIndex(selectedIndex !== -1 ? selectedIndex : 0);
    }
  }, [params.postId, data]);

  const {
    savedPosts,
    likedPosts,
    likeCounts,
    handleBookmarkClick,
    handleLikeClick
  } = usePostInteractions(data);

  return (
    <>
      {screenType === "desktop" && (
        <PostViewFrag
          posts={data}
          type={type}
          selectedIndex={selectedPostIndex}
          onClose={() => {
            setSelectedPostIndex(0);
            router.back();
          }}
          setSelectedPostIndex={setSelectedPostIndex}
        />
      )}

      {screenType === "mobile" && (
        <>
          {data?.map((post) => {
            const isPostSaved = savedPosts.includes(post._id);
            const isPostLiked = likedPosts.includes(post._id);
            const likeCount = likeCounts[post._id] || 0;
            return (
              <div className="w-full max-w-md mx-auto" key={post._id}>
                <PostHeader post={post} />
                <div className="p-0">
                  <img
                    src={post.file}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                </div>
                <PostFooter
                  post={post}
                  isPostSaved={isPostSaved}
                  isPostLiked={isPostLiked}
                  handleBookmarkClick={handleBookmarkClick}
                  handleLikeClick={handleLikeClick}
                  likeCount={likeCount}
                />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default CarDetailPage;