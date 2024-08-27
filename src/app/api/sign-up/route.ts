import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcryptjs from "bcryptjs";
import { redirect } from "next/navigation";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

/**
 *
 * @swagger
 * /api/sign-up:
 *  post:
 *    summary: Create New User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fullName:
 *                type: string
 *              userName:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: string
 *              password:
 *                type: string
 *            example:
 *              fullName: Utpal
 *              userName: utpal
 *              email: 0Tq9V@example.com
 *              phone: 1234567890
 *              password: password
 *    responses:
 *      200:
 *        description: Create New User
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
  try {
    const { fullName, userName, email, phone, password } = await request.json();

    if (!fullName || !userName || !email || !phone || !password) {
      return Response.json(
        {
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await UserModel.findOne({
      $or: [{ userName: userName }, { email: email }],
    });

    if (existingUser) {
      return Response.json({
        success: false,
        message: "User Is Already Exist. Please Login",
      }, {
        status : 409
      });
    } 

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await new UserModel({
      fullName: fullName,
      userName: userName,
      email: email,
      phone: phone,
      password: hashedPassword,
      isVerified: false,
      isFirstTimeLogin: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return Response.json({
        success: false,
        message: "Something went wrong. Please try again",
      });
    } else {
      return Response.json({
        success: true,
        message: "User Created Successfully",
      });
    }
  } catch (error) {
    console.log("error while registering user", error);
    return Response.json(
      {
        success: false,
        message: "Erorr in Registering User",
      },
      {
        status: 500,
      }
    );
  }
}