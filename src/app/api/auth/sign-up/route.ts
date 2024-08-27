import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { sendPhoneOtp } from "@/helpers/sendVerificationSms";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
import { signUpSchema } from "@/schemas/signUpSchema";
import bcryptjs from "bcryptjs";

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

    // validation
    // Validate input fields
    const validation = signUpSchema.safeParse({
      fullName,
      userName,
      email,
      phone,
      password,
    });

    if (!validation.success) {
      return Response.json({
        success : false,
        message : validation.error.errors[0].message,
        data : validation
      }, {
        status : 400
      })
    }

    //  checking existing user by email or username
    const existingUser = await UserModel.findOne({
      $or: [{ userName: userName }, { email: email }],
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User already exists",
        }),
        {
          status: 409,
        }
      )
    }

    // checking user validation
    // if (existingUser && !existingUser.emailVerified && !existingUser.phoneVerified) {
    //   return Response.json({
    //     success : false,
    //     message : "User is not verified",
        
    //   })
    // }

    // execution

    // generating phone and email verification opts
    const phoneOtp = Math.floor(100000 + Math.random() * 900000);
    const emailOtp = Math.floor(100000 + Math.random() * 900000);
    
    // hasging the password 
    const hashedPassword = await bcryptjs.hash(password, 10);

    // making new user 
    const newUser = new UserModel({
      fullName,
      userName,
      email,
      phone,
      phoneOtp : phoneOtp,
      emailOtp : emailOtp,
      password: hashedPassword,
      isVerified: false,
      isFirstTimeLogin: true
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Something went wrong. Please try again.",
        }),
        { status: 500 }
      );
    }

    // // send verification email
    // const emailResponse = await sendVerificationEmail({
    //   email : email,
    //   emailOtp : emailOtp,
    //   firstName : fullName,
    //   phoneOtp : phoneOtp
    // })

    // console.log("emailResponse", emailResponse);
    

    // if (!emailResponse) {
    //   return new Response(
    //     JSON.stringify({
    //       success: false,
    //       message: "something went wrong while sending email. Please try again.",
    //     }),
    //     { status: 500 }
    //   );
    // }
    // const phoneNo = "+91" + phone;
    // console.log("phoneNo", phoneNo);
    
    // const smsResponse =  await sendPhoneOtp(phoneNo, String(phoneOtp))

    // console.log("smsResponse", smsResponse);

    // if (!smsResponse) {
    //   return new Response(
    //     JSON.stringify({
    //       success: false,
    //       message: "something went wrong while sending sms. Please try again.",
    //     }),
    //     { status: 500 }
    //   );
    // }

    // response
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "User created successfully",
      }),
      { status: 200 }
    );

  } catch (error) {
    console.log("Error while registering user:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error in registering user",
      }),
      { status: 500 }
    );
  }
}