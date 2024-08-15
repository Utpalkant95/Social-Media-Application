import generateTokens from "@/helpers/jwt";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { signInSchema } from "@/schemas/signInSchema";
import bcryptjs from "bcryptjs";

/**
 *
 * @swagger
 * /api/sign-in:
 *  post:
 *    summary: Login  User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            example:
 *              email: 0Tq9V@example.com
 *              password: password
 *    responses:
 *      200:
 *        description: User Login
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                message:
 *                  type: string
 */

export async function POST(request: Request) {
  await dbConnect();

  const { email, password } = await request.json();

  //   validation of email and password field , khi wo emppty to nhi hai
  const validation = signInSchema.safeParse({ email, password });
  if (!validation.success) {
    return Response.json(
      {
        success: false,
        message: validation.error.errors[0].message,
      },
      {
        status: 400,
      }
    );
  }

  //  checking user pehle se present hai ya nhi
  const existingUserByEmail = await UserModel.findOne({ email: email });
  if (!existingUserByEmail) {
    return Response.json(
      {
        success: false,
        message: "User Not Found",
      },
      {
        status: 400,
      }
    );
  }

  // checking khi user ne password to galat nhi dala na
  const passwordMatch = await bcryptjs.compare(
    password,
    existingUserByEmail.password
  );
  if (!passwordMatch) {
    return Response.json(
      {
        success: false,
        message: "Incorrect Password",
      },
      {
        status: 400,
      }
    );
  }

  try {
    existingUserByEmail.isVerified = true;
    await existingUserByEmail.save();
    const {accessToken, refreshToken } = generateTokens(
      existingUserByEmail._id as string,
      existingUserByEmail.email,
      existingUserByEmail.userName,
      existingUserByEmail.isVerified
    );

    return Response.json(
      {
        success: true,
        message: "Login Successfully",
        refreshToken,
        accessToken
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": [
            `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; Secure; SameSite=Strict`,
            `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`,
          ].join(", "), // Multiple Set-Cookie headers
        },
      }
    );
  } catch (error) {
    console.log("error aa rha hai user ko login krane time mein", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}