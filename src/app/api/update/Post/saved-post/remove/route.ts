import {
  decodeToken,
  getCookieValueInServerSide,
  IUserInfo,
} from "@/helpers/userInfo";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
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

    // Check if post is actually saved
    if (!user.saved.includes(postId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found in saved list",
        },
        { status: 404 }
      );
    }

    // Remove post from saved
    user.saved = user.saved.filter((id) => id !== postId);
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Post unsaved successfully",
        data: user.saved,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while removing saved post", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
