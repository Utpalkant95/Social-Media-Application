// components/PostCard.tsx
import { useQuery } from "@tanstack/react-query";
import { getHomePageContent } from "@/ApiServices/UserServices";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { usePostMutations } from "@/hooks/usePostMutation";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import {
  getLikedPostsForUser,
  getSavedPostsForUser,
} from "@/ApiServices/PostServices";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostCard() {
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["getHomePageContent"],
    queryFn: getHomePageContent,
  });

  const { data: savedPostArr, refetch } = useQuery({
    queryKey: ["get saved post"],
    queryFn: getSavedPostsForUser,
  });

  const { data: likedPostArr, refetch: likedPostRefetch } = useQuery({
    queryKey: ["get liked post"],
    queryFn: getLikedPostsForUser,
  });

  const {
    savePostMutation,
    unsavePostMutation,
    likePostMutation,
    unLikePostMutation,
  } = usePostMutations();

  useEffect(() => {
    refetch();
    setSavedPosts(savedPostArr || []);
  }, [likePostMutation, unsavePostMutation]);

  useEffect(() => {
    likedPostRefetch();
    setLikedPosts(likedPostArr || []);
  }, [savePostMutation, unLikePostMutation]);

  const handleBookmarkClick = debounce((postId: string) => {
    if (savedPosts.includes(postId)) {
      unsavePostMutation.mutate({ postId });
    } else {
      savePostMutation.mutate({ postId });
    }
  }, 1000);

  const handleLikeClick = debounce((postId: string) => {
    if (likedPosts.includes(postId)) {
      unLikePostMutation.mutate({ postId });
    } else {
      likePostMutation.mutate({ postId });
    }
  }, 1000);

  return (
    <div className="flex flex-col gap-y-4">
      {isLoading && (
        <div className="w-full max-w-md mx-auto flex flex-col gap-y-1">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      )}

      {posts?.map((post) => {
        const isPostSaved = savedPosts.includes(post._id);
        const isPostLiked = likedPosts.includes(post._id);
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
            />
          </div>
        );
      })}
    </div>
  );
}
