import { decodeToken, getCookieValueInServerSide, IUserInfo } from "@/helpers/userInfo";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  dbConnect();

  try {
    const cookieString = request.headers.get("cookie");
    const accessToken = getCookieValueInServerSide(cookieString, "accessToken");
    const tokenUser : IUserInfo | null = decodeToken(accessToken as string);

    const user : User | null = await UserModel.findById(tokenUser?.userId);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" },{status: 404});
    }

    if (user.following.length < 3) {
        return NextResponse.json({ success: false, message: "You need to follow at least 3 users" }, {status: 400});
    }

    user.isFirstTimeLogin = false;
    await user.save();

    return NextResponse.json({ success: true, message: "First login changed" }, {status: 200});

  } catch (error) {
    return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
  }
}
