import jwt from "jsonwebtoken";
const generateTokens = (userId: string, email: string, username: string, isVerified : boolean) => {
    const accessToken = jwt.sign(
      { userId, email, username, isVerified },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
  
    const refreshToken = jwt.sign(
      { userId, email, username, isVerified  },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );
  
    return { accessToken, refreshToken };
  };

  export default generateTokens