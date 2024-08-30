import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  await dbConnect();

  try {
    const { receiverId, senderId } = await request.json();

    const receiver: User | null = await UserModel.findById(receiverId);
    const sender: User | null = await UserModel.findById(senderId);

    if (!receiver || !sender) {
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

    if (!receiver.friends.includes(senderId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Not friends",
        },
        {
          status: 400,
        }
      );
    }

    receiver.friends = receiver.friends.filter((id) => id !== senderId);
    receiver.recievedFriendRequests = receiver.recievedFriendRequests.filter(
      (id) => id !== senderId
    );
    sender.friends = sender.friends.filter((id) => id !== receiverId);
    sender.sentFriendRequests = sender.sentFriendRequests.filter(
      (id) => id !== receiverId
    );

    await receiver.save();
    await sender.save();

    return NextResponse.json(
      {
        success: true,
        message: "Friend request rejected",
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
