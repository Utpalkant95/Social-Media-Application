import { decodeToken, getCookieValueInServerSide } from "@/helpers/userInfo";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
import { updatePasswordSchema } from "@/schemas/updatePasswordSchema";
import { NextRequest, NextResponse } from "next/server";
import bscypt from "bcryptjs";

export async function PATCH(request: NextRequest, _: NextResponse) {
  await dbConnect();

  try {
    const cookieString = request.headers.get("cookie");
    const accessToken = getCookieValueInServerSide(cookieString, "accessToken");
    const currentUserLogin = decodeToken(accessToken as string);
    const { currentPassword, newPassword, confirmPassword } =
      await request.json();
    const validation = updatePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword,
    });
    const user: User | null = await UserModel.findOne({
      userName: currentUserLogin?.username,
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
    const passwordMatch = await bscypt.compare(
      currentPassword,
      user?.password as string
    );
    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password is incorrect",
        },
        {
          status: 400,
        }
      );
    }

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

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.errors[0].message,
        },
        {
          status: 400,
        }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Passwords do not match",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bscypt.hash(newPassword, 10);
    await UserModel.findOneAndUpdate(
      {
        userName: currentUserLogin?.username,
      },
      {
        password: hashedPassword,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Password updated successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error while updating password", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong in updating password",
      },
      {
        status: 500,
      }
    );
  }
}