import jwt from "jsonwebtoken";

interface IgenerateTokens {
  userId: string;
  email: string;
  username: string;
  isVerified: boolean;
  privateAccount: boolean;
}
const generateTokens = ({
  email,
  isVerified,
  userId,
  username,
  privateAccount,
}: IgenerateTokens) => {
  const accessToken = jwt.sign(
    { userId, email, username, isVerified, privateAccount },
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
