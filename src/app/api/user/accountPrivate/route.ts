import { decodeToken, getCookieValueInServerSide } from "@/helpers/userInfo";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, _: NextResponse) {
  await dbConnect();
  try {
    const cookieString = request.headers.get("cookie");
    console.log("cookieString", cookieString);
    
    const accessToken = getCookieValueInServerSide(cookieString, "accessToken");
    const userDetail = decodeToken(accessToken as string);

    const { privateAccount } = await request.json();

    if (!userDetail) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found in token",
        },
        {
          status: 404,
        }
      );
    }

    const user: User | null = await UserModel.findOne({
      userName: userDetail.username,
    });

    if (!user) {
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

    user.privateAccount = privateAccount;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Private account updated",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("erorr while updating private account", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Erorr",
      },
      {
        status: 500,
      }
    );
  }
}
