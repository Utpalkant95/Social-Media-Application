import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
import { verifySchema } from "@/schemas/verifySchema";

export async function POST(req: Request, res: Response) {
  await dbConnect();
  const { userName, emailOtp, phoneOtp } = await req.json();

  try {
    const inputVerification = verifySchema.safeParse({
      userName,
      emailOtp,
      phoneOtp,
    });

    if (!inputVerification.success) {
      return Response.json(
        {
          success: false,
          message: inputVerification.error.errors[0].message,
        },
        {
          status: 400,
        }
      );
    }

    const user: User | null = await UserModel.findOne({ userName: userName });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    if (user.phoneOtp != phoneOtp) {
      return Response.json(
        {
          success: false,
          message: "Invalid Phone OTP",
        },
        {
          status: 400,
        }
      );
    }

    if (user.emailOtp != emailOtp) {
      return Response.json(
        {
          success: false,
          message: "Invalid Email OTP",
        },
        {
          status: 400,
        }
      );
    }

    user.phoneVerified = true;
    user.emailVerified = true;
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Verified Successfully",
        route : "/account/sign-in"
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "An error occurred while verifying your account",
      },
      {
        status: 500,
      }
    );
  }
}