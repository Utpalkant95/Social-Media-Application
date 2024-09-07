import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  await dbConnect();

  try {
    const {senderId, receiverId} = await request.json();

    const sender : User | null = await UserModel.findOne({ _id: senderId });
    const receiver : User | null = await UserModel.findOne({ _id: receiverId });

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

    if (receiver.followers.includes(senderId)) {
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

    receiver.following.push(senderId);
    receiver.recievedFollowRequests = receiver.recievedFollowRequests.filter(
      (id) => id !== senderId
    )
    sender.sentFollowRequests = sender.sentFollowRequests.filter(
      (id) => id !== receiverId
    )


    await sender.save();
    await receiver.save();

    return NextResponse.json(
      {
        success: true,
        message: "Friend request accepted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
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