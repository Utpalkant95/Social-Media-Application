import jwt from "jsonwebtoken";

interface IgenerateTokens {
  userId: string;
  email: string;
  username: string;
  isVerified: boolean;
  privateAccount: boolean;
  profileImage: string;
}
const generateTokens = ({
  email,
  isVerified,
  userId,
  username,
  privateAccount,
  profileImage

}: IgenerateTokens) => {
  const accessToken = jwt.sign(
    { userId, email, username, isVerified, privateAccount, profileImage },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const refreshToken = jwt.sign(
    { userId, email, username, isVerified },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export default generateTokens;
