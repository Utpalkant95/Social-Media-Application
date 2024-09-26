// components/PostCard.tsx
import { useQuery } from "@tanstack/react-query";
import { getHomePageContent } from "@/ApiServices/UserServices";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { usePostMutations } from "@/hooks/usePostMutation";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { getSavedPostsForUser } from "@/ApiServices/PostServices";

export default function PostCard() {
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const { data: posts } = useQuery({
    queryKey: ["getHomePageContent"],
    queryFn: getHomePageContent,
  });

  const { data: savedPostArr, refetch } = useQuery({
    queryKey: ["get saved post"],
    queryFn: getSavedPostsForUser,
  });

  const { likePostMutation, savePostMutation, unsavePostMutation } =
    usePostMutations();

  useEffect(() => {
    refetch();
    setSavedPosts(savedPostArr || []);
  }, [savedPostArr, savePostMutation, unsavePostMutation]);

  const handleBookmarkClick = debounce((postId: string) => {
    if (savedPosts.includes(postId)) {
      unsavePostMutation.mutate({ postId });
    } else {
      savePostMutation.mutate({ postId });
    }
  }, 1000);

  return (
    <div className="flex flex-col gap-y-4">
      {posts?.map((post) => {
        const isPostSaved = savedPosts.includes(post._id);
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
              handleBookmarkClick={handleBookmarkClick}
              likePostMutation={(postId) => likePostMutation.mutate({ postId })}
            />
          </div>
        );
      })}
    </div>
  );
}
