import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { UTApi } from "uploadthing/server";
import UserModel, { User } from "@/model/User";
import dbConnect from "@/lib/dbConnect";

const UPLOAD_DIR = path.resolve("public/uploads");

export const POST = async (req: NextRequest) => {
  await dbConnect();
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const fileBlob = (body.file as Blob) || null;
  const utapi = new UTApi();
  const user: User | null = await UserModel.findById(body.userId);

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User not found",
    });
  }

  if (fileBlob) {
    // Convert Blob to FileEsque object
    const file = new File([fileBlob], (body.file as File).name, {
      type: fileBlob.type,
    });

    const buffer = Buffer.from(await file.arrayBuffer());

    // Ensure upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }

    // Write file to disk
    fs.writeFileSync(path.resolve(UPLOAD_DIR, file.name), buffer);

    // Upload the file using uploadthing API
    const response = await utapi.uploadFiles([file]);

    // update user prole
    // user?.set({ prof: response[0].data?.url });
    // await user?.save();
    user.profileImage = response[0].data?.url as string;
    await user?.save();

    return NextResponse.json({
      success: true,
      name: file.name,
      response: response,
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "No file uploaded",
    });
  }
};
