import dbConnect from "@/lib/dbConnect";
import StoryModel from "@/model/StorySchema";
import UserModel, { User } from "@/model/User";
import { decodeToken, getCookieValueInServerSide } from "@/helpers/userInfo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  await dbConnect();
  try {
    // Step 1: Get the logged-in user's token and decode it
    const cookieString = request.headers.get("cookie");
    const accessToken = getCookieValueInServerSide(cookieString, "accessToken");

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "Access token is missing" },
        { status: 401 }
      );
    }

    const tokenUser = decodeToken(accessToken as string);
    if (!tokenUser) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Step 2: Get the logged-in user's data (including their following list)
    const user : User | null = await UserModel.findById(tokenUser.userId).populate("following");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Step 3: Create a list of userIds that includes the logged-in user and the users they follow
    const userIds = [user._id, ...user.following];

    // Step 4: Query the StoryModel to find stories where the userId is in userIds
    const stories = await StoryModel.find({
      user_Id: { $in: userIds },  // Fetch stories by the logged-in user and followed users
      expired_at: { $gt: new Date() },  // Only fetch stories that have not expired
    }).sort({ created_at: -1 });  // Sort by most recent stories first

    // Step 5: Return the list of stories in the response
    return NextResponse.json(
      {
        success: true,
        stories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}