import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import UserModel, { User } from "@/model/User";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { userName, color } = await request.json();

    if (!userName || !color) {
      return NextResponse.json(
        {
          message: "Missing userName or color parameter",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const decodedColor = decodeURIComponent(color);

    if (!/^#[0-9A-Fa-f]{6}$/.test(decodedColor)) {
      return NextResponse.json(
        {
          message: "Invalid color format",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    // Find the user
    const user: User | null = await UserModel.findOne({ userName });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    // Check if QR code with the given color already exists
    const existingQrCode = user.qrCode.find(qr => qr.color === decodedColor);
    if (existingQrCode) {
      return NextResponse.json({
        message: "QR code already generated",
        success: true,
        qrURL: existingQrCode.url,
      });
    }

    // Generate new QR code
    const qrCodeDataURL = await QRCode.toDataURL(
      `http://localhost:3000/${userName}`,
      {
        color: {
          dark: decodedColor,
        },
      }
    );

    if (!qrCodeDataURL) {
      return NextResponse.json(
        {
          message: "Something went wrong while generating the QR code",
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    // Save the new QR code to the user's record
    user.qrCode.push({ url: qrCodeDataURL, color: decodedColor });
    await user.save();

    return NextResponse.json({
      message: "success",
      success: true,
      qrURL: qrCodeDataURL,
    });
  } catch (error) {
    console.log("error while generating QR code", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}