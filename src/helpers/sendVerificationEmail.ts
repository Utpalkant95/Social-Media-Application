import { resend } from "@/lib/resend";
import { Email_Template } from "@/components";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail({email, firstName, otp} : {email: string, firstName: string, otp: string}) : Promise<ApiResponse> {
     try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Social Media Platform |  Verification Code',
            react: Email_Template({ firstName : firstName, otp : otp }),
          });

        return {
            message : "Email sent successfully",
            success : true
        }

     } catch (error) {
        console.error("error sending email",error)

        return {
            message : "error sending email",
            success : false

        }
     }
}