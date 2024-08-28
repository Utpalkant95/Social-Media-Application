import dbConnect from "@/lib/dbConnect";
import redisClient from "@/lib/redisClient";
import UserModel from "@/model/User";

export async function GET() {
   return new Response(JSON.stringify({ success: false, message: "Method not allowed" }), { status: 405 });
}