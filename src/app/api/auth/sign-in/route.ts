import generateTokens from "@/helpers/jwt";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
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
        route: "/account/sign-in",
      },
      {
        status: 400,
      }
    );
  }

  //  checking user pehle se present hai ya nhi
  const existingUserByEmail : User | null = await UserModel.findOne({ email: email });
  if (!existingUserByEmail) {
    return Response.json(
      {
        success: false,
        message: "User Not Found",
        route: "/account/sign-in",
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
    const { accessToken } = generateTokens({
      email: existingUserByEmail.email,
      userId: existingUserByEmail._id.toString(),
      username: existingUserByEmail.userName,
      isVerified: existingUserByEmail.isVerified,
      privateAccount : existingUserByEmail.privateAccount,
      profileImage : existingUserByEmail.profileImage,
      isFirstTimeLogin : existingUserByEmail.isFirstTimeLogin
    });

    return Response.json(
      {
        success: true,
        message: "Login Successfully",
        route: "/",
        accessToken,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `accessToken=${accessToken};  Path=/; Max-Age=${
            7 * 24 * 60 * 60
          }; Secure; SameSite=Strict`,
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
