import {
  decodeToken,
  getCookieValueInServerSide,
  IUserInfo,
} from "@/helpers/userInfo";
import dbConnect from "@/lib/dbConnect";
import PostModel from "@/model/Post";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const cookieString = request.headers.get("cookie");
    const accessToken = getCookieValueInServerSide(cookieString, "accessToken");
    const userByToken: IUserInfo | null = decodeToken(accessToken as string);
    const {postId} = await request.json(); 

    console.log("postId", postId);
    

    if (!postId) {
      return NextResponse.json(
        {
          success: false,
          message: "Post id not found",
        },
        {
          status: 400,
        }
      );
    }

    if (!userByToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        {
          status: 401,
        }
      );
    }

    const user = await UserModel.findById(userByToken.userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const post = await PostModel.findById(postId);

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

    const hasLiked = post.likeCount.includes(user._id);

    if (hasLiked) {
      // If the user has already liked, we will remove the like
      post.likeCount = post.likeCount.filter(
        (userId: string) => userId.toString() !== user._id.toString()
      );
    } else {
      post.likeCount.push(user._id);
    }

    await post.save();

    return NextResponse.json(
      {
        success: true,
        message: hasLiked
          ? "Post unliked successfully"
          : "Post liked successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error while liking/unliking the post", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
