import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, response: NextResponse) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const searchKey = url.searchParams.get("searchKey");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "15");

    if (!searchKey) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const query = {
      $or: [
        { userName: { $regex: searchKey, $options: "i" } },
        { fullName: { $regex: searchKey, $options: "i" } },
      ],
    };

    const users = await UserModel.find(query)
    .select("fullName userName profileImage followers")
    .skip((page - 1) * limit) // Skip based on page number
    .limit(limit) // Limit the number of results returned
    .lean();

    const totalUsers = await UserModel.countDocuments(query);

    const usersWithFollowersCount = users.map((user) => ({
      ...user,
      followersCount: user.followers.length,
    }));

    return NextResponse.json({
      success: true,
      data: usersWithFollowersCount,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalResults: totalUsers,
    });
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
