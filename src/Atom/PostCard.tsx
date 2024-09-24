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
import { Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getHomePageContent } from "@/ApiServices/UserServices";
import { Post } from "@/app/api/home-page-post/route";
import { LuDot } from "react-icons/lu";
import Link from "next/link";
import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { likeThePost } from "@/ApiServices/PostServices";

export default function PostCard() {
  const { data } = useQuery({
    queryKey: ["getHomePageContent"],
    queryFn: getHomePageContent,
  });

  const {mutate : likePostMuatation} = useMutation({
    mutationKey: ["sendLike"],
    mutationFn: likeThePost,
    onSuccess: (data : IRESSignUpUser) => {
      enqueueSnackbar(data && data.message, {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      })
    },
    onError: (data : AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(data && data.message, {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      })
    }
  })

  return (
    <div className="flex flex-col gap-y-4">
      {data?.map((post: Post) => {
        return (
          <Card className="w-full max-w-xl mx-auto" key={post._id}>
            <CardHeader className="flex justify-between px-4 py-2 w-full">
              <div className="flex items-center gap-x-2">
                <Avatar>
                  <AvatarImage
                    src={post.ownerId.profileImage}
                    alt={post.ownerId.userName}
                  />
                  <AvatarFallback>{post.ownerId.userName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex items-center">
                  <Link href={`/${post.ownerId.userName}`}>
                    <p className="text-sm font-medium leading-none">
                      {post.ownerId.userName}
                    </p>
                  </Link>
                  <p>
                    <LuDot />
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {post.location}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <img src={post.file} alt="Post image" className="w-full h-auto" />
            </CardContent>
            <CardFooter className="flex flex-col items-start px-4 gap-y-1 py-1">
              <div className="flex items-center w-full gap-x-3 py-2">
                <Heart
                  className={`cursor-pointer`}
                  onClick={()=>likePostMuatation({postId : post._id})}
                />
                <MessageCircle className="cursor-pointer" />
                <Send className="cursor-pointer" />
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