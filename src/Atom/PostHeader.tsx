// components/PostHeader.tsx
import Image from "next/image";
import Link from "next/link";
import { LuDot } from "react-icons/lu";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Post } from "@/app/api/home-page-post/route";

interface PostHeaderProps {
  post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="flex justify-between px-2 py-1 w-full">
      <div className="flex items-center gap-x-2">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={post.ownerId.profileImage}
            alt={post.ownerId.userName}
            width={32}
            height={32}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <Link href={`#`}>
            <div className="flex items-center text-sm font-medium leading-none">
              {post.ownerId.userName} <LuDot />
              <span className="text-xs font-light">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </Link>
          <span className="text-xs capitalize">{post.location}</span>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
}
