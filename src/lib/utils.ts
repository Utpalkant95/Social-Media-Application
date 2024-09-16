import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtVerify } from 'jose';
import Cookies from "js-cookie";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export async function decodeJWT(token: string): Promise<any> {
  const cookie = Cookies.get('accessToken');
  // console.log("cookie in jwt deode", cookie);
  
  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    console.error('Failed to verify and decode JWT:', error);
    return null;
  }
}