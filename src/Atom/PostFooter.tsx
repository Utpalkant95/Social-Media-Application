// components/PostFooter.tsx
import { Heart, MessageCircle, Send } from "lucide-react";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { Post } from "@/app/api/home-page-post/route";

interface PostFooterProps {
  post: Post;
  isPostSaved: boolean;
  handleBookmarkClick: (postId: string) => void;
}

export default function PostFooter({
  post,
  isPostSaved,
  handleBookmarkClick
}: PostFooterProps) {
  return (
    <div className="flex flex-col items-start px-2 gap-y-1 py-1">
      <div className="flex items-center justify-between w-full py-2">
        <div className="flex items-center gap-x-3">
          <Heart
            className={`cursor-pointer hover:scale-110 hover:text-red-800 transition-all duration-300`}
          />
          <MessageCircle className="cursor-pointer hover:scale-110 hover:text-red-800 transition-all duration-300" />
          <Send className="cursor-pointer hover:scale-110 hover:text-red-800 transition-all duration-300" />
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
        <p className="text-sm font-medium">{post.likeCount.length} likes</p>
        <p className="text-sm">
          <span className="font-medium">{post.ownerId.userName}</span>{" "}
          {post.description}
        </p>
        <p className="text-sm text-muted-foreground">View all 3 comments</p>
      </div>
    </div>
  );
}
