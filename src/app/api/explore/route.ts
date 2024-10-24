import dbConnect from "@/lib/dbConnect";
import PostModel from "@/model/Post";
import { NextRequest, NextResponse } from "next/server";
import { Post } from "../home-page-post/route";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const posts = await PostModel.find({})
      .populate("ownerId", "fullName userName profileImage")
    return NextResponse.json(
      {
        success: true,
        data: posts as Post[],
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error while fetching exlore post", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
