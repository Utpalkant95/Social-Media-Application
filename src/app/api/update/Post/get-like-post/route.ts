import {
    decodeToken,
    getCookieValueInServerSide,
    IUserInfo,
  } from "@/helpers/userInfo";
  import dbConnect from "@/lib/dbConnect";
  import UserModel, { User } from "@/model/User";
  import { NextRequest, NextResponse } from "next/server";

  export const dynamic = 'force-dynamic';
  
  export async function GET(request: NextRequest) {
    await dbConnect();
  
    try {
      const cookieString = request.headers.get("cookie");
      const accessToken = getCookieValueInServerSide(cookieString, "accessToken");
  
      if (!accessToken) {
        return NextResponse.json(
          {
            success: false,
            message: "Access token not found",
          },
          { status: 401 }
        );
      }
  
      const primaryUser: IUserInfo | null = decodeToken(accessToken);
      if (!primaryUser) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid or expired token",
          },
          { status: 401 }
        );
      }
  
      const user : User | null = await UserModel.findById(primaryUser.userId);
  
      if (!user) {
        return NextResponse.json(
          {
            success: false,
            message: "User not found",
          },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        success: true,
        data: user.liked,
      });
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