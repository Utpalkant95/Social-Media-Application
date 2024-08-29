import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/User";
import PostModel from "@/model/Post";

export async function GET(request : NextRequest, response: NextResponse) {
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

    const posts = await PostModel.find({ _id: { $in: user.posts } });

    return NextResponse.json({
      success: true,
      data: posts,
    })
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    },{
        status : 500
    });
  }
}