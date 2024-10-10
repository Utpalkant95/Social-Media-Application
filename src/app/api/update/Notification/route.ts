import dbConnect from "@/lib/dbConnect";
import NotificationModel from "@/model/Notifications";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Helper function for error responses
const createErrorResponse = (message: string, status: number) => {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
};

// Main GET function to fetch notifications
export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    // Extract userId from query parameters
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    // Validate input
    if (!userId) {
      return createErrorResponse("Missing userId parameter", 400);
    }

    // Check if user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return createErrorResponse("User not found", 404);
    }

    // Fetch notifications for the user
    const notifications = await NotificationModel.find({ userId }).sort({
      createdAt: -1,
    });

    // Return notifications
    return NextResponse.json(
      {
        success: true,
        data : notifications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return createErrorResponse("Something went wrong", 500);
  }
}
