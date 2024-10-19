// components/PostFooter.tsx
import { Heart, MessageCircle, Send } from "lucide-react";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { Post } from "@/app/api/home-page-post/route";
import { useRouter } from "next/navigation";
import { useWindowSize } from "@/hooks";
interface PostFooterProps {
  post: Post;
  isPostSaved: boolean;
  isPostLiked: boolean;
  handleBookmarkClick: (postId: string) => void;
  handleLikeClick: (postId: string) => void;
  likeCount: number;
}

export default function PostFooter({
  post,
  isPostSaved,
  isPostLiked,
  handleBookmarkClick,
  handleLikeClick,
  likeCount,
}: PostFooterProps) {
  const router = useRouter();
  const { width } = useWindowSize();

  const handleRedirectCommentInLaptop = (id: string) => {
    return router.push(`/p/${id}?type=home`);
  };

  const handleRedirectCommentInMobile = (id: string) => {
    return router.push(`/p/${id}/comment`);
  };

  return (
    <div className="flex flex-col items-start px-2 gap-y-1 py-1">
      <div className="flex items-center justify-between w-full py-2">
        <div className="flex items-center gap-x-3">
          <div>
            {isPostLiked ? (
              <FaHeart
                size={24}
                className="cursor-pointer hover:scale-110 hover:text-red-800 transition-all duration-300"
                onClick={() => handleLikeClick(post._id)}
              />
            ) : (
              <FaRegHeart
                size={24}
                className="cursor-pointer hover:scale-110 hover:text-red-800 transition-all duration-300"
                onClick={() => handleLikeClick(post._id)}
              />
            )}
          </div>
          <MessageCircle
            className="cursor-pointer hover:scale-110 hover:text-red-800 transition-all duration-300"
            onClick={() =>
              router.push(
                `/p/${post._id}?type=home&screenType=${
                  width > 768 ? "desktop" : "mobile"
                }`
              )
            }
          />
          {/* <Send className="cursor-pointer hover:scale-110 hover:text-red-800 transition-all duration-300" /> */}
        </div>
        <div>
          {isPostSaved ? (
            <GoBookmarkFill
              size={24}
              className="cursor-pointer hover:scale-110 hover:text-red-800 transition-all duration-300"
              onClick={() => handleBookmarkClick(post._id)}
            />
          ) : (
            <GoBookmark
              size={24}
              className="cursor-pointer hover:scale-110 hover:text-red-800 transition-all duration-300"
              onClick={() => handleBookmarkClick(post._id)}
            />
          )}
        </div>
      </div>
      <div className="space-y-1 w-full">
        <p className="text-sm font-medium">{likeCount} likes</p>
        <p className="text-sm">
          <span className="font-medium">{post?.ownerId.userName}</span>{" "}
          {post?.description}
        </p>
        <p
          className="text-sm text-muted-foreground cursor-pointer"
          onClick={
            width > 768
              ? () => handleRedirectCommentInLaptop(post._id)
              : () => handleRedirectCommentInMobile(post._id)
          }
        >
          View all {post?.comments.length} comments
        </p>
      </div>
    </div>
  );
}
