import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  await dbConnect();

  try {
    const { senderId, receiverId } = await request.json();

    const sender : User | null = await UserModel.findById(senderId);
    const receiver : User | null = await UserModel.findById(receiverId);

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

    if (sender.friends.includes(receiverId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Already friends",
        },
        {
          status: 400,
        }
      );
    }

    sender.sentFriendRequests.push(receiverId);
    receiver.recievedFriendRequests.push(senderId);
    await sender.save();
    await receiver.save();

    return NextResponse.json(
      {
        success: true,
        message: "Friend request sent",
      },
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
