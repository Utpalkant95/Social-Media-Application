import { IComment } from "@/ApiServices/interfaces/response";
import {
    decodeToken,
    getCookieValueInServerSide,
    IUserInfo,
  } from "@/helpers/userInfo";
  import dbConnect from "@/lib/dbConnect";
import CommentModel from "@/model/Comment";
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
      const { postId, comment } = await request.json();
  
      if (!postId || !comment) {
        return NextResponse.json({
          success: false,
          message: "Post id not found",
        });
      }
  
      const user: User | null = await UserModel.findById(primaryUser.userId);
  
      const post: Post | null = await PostModel.findById(postId);
  
      if (!post) {
        return NextResponse.json({
          success: false,
          message: "Post not found",
        });
      }
  
      if (!user) {
        return NextResponse.json({
          success: false,
          message: "User not found",
        });
      }
  
      const newComment = new CommentModel({
        senderId: user._id,
        senderUsername: user.userName,
        senderProfileImage: user.profileImage,
        comment,
      });
  
      await newComment.save();
  
      post.comments?.unshift(newComment._id);
      await post.save();
  
      return NextResponse.json({
        success: true,
        message: "Comment added successfully",
      });
    } catch (error) {
      console.log(error);
  
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
  