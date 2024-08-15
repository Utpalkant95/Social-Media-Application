import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  otp : string
}

export const Email_Template: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  otp
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <h2>OTP : {otp}</h2>
  </div>
);

export default Email_Template;