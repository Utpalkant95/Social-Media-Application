export const signUpFormNodes: {
  name: string;
  placeholder: string;
  type?: string;
}[] = [
  {
    name: "email",
    placeholder: "Email",
    type: "email",
  },
  {
    name: "fullName",
    placeholder: "Full Name",
    type: "text",
  },
  {
    name: "userName",
    placeholder: "Username",
    type: "text",
  },
  {
    name: "phone",
    placeholder: "Phone",
    type: "text",
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
  },
];

export const signInFormNodes: {
  name: string;
  placeholder: string;
}[] = [
  {
    name: "email",
    placeholder: "Email",
  },
  {
    name: "password",
    placeholder: "Password",
  },
];

export const verifyFormNodes: {
  name: string;
  placeholder: string;
  maxLenght?: number;
}[] = [
  {
    name: "userName",
    placeholder: "username",
  },
  {
    name: "emailOtp",
    placeholder: "Email Otp",
    maxLenght: 6,
  },
  {
    name: "phoneOtp",
    placeholder: "Phone Otp",
    maxLenght: 6,
  },
];

export const editProfileFormNodes: {
  name: string;
  placeholder: string;
  maxLenght?: number;
}[] = [
  {
    name: "fullName",
    placeholder: "Full Name",
  },
  {
    name: "userName",
    placeholder: "Username",
  },
  {
    name: "bio",
    placeholder: "Bio",
  },
  {
    name: "email",
    placeholder: "Email",
  },
  {
    name: "phone",
    placeholder: "Phone Number",
  },
  {
    name: "gender",
    placeholder: "Gender",
  },
];

export const changePasswordFormNodes: {
  name: string;
  placeholder: string;
  maxLenght?: number;
}[] = [
  {
    name: "currentPassword",
    placeholder: "Current Password",
  },
  {
    name: "newPassword",
    placeholder: "New Password",
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm Password",
  },
];
