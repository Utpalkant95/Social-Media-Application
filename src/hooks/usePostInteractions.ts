import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { usePostMutations } from "@/hooks/usePostMutation";
import {
  getLikedPostsForUser,
  getSavedPostsForUser,
} from "@/ApiServices/PostServices";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/app/api/home-page-post/route";

export default function usePostInteractions(posts: Post[] | undefined) {
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

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
    if (posts) {
      const initialLikeCounts = posts.reduce((acc, post) => {
        acc[post._id] = post.likeCount.length;
        return acc;
      }, {} as Record<string, number>);
      setLikeCounts(initialLikeCounts);
    }
  }, [posts]);

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
      unLikePostMutation.mutate(
        { postId },
        {
          onSuccess: () => {
            setLikedPosts((prev) => prev.filter((id) => id !== postId));
            setLikeCounts((prev) => ({
              ...prev,
              [postId]: prev[postId] - 1,
            }));
          },
        }
      );
    } else {
      likePostMutation.mutate(
        { postId },
        {
          onSuccess: () => {
            setLikedPosts((prev) => [...prev, postId]);
            setLikeCounts((prev) => ({
              ...prev,
              [postId]: prev[postId] + 1,
            }));
          },
        }
      );
    }
  }, 100);

  return {
    setSavedPosts,
    savedPosts,
    setLikedPosts,
    likedPosts,
    setLikeCounts,
    likeCounts,
    handleBookmarkClick,
    handleLikeClick,
  };
}
