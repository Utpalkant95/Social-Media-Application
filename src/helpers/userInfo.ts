import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface IUserInfo {
  email: string;
  exp: number;
  iat: number;
  isVerified: boolean;
  username: string;
  userId: string;
}

export const decodeToken = () : IUserInfo | null => {
  const accessToken = Cookies.get("accessToken");
  console.log("accessToken", accessToken);

  if (!accessToken) {
    console.error("No access token found");
    return null;
  }

  try {
    // Decode the JWT token
    const decoded = jwtDecode(accessToken);
    return decoded as IUserInfo;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};