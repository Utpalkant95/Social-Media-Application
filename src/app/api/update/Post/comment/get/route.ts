import dbConnect from "@/lib/dbConnect";
import CommentModel from "@/model/Comment";
import PostModel, { Post } from "@/model/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const postId = url.searchParams.get("postId");

    const post: Post | null = await PostModel.findById(postId);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found",
        },
        {
          status: 404,
        }
      );
    }

    const comments = await CommentModel.find({ _id: { $in: post.comments } });
    return NextResponse.json(
      {
        success: true,
        data: comments,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
