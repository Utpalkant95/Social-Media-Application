import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendPhoneOtp(phone: string, otp: string) {
  try {
    const response = await client.messages.create({
      body: `Your verification code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    return { success: true, data : response };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, error };
  }
}

