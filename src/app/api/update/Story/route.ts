import { handleFileInApiRoute } from "@/helpers/handleFileInApiRoute";
import { removeFile } from "@/helpers/removeFile";
import { decodeToken, getCookieValueInServerSide } from "@/helpers/userInfo";
import dbConnect from "@/lib/dbConnect";
import StoryModel from "@/model/StorySchema";
import UserModel, { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function POST(request: NextRequest, _: NextResponse) {
  await dbConnect();
  try {
    const cookieString = request.headers.get("cookie");
    const accessToken = getCookieValueInServerSide(cookieString, "accessToken");
    const tokenUser = decodeToken(accessToken as string);
    const utapi = new UTApi();
    const formData = await request.formData();
    const body = Object.fromEntries(formData);
    const { file } = body;

    if (!tokenUser) {
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

    const user: User | null = await UserModel.findById(tokenUser.userId);
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
    removeFile(decodedFile.name);

    if (!uploadImage) {
      removeFile(decodedFile.name);
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

    const newStory = new StoryModel({
      user_Id: user._id,
      file: uploadImage[0].data?.url,
    });

    await newStory.save();

    user.stories.push(newStory._id);
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Story uploaded successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error while uploading story", error);

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