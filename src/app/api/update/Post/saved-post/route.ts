import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import PostModel from "@/model/Post"; // Assuming PostModel is the model for posts
import UserModel, { User } from "@/model/User";
import { decodeToken, getCookieValueInServerSide, IUserInfo } from "@/helpers/userInfo";

export async function GET(request: NextRequest) {
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

    const savedPostIds = user.saved;

    // Fetch all posts in a single query using $in operator
    const savedPosts = await PostModel.find({ _id: { $in: savedPostIds } });

    return NextResponse.json({
      success: true,
      data : savedPosts,
    });

  } catch (error) {
    console.error("Error fetching saved posts:", error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    }, { status: 500 });
  }
}
