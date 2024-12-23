import { decodeToken, getCookieValueInServerSide } from "@/helpers/userInfo";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import PostModel from "@/model/Post";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export interface Post {
  _id: string;
  altText: string;
  commentCount: number;
  createdAt: string;
  description: string;
  file: string;
  hideComment: boolean;
  hideLikeViewCount: boolean;
  likeCount: string[];
  location: string;
  comments: string[];
  ownerId: Owner;
  shareCount: number;
}

interface Owner {
  _id: string;
  fullName: string;
  profileImage: string;
  userName: string;
}

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const cookieString = request.headers.get("cookie");
    const accessToken = getCookieValueInServerSide(cookieString, "accessToken");

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "accessToken not found" },
        { status: 404 }
      );
    }

    const tokenUser = decodeToken(accessToken as string);
    
    if (!tokenUser || !tokenUser.userId) {
      return NextResponse.json(
        { success: false, message: "Invalid token or user not found" },
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

    const followingUsers = user.following;

    // Fetch posts and sort them by createdAt in descending order
    const posts = await PostModel.find({
      ownerId: { $in: followingUsers }
    })
      .populate("ownerId", "fullName userName profileImage")
      .sort({ createdAt: -1 });

    if (!posts.length) {
      return NextResponse.json(
        { success: false, message: "No posts found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: posts as Post[],
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
