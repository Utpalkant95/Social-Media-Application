import {
  decodeToken,
  getCookieValueInServerSide,
  IUserInfo,
} from "@/helpers/userInfo";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
import PostModel from "@/model/Post"; // If needed for checking post existence
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  await dbConnect();

  try {
    const url = new URL(request.url);
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

    if (!postId) {
      return NextResponse.json(
        {
          success: false,
          message: "Post ID not provided",
        },
        { status: 400 }
      );
    }
    
    const [user , post] = await Promise.all([
      UserModel.findById(primaryUser.userId),
      PostModel.findById(postId),
    ]);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Ensure post exists if you fetched it
    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found",
        },
        { status: 404 }
      );
    }

    // Check if post is actually liked by the user
    const hasLiked = user.liked.includes(postId);
    if (!hasLiked) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found in liked list",
        },
        { status: 404 }
      );
    }

    // Remove post from liked list and save user
    user.liked  = user.liked.filter((id : string) => id !== postId);
    await user.save();

    // Also, update the post's likeCount if necessary
    post.likeCount = post.likeCount.filter((id : string) => id.toString() !== user._id.toString());
    await post.save();

    return NextResponse.json(
      {
        success: true,
        message: "Post unliked successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while unliking the post", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
