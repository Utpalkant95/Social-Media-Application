import { IComment, IRESSignUpUser } from "@/ApiServices/interfaces/response";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MdDelete } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "@/ApiServices/PostServices";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";

interface IRenderCommentFrag {
  comment: IComment;
  postId: string | undefined;
  refetchComments : () => void;
}

const RenderCommentFrag = ({ comment, postId, refetchComments }: IRenderCommentFrag) => {
  const { mutate } = useMutation({
    mutationKey: ["delete comment"],
    mutationFn: deleteComment,
    onSuccess: (data) => {
      enqueueSnackbar(data && data.message, {
        variant: "success",
      });
      refetchComments();
    },
    onError: (error : AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
      });
    },
  });
  return (
    <div key={comment._id} className="flex items-center justify-between">
      <div className="flex items-center gap-x-1">
        <div className="w-9 h-9 overflow-hidden rounded-full">
          <Image
            src={comment.senderProfileImage}
            alt={`profile image ${comment.senderUsername}`}
            width={40}
            height={40}
            className="w-full h-full rounded-full overflow-hidden object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <Link href={`/${comment.senderUsername}`}>
              <span className="text-sm font-medium">
                {comment.senderUsername}
              </span>
            </Link>
            <span className="text-sm">{comment.comment}</span>
          </div>
          <p className="text-xs font-medium">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
      <div
        className="cursor-pointer"
        onClick={() =>
          mutate({ commentId: comment._id, postId: postId as string })
        }
      >
        <MdDelete />
      </div>
    </div>
  );
};

export default RenderCommentFrag;