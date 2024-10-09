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
    const userByToken: IUserInfo | null = decodeToken(accessToken as string);
    const { postId } = await request.json();

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

    const user: User | null = await UserModel.findById(userByToken.userId);

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

    const hasLiked = post.likeCount.includes(user._id);

    if (hasLiked) {
      return NextResponse.json(
        {
          success: false,
          message: "Post already liked",
        },
        {
          status: 400,
        }
      );
    } else {
      post.likeCount.push(user._id);
      user.liked.push(postId);
    }

    await post.save();
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Post liked successfully",
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
