"use client";
import { IComment } from "@/ApiServices/interfaces/response";
import { getComment, getPostById } from "@/ApiServices/PostServices";
import { PostCommentFrag, RenderCommentFrag } from "@/Fragments";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { postId: string } }) => {
  const { postId } = params;
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPostById(postId),
  });

  const { data: postComments, refetch: refetchComments } = useQuery({
    queryKey: ["get comment of post", postId],
    queryFn: () => getComment({ postId: postId as string }),
    enabled: !!postId,
  });
  return (
    <main className="grid grid-rows-[max-content_1fr_max-content] h-full">
      <header className="grid grid-cols-3 border-b py-2 px-2 sticky top-0 z-50">
        <div >
          <RiArrowLeftSLine size={20} className="font-semibold" onClick={() => router.back()}/>
        </div>
        <div className="text-center">
          <span className="font-semibold">Comments</span>
        </div>
        <div>{/* <span>{postId}</span> */}</div>
      </header>

      {/* render comments */}
      <ul className="h-full flex flex-col gap-y-4 mt-4 px-2">
        {postComments?.map((comment: IComment) => {
          return (
            <RenderCommentFrag
              comment={comment}
              postId={postId}
              key={comment._id}
              refetchComments={refetchComments}
            />
          );
        })}
      </ul>

      {/* Comment input section */}
      <div className="border-2">
        <PostCommentFrag postId={postId} refetchComments={refetchComments} />
      </div>
    </main>
  );
};

export default Page;
