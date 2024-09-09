import { handleFileInApiRoute } from "@/helpers/handleFileInApiRoute";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { decodeToken, getCookieValueInServerSide } from "@/helpers/userInfo";
import UserModel from "@/model/User";

export async function POST(request: NextRequest, response: NextResponse) {
  await dbConnect();
  try {
    const cookieString = request.headers.get("cookie");
    const accessToken = getCookieValueInServerSide(cookieString, "accessToken");
    const user = decodeToken(accessToken as string);
    const formData = await request.formData();
    const body = Object.fromEntries(formData);
    const { file } = body;
    const utapi = new UTApi();

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

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "file not found",
        },
        {
          status: 404,
        }
      );
    }

    const decodedFile = await handleFileInApiRoute(file as File);

    if (!decodedFile) {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong while uploading profile picture",
        },
        {
          status: 500,
        }
      );
    }

    const uploadImage = await utapi.uploadFiles([decodedFile]);

    if (!uploadImage) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Something went wrong while uploading profile picture on uploadthing",
        },
        {
          status: 500,
        }
      );
    }

    const updateUser = await UserModel.findOneAndUpdate(
      {
        _id: user.userId,
      },
      {
        profileImage: uploadImage[0].data?.url,
      },
      {
        new: true,
      }
    );

    await updateUser.save();

    if (!updateUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong while updating profile picture",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "file uploaded succesfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("erorr while uploading profile picture");
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while uploading profile picture",
      },
      {
        status: 500,
      }
    );
  }
}