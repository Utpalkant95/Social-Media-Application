import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtVerify } from 'jose';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export async function decodeJWT(token: string): Promise<any> {
  try {
    // The secret key used to sign the JWT, should be stored in environment variables
    const secretKey = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);

    // Verify the token using the secret key
    const { payload } = await jwtVerify(token, secretKey);

    // Return the decoded payload
    return payload;
  } catch (error) {
    console.error('Failed to verify and decode JWT:', error);
    return null;
  }
}
