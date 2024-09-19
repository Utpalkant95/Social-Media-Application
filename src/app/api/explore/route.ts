import dbConnect from "@/lib/dbConnect";
import PostModel from "@/model/Post";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const posts = await PostModel.find({});
    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error) {
    console.log("error while fetching exlore post", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  };

};