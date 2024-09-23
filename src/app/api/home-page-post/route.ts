import { decodeToken, getCookieValueInServerSide } from "@/helpers/userInfo";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import PostModel from "@/model/Post";  // Assuming you have a Post model
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const cookieString = request.headers.get("cookie");
    const accessToken = getCookieValueInServerSide(cookieString, "accessToken");
    const tokenUser = decodeToken(accessToken as string);

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "accessToken not found" },
        { status: 404 }
      );
    }

    if (!tokenUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const user = await UserModel.findById(tokenUser.userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Get the list of users that the authenticated user is following
    const followingUsers = user.following; // Assuming `user.following` is an array of user IDs

    // Fetch posts from users the authenticated user is following
    const posts = await PostModel.find({
      author: { $in: followingUsers }
    }).populate("author"); // Assuming Post model has an author field

    if (!posts.length) {
      return NextResponse.json(
        { success: false, message: "No posts found" },
        { status: 404 }
      );
    }

    // Return the posts along with user data
    return NextResponse.json({
      success: true,
      data : posts,  // This will include post content and author details (username, profileImage, etc.)
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
