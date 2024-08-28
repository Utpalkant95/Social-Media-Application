import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import redisClient from "@/lib/redisClient";

export async function GET(req: Request) {
  await dbConnect();

  try {
    // Extract query parameters
    const url = new URL(req.url);
    const userName = url.searchParams.get("userName");

    if (!userName) {
      return new Response(
        JSON.stringify({ success: false, message: "Username is required" }),
        { status: 400 }
      );
    }

    // Check the cache first
    const cacheKey = `user:${userName}`;
    const cachedUser = await redisClient.get(cacheKey);

    if (cachedUser) {
      return new Response(
        JSON.stringify({ success: true, data: JSON.parse(cachedUser) }),
        { status: 200 }
      );
    }

    // Find the user by username
    const userByUserName = await UserModel.findOne({ userName });

    if (!userByUserName) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    // Cache the user
    await redisClient.set(cacheKey, JSON.stringify(userByUserName));

    return new Response(
      JSON.stringify({ success: true, data: userByUserName }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Something went wrong" }),
      { status: 500 }
    );
  }
}
