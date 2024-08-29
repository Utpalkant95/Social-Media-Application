import dbConnect from "@/lib/dbConnect";
import PostModel from "@/model/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const postId = url.searchParams.get("postId");
    const post = await PostModel.findById(postId);
    return NextResponse.json(
      { success: true, data: post },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

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
