import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { editProfileSchema } from "@/schemas/editProfileSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  await dbConnect();

  try {
    const { fullName, userName, bio, gender, phone } = await request.json();
    const validate = editProfileSchema.safeParse({
      fullName,
      userName,
      bio,
    });

    if (!validate.success) {
      return NextResponse.json(
        {
          success: false,
          message: validate.error.errors[0].message,
        },
        {
          status: 400,
        }
      );
    }

    const user = await UserModel.findOne({ userName });

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
  } catch (error) {

  }
}
