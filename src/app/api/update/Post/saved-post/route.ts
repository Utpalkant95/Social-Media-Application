import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import SavedPostModel from "@/model/SavedPost";
import UserModel from "@/model/User";

export async function GET(request: NextRequest, response: NextResponse) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const userName = url.searchParams.get("userName");

    const user = await UserModel.findOne({ userName });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const savedPosts = await SavedPostModel.find({
      _id: { $in: user.savedPosts },
    });

    if (!savedPosts) {
      return NextResponse.json({
        success: false,
        message: "Saved posts not found",
      });
    }

    return NextResponse.json({
      success: true,
      data: savedPosts,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
