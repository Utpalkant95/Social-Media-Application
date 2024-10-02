import dbConnect from "@/lib/dbConnect";
import NotificationModel from "@/model/Notifications";
import UserModel, { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

// Main POST function for unfollow
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { senderId, receiverId } = await request.json();

    // Validate input
    if (!senderId || !receiverId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing parameters",
        },
        {
          status: 400,
        }
      );
    }

    const sender: User | null = await UserModel.findById(senderId);
    const receiver: User | null = await UserModel.findById(receiverId);

    // Check if users exist
    if (!sender || !receiver) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // Check if the sender is following the receiver
    if (!sender.following.includes(receiverId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Not following the user",
        },
        {
          status: 400,
        }
      );
    }

    // Remove the receiver from the sender's following list
    sender.following = sender.following.filter((id) => id.toString() !== receiverId);

    // Remove the sender from the receiver's followers list
    receiver.followers = receiver.followers.filter((id) => id.toString() !== senderId);

    // Delete the follow notification if it exists
    await NotificationModel.findOneAndDelete({
      userId: receiverId,
      senderId: senderId,
      type: "follow",
    });

    // Save changes
    await sender.save();
    await receiver.save();

    return NextResponse.json(
      {
        success: true,
        message: "Unfollowed successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in unfollow request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong in unfollowing user",
      },
      {
        status: 500,
      }
    );
  }
}