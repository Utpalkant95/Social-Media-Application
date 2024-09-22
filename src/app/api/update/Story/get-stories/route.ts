import dbConnect from "@/lib/dbConnect";
import StoryModel, { Story } from "@/model/StorySchema";
import UserModel, { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { decodeToken, getCookieValueInServerSide } from "@/helpers/userInfo";

// Define GroupedStories interface
export interface GroupedStories {
  userDetails: {
    username: string;
    profilePicture: string;
  };
  stories: Story[];
}

export async function GET(request: NextRequest, response: NextResponse) {
  await dbConnect();

  try {
    // Extract userId from query parameters
    const cookieString = request.headers.get("cookie");
    const accessToken = getCookieValueInServerSide(cookieString, "accessToken");
    const tokenUser = decodeToken(accessToken as string);

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "accessToken not found" },
        { status: 404 }
      );
    }

    if (!tokenUser){
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(tokenUser.userId as string)) {
      return NextResponse.json(
        { success: false, message: "Invalid userId" },
        { status: 400 }
      );
    }

    // Fetch user and populate following
    const user: User | null = await UserModel.findById(tokenUser.userId).populate("following");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // If following is an array of user objects (after populate), use _id
    const followingIds = Array.isArray(user.following)
      ? user.following.map((f: any) => (f._id ? f._id : f)) // Check if _id exists, otherwise use f directly if it's a string
      : [];

    // Add the logged-in user ID to the list
    const userIds = [user._id, ...followingIds];

    // Fetch stories for user and their followings
    const stories: Story[] = await StoryModel.find({
      user_Id: { $in: userIds }, // Find stories by user IDs
      expired_at: { $gt: new Date() }, // Only fetch non-expired stories
    }).sort({ created_at: -1 });

    // Get the user details for those who posted stories
    const userDetails: User[] = await UserModel.find(
      { _id: { $in: userIds } },
      "userName profileImage"
    );

    // Initialize an array for grouped stories
    const groupedStories: GroupedStories[] = [];

    // Create a mapping of user IDs to user details for easier lookup
    const userDetailsMap = new Map<string, { username: string; profilePicture: string }>();

    userDetails.forEach((user) => {
      userDetailsMap.set(user._id.toString(), {
        username: user.userName,
        profilePicture: user.profileImage,
      });
    });

    // Group stories by userId
    stories.forEach((story) => {
      const userDetail = userDetailsMap.get(story.user_Id.toString());

      if (userDetail) {
        const existingGroup = groupedStories.find(
          (group) => group.userDetails.username === userDetail.username
        );

        if (existingGroup) {
          existingGroup.stories.push(story);
        } else {
          groupedStories.push({
            userDetails: userDetail,
            stories: [story],
          });
        }
      }
    });

    return NextResponse.json({ success: true,stories:groupedStories });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
