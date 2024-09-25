"use client";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Heart,
  MessageCircle,
  Send,
  MoreHorizontal,
  Bookmark,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getHomePageContent } from "@/ApiServices/UserServices";
import { Post } from "@/app/api/home-page-post/route";
import { LuDot } from "react-icons/lu";
import Link from "next/link";
import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { likeThePost } from "@/ApiServices/PostServices";
import Image from "next/image";

export default function PostCard() {
  const { data } = useQuery({
    queryKey: ["getHomePageContent"],
    queryFn: getHomePageContent,
  });

  const { mutate: likePostMuatation } = useMutation({
    mutationKey: ["sendLike"],
    mutationFn: likeThePost,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data && data.message, {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    },
    onError: (data: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(data && data.message, {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-y-4">
      {data?.map((post: Post) => {
        return (
          <Card className="w-full max-w-md mx-auto" key={post._id}>
            <CardHeader className="flex justify-between px-2 py-1 w-full">
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
                <div className="flex flex-col ">
                  <Link href={`#`}>
                    <div className="flex items-center text-sm font-medium leading-none">
                      {" "}
                      {post.ownerId.userName} <LuDot />{" "}
                      <span className="text-xs font-light">
                        {formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                        })}{" "}
                      </span>
                    </div>
                  </Link>
                  <span className="text-xs capitalize">{post.location}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Image
                src={post.file}
                alt="Post image"
                width={448}
                height={568}
                className="w-full h-full object-cover"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start px-2 gap-y-1 py-1">
              <div className="flex items-center justify-between w-full py-2">
                <div className="flex items-center gap-x-3">
                  <Heart
                    className={`cursor-pointer hover:scale-110 hover:text-red-800 transition-all duration-300`}
                    onClick={() => likePostMuatation({ postId: post._id })}
                  />
                  <MessageCircle className="cursor-pointer hover:scale-110 hover:text-red-800 transition-all duration-300" />
                  <Send className="cursor-pointer hover:scale-110 hover:text-red-800 transition-all duration-300" />
                </div>
                <div>
                  <Bookmark className="cursor-pointer hover:scale-110 hover:text-red-800 transition-all duration-300" />
                </div>
              </div>
              <div className="space-y-1 w-full">
                <p className="text-sm font-medium">
                  {post.likeCount.length} likes
                </p>
                <p className="text-sm">
                  <span className="font-medium">{post.ownerId.userName}</span>{" "}
                  {post.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  View all 3 comments
                </p>
                {/* <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">janedoe</span> Looks amazing!
                    😍
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">bobsmith</span> Wish I was
                    there!
                  </p>
                </div> */}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
