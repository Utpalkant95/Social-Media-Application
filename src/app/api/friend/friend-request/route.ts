import dbConnect from "@/lib/dbConnect";
import NotificationModel from "@/model/Notifications";
import UserModel, { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

// Helper function for error responses
const createErrorResponse = (message: string, status: number) => {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
};

// Main POST function
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { senderId, receiverId } = await request.json();

    // Validate input
    if (!senderId || !receiverId) {
      return createErrorResponse("Missing parameters", 400);
    }

    const sender: User | null = await UserModel.findById(senderId);
    const receiver: User | null = await UserModel.findById(receiverId);

    // Check if users exist
    if (!sender || !receiver) {
      return createErrorResponse("User not found", 404);
    }

    // Check if already followed
    if (sender.following.includes(receiverId)) {
      return createErrorResponse("Already Followed", 400);
    }

    // Handle private account logic
    if (receiver.privateAccount) {
      if (!sender.sentFollowRequests.includes(receiverId)) {
        sender.sentFollowRequests.push(receiverId);
      }
      if (!receiver.recievedFollowRequests.includes(senderId)) {
        receiver.recievedFollowRequests.push(senderId);
      }

      await sender.save();
      await receiver.save();

      await NotificationModel.create({
        userId: receiverId,
        senderId: senderId,
        message: `${sender.userName} has sent you a follow request`,
        type: 'follow_request',
      });

      return NextResponse.json(
        {
          success: true,
          message: "Follow request sent",
        },
        { status: 200 }
      );
    }

    // Handle public account follow
    if (!receiver.followers.includes(senderId)) {
      receiver.followers.push(senderId);
    }
    if (!sender.following.includes(receiverId)) {
      sender.following.push(receiverId);
    }

    await sender.save();
    await receiver.save();

    await NotificationModel.create({
      userId: receiverId,
      senderId: senderId,
      message: `${sender.userName} is now following you`,
      type: 'follow',
    });

    return NextResponse.json(
      {
        success: true,
        message: "Follow Successful",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in follow request:", error);
    return createErrorResponse("Something went wrong", 500);
  }
}
