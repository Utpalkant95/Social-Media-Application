import {
  decodeToken,
  getCookieValueInServerSide,
  IUserInfo,
} from "@/helpers/userInfo";
import dbConnect from "@/lib/dbConnect";
import CommentModel, { Comment } from "@/model/Comment";
import PostModel, { Post } from "@/model/Post";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const commentId = url.searchParams.get("commentId");
    const postId = url.searchParams.get("postId");
    const cookieString = request.headers.get("cookie");
    const accessToken = getCookieValueInServerSide(cookieString, "accessToken");

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Access token not found",
        },
        { status: 401 }
      );
    }

    const primaryUser: IUserInfo | null = decodeToken(accessToken);

    if (!primaryUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        { status: 401 }
      );
    }

    if (!postId || !commentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Post id or comment id not found",
        },
        { status: 400 }
      );
    }

    const comment: Comment | null = await CommentModel.findById(commentId);
    const post: Post | null = await PostModel.findById(postId);

    if (!comment || !post) {
      return NextResponse.json(
        {
          success: false,
          message: "Post or comment not found",
        },
        { status: 404 }
      );
    }

    await CommentModel.findByIdAndDelete(commentId);
    await PostModel.findByIdAndUpdate(postId, {
      $pull: { comments: commentId },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Comment deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong in deleting comment",
      },
      {
        status: 500,
      }
    );
  }
}