import dbConnect from "@/lib/dbConnect";
import NotificationModel from "@/model/Notifications";
import UserModel, { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

// Main POST function
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

    // Check if already followed
    if (sender.following.includes(receiverId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Already followed",
        },
        {
          status: 400,
        }
      );
    }

    // Handle private account logic
    if (receiver.privateAccount) {
      if (receiver.recievedFollowRequests.includes(senderId)) {
        return NextResponse.json(
          {
            success: false,
            message: "Already requested",
          },
          {
            status: 400,
          }
        );
      }
      receiver.recievedFollowRequests.push(senderId);
      sender.sentFollowRequests.push(receiverId);

      const newNotification = new NotificationModel({
        userId: receiverId,
        senderId: senderId,
        message: `${sender.userName} sent you a follow request`,
        type: "follow_request",
        isRead: false,
        createdAt: Date.now(),
      });

      // Save changes
      await sender.save();
      await receiver.save();
      await newNotification.save();

      return NextResponse.json(
        {
          success: true,
          message: "Request Sent",
        },
        {
          status: 200,
        }
      );
    }

    // Handle public account follow

    const newNotification = new NotificationModel({
      userId: receiverId,
      senderId: senderId,
      message: `${sender.userName} followed you`,
      type: "follow",
      isRead: false,
      createdAt: Date.now(),
    });

    // Save changes
    sender.following.push(receiverId);
    receiver.followers.push(senderId);
    await sender.save();
    await receiver.save();
    await newNotification.save();

    return NextResponse.json(
      {
        success: true,
        message: "Followed",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in follow request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong in following user",
      },
      {
        status: 500,
      }
    );
  }
}