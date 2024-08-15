import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import parseCookies from "@/helpers/parseCookies";

// Helper function to generate access token
const generateAccessToken = (userId: string, email: string, username: string, isVerified: boolean) => {
  return jwt.sign(
    { userId, email, username, isVerified },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};

export async function POST(request: Request) {
  await dbConnect();

  // Extract and parse cookies
  const cookies = request.headers.get("cookie");
  const { refreshToken } = parseCookies(cookies);

  if (!refreshToken) {
    return Response.json({
      success: false,
      message: "No refresh token provided",
    }, {
      status: 401
    })
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string };

    // Find the user based on the token
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
        return Response.json({
            success: false,
            message: "User not found",
        }, {
            status: 401
        })
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken(user._id as string, user.email, user.userName, user.isVerified);

    return Response.json({
      success: true,
      accessToken: newAccessToken,
    }, {
      status: 200
    })
  } catch (error) {
    console.error("Error refreshing token:", error);
    return Response.json({
      success: false,
      message: "Invalid refresh token",
    }, {
      status: 403
    })
  }
}