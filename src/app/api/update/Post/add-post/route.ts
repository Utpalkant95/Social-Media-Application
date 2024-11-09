import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import PostModel, { Post } from "@/model/Post";
import { postSchema } from "@/schemas/PostSchema";
import {
  decodeToken,
  getCookieValueInServerSide,
  IUserInfo,
} from "@/helpers/userInfo";
import UserModel, { User } from "@/model/User";
export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const cookieString = request.headers.get("cookie");
    const accessToken = getCookieValueInServerSide(cookieString, "accessToken");
    const userByToken: IUserInfo | null = decodeToken(accessToken as string);
    const formData = await request.formData();
    const body = Object.fromEntries(formData);
    const { file, description, location, altText } = body;
    const hideLikeViewCount = formData.get("hideLikeViewCount") === "true";
    const hideComment = formData.get("hideComment") === "true";

    const validation = postSchema.safeParse({
      file,
      description,
      location,
      altText,
      hideLikeViewCount,
      hideComment,
    });

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    if (!userByToken) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found in token",
        },
        { status: 400 }
      );
    }

    const user : User | null = await UserModel.findById(userByToken.userId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }

    const newPost: Post = await new PostModel({
      ownerId: userByToken.userId,
      file: file,
      description,
      location,
      altText,
      hideLikeViewCount,
      hideComment,
    });

    await newPost.save();

    if (!newPost) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not created",
        },
        {
          status: 500,
        }
      );
    }

    user.posts.unshift(newPost._id as string);
    await user.save();
    return NextResponse.json(
      {
        success: true,
        message: "Post created",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in adding a new post, ", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing the request.",
      },
      { status: 500 }
    );
  }
}
