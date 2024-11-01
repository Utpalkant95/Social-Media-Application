"use client";
import { DialogSheet } from "@/components";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getComment } from "@/ApiServices/PostServices";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiDotsHorizontal } from "react-icons/hi";
import { IComment } from "@/ApiServices/interfaces/response";
import { Button } from "@/components/ui/button";
import PostCardFun from "./PostCardFun";
import { PrimaryDialog } from "@/components/PrimaryDialog";
import { useRouter } from "next/navigation";
import { Post } from "@/app/api/home-page-post/route";
import RenderCommentFrag from "./RenderCommentFrag";
import PostFooter from "@/Atom/PostFooter";
import { usePostInteractions, useWindowSize } from "@/hooks";
import { PostCommentFrag } from "@/Fragments";
import { useState } from "react";

const PostViewFrag = ({
  posts,
  type,
  selectedIndex,
  onClose,
  setSelectedPostIndex,
  userName
}: {
  posts: Post[] | undefined;
  selectedIndex: number;
  type: string | null;
  onClose: () => void;
  setSelectedPostIndex: (index: number) => void;
  userName : string | null;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { width } = useWindowSize();

  const {
    savedPosts,
    likedPosts,
    likeCounts,
    handleBookmarkClick,
    handleLikeClick,
  } = usePostInteractions(posts);

  const post: Post | undefined = posts && posts[selectedIndex];

  const { data: postComments, refetch: refetchComments } = useQuery({
    queryKey: ["get comment of post", post?._id],
    queryFn: () => getComment({ postId: post?._id as string }),
    enabled: !!post?._id,
  });

  const isPostSaved = savedPosts.includes(post?._id as string);
  const isPostLiked = likedPosts.includes(post?._id as string);
  const likeCount = likeCounts[post?._id as string] || 0;
  return (
    <>
      <DialogSheet isOpen={true} onClose={onClose}>
        <div className="w-full h-screen flex items-center justify-center gap-x-10">
          <Button
            onClick={() => {
              if (post && selectedIndex > 0) {
                const prevIndex = selectedIndex - 1;
                const prevPost = posts?.[prevIndex];
                setSelectedPostIndex(prevIndex);
                router.push(`/p/${prevPost?._id}?type=${type}&screenType=${width > 768 ? "desktop" : "mobile"}&userName=${userName}`);
              }
            }}
            disabled={selectedIndex === 0}
          >
            Left
          </Button>
          <div className="max-w-6xl w-full bg-white h-5/6">
            <div className="grid grid-cols-2 h-full bg-white">
              <div className="h-full overflow-hidden">
                <Image
                  src={post?.file as string}
                  alt={post?.altText as string}
                  width={576}
                  height={1}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="comment section flex flex-col">
                {/* user profile */}
                <div className="flex items-center justify-between border-b py-2 px-4">
                  <div className="flex items-center gap-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={
                          post?.ownerId.profileImage ||
                          "https://github.com/shadcn.png"
                        }
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h2>{post?.ownerId.userName}</h2>
                  </div>
                  <Button onClick={() => setOpen(true)}>
                    <HiDotsHorizontal />
                  </Button>
                </div>

                {/* Post details */}
                <div className="notification section px-4 flex-1 border-b">
                  {/* {post?.description} */}
                  <ul className="h-full flex flex-col gap-y-4 mt-4">
                    {postComments?.map((comment: IComment) => {
                      return (
                        <RenderCommentFrag
                          comment={comment}
                          postId={post?._id}
                          key={comment._id}
                          refetchComments={refetchComments}
                        />
                      );
                    })}
                  </ul>
                </div>

                {/* Live, save, and comment section */}
                <PostFooter
                  handleBookmarkClick={handleBookmarkClick}
                  handleLikeClick={handleLikeClick}
                  isPostLiked={isPostLiked}
                  isPostSaved={isPostSaved}
                  likeCount={likeCount}
                  post={post as Post}
                />

                {/* Comment input section */}
                <PostCommentFrag
                  postId={post?._id as string}
                  refetchComments={refetchComments}
                />
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              if (post && selectedIndex < (posts?.length as number) - 1) {
                const nextIndex = selectedIndex + 1;
                const nextPost = posts?.[nextIndex];
                setSelectedPostIndex(nextIndex);
                router.push(`/p/${nextPost?._id}?type=${type}&screenType=${width > 768 ? "desktop" : "mobile"}&userName=${userName}`); 
              }
            }}
            disabled={selectedIndex === (posts?.length as number) - 1}
          >
            Right
          </Button>
        </div>
      </DialogSheet>

      <PrimaryDialog isOpen={open}>
        <PostCardFun setIsOpen={setOpen} post={post} />
      </PrimaryDialog>
    </>
  );
};

export default PostViewFrag;