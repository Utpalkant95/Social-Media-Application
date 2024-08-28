import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import redisClient from "@/lib/redisClient";

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetches a list of all users from the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64f6b3f87e3f6a17e93c6b9a"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-29T12:34:56Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-29T12:34:56Z"
 *       404:
 *         description: No users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No users found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 */

export async function GET() {
  await dbConnect();
  try {
    // Check the cache first
    const cacheKey = "users";
    const cachedUsers = await redisClient.get(cacheKey);

    if (cachedUsers) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Users fetched from cache",
          data: JSON.parse(cachedUsers),
        }),
        {
          status: 200,
        }
      );
    }

    // If not in cache, fetch from database
    const users = await UserModel.find({});

    if (!users || users.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "No users found" }),
        {
          status: 404,
        }
      );
    }

    // Cache the result for future requests
    await redisClient.set(cacheKey, JSON.stringify(users), {
      EX: 3600, // Set the expiration time in seconds
    }); // Cache for 1 hour

    return new Response(
      JSON.stringify({
        success: true,
        data: users,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Something went wrong" }),
      {
        status: 500,
      }
    );
  }
}