import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, response: NextResponse) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const userName = url.searchParams.get("userName");
    if (!userName) {
      return NextResponse.json({
        success: false,
        message: "Missing userName parameter",
      });
    }

    // Find the user by username
    const user: User | null = await UserModel.findOne({ userName });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    // Populate followers and select specific fields to include
    const populatedUser = await UserModel.findOne({ userName })
      .populate({
        path: "following", // Assuming 'followers' is an array of ObjectIds in the User schema
        model: "User",     // Ensure you specify the model name for population
        select: "userName fullName", // Specify the fields you want to include
      })
      .exec();

    return NextResponse.json({
      success: true,
      data: populatedUser?.following || [],
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}