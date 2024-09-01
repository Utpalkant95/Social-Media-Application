import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const userName = url.searchParams.get("searchKey");

    if (!userName) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const users = await UserModel.find({
      $or: [
        { userName: { $regex: userName, $options: "i" } },
        { fullName: { $regex: userName, $options: "i" } },
      ],
    })
      .select("fullName userName profileImage followers")
      .lean();

    // Map over the users to add the followersCount field
    const usersWithFollowersCount = users.map((user) => ({
      ...user,
      followersCount: user.followers.length,
    }));

    return NextResponse.json({
      success: true,
      data: usersWithFollowersCount,
    });
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
