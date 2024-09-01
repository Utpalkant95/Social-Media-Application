import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  await dbConnect();

  try {
    const url = new URL(request.url);
    const userName = url.searchParams.get("searchKey");

    const users = await UserModel.find({
        $or: [
          { userName: { $regex: userName, $options: "i" } },
          { fullName: { $regex: userName, $options: "i" } }
        ]
      });
  
     return NextResponse.json({
       success: true,
       data: users
     })

  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    })
  }
}
