import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export interface IUserInfo {
  email: string;
  exp: number;
  iat: number;
  isVerified: boolean;
  username: string;
  userId: string;
  privateAccount : boolean;
  profileImage : string;
  isFirstTimeLogin : boolean;
}

export const decodeToken = (token ?: string) : IUserInfo | null => {
  const accessToken =token ?? Cookies.get("accessToken");

  if (!accessToken) {
    console.error("No access token found");
    return null;
  }

  try {
    const decoded = jwtDecode(accessToken);
    return decoded as IUserInfo;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};



export function getCookieValueInServerSide(cookieString : string | null, cookieName : string) {
  // Use a regular expression to match the cookie name and value
  const match = cookieString?.match(new RegExp('(^|;\\s*)' + cookieName + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}