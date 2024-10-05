import {
  decodeToken,
  getCookieValueInServerSide,
  IUserInfo,
} from "@/helpers/userInfo";
import dbConnect from "@/lib/dbConnect";
import PostModel, { Post } from "@/model/Post";
import UserModel, { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
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

    const postId = await request.json();

    if (!postId) {
      return NextResponse.json(
        {
          success: false,
          message: "Post ID not provided",
        },
        { status: 400 }
      );
    }

    const user: User | null = await UserModel.findById(primaryUser.userId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const post: Post | null = await PostModel.findById(postId);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found",
        },
        { status: 404 }
      );
    }

    if (user.saved.includes(postId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Post already saved",
        },
        {
          status: 400,
        }
      );
    }

    user.saved.push(postId);
    post.savedCount.push(user._id);
    await post.save();
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Post saved successfully",
        data: user.saved,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while saving post", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
