import { postSchema } from "@/schemas/PostSchema";
import { NextRequest, NextResponse } from "next/server";
import { handleFileInApiRoute } from "@/helpers/handleFileInApiRoute";
import { decodeJWT } from "@/lib/utils";
import dbConnect from "@/lib/dbConnect";
import { UTApi } from "uploadthing/server";
import UserModel from "@/model/User";
import PostModel from "@/model/Post";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const cookies = request.cookies;
    const refreshToken = cookies.get("refreshToken")?.value;

    const formData = await request.formData();
    const utapi = new UTApi();
    const body = Object.fromEntries(formData);
    const {
      file,
      description,
      location,
      altText,
      hideLikeViewCount,
      hideComment,
      likeCount,
      commentCount,
      shareCount,
    } = body;
    
    // const user = await UserModel.findById(jwtInfo.userId);

    // Check Redis cache for user
      const jwtInfo = await decodeJWT(refreshToken as string);
      if (!jwtInfo) {
        return NextResponse.json({
          success: false,
          message: "User not found in token",
        });
      }
      const user = await UserModel.findById(jwtInfo.userId);
      if (!user) {
        return NextResponse.json({
          success: false,
          message: "User not found",
        });
      }
      // Cache the user data in Redis
    

    const decodedFile = await handleFileInApiRoute(file as File);
    const validation = postSchema.safeParse({
      file,
      description,
      location,
      altText,
      hideLikeViewCount,
      hideComment,
      likeCount,
      commentCount,
      shareCount,
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

    if (!decodedFile) {
      return NextResponse.json({
        success: false,
        message: "File not found",
      });
    }

    const uploadImage = await utapi.uploadFiles([decodedFile]);

    if (!uploadImage) {
      return NextResponse.json({
        success: false,
        message: "File not uploaded",
      });
    }

    const newPost = await new PostModel({
      file: uploadImage[0].data?.url,
      description,
      location,
      altText,
      hideLikeViewCount,
      hideComment,
      likeCount,
      commentCount,
      shareCount,
    });

    await newPost.save();

    if (!newPost) {
      return NextResponse.json({
        success: false,
        message: "Post not created",
      });
    }

    user.posts.push(newPost._id);
    await user.save();
    return NextResponse.json({
      success: true,
      message: "Post created",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing the request.",
      },
      { status: 500 }
    );
  }
}