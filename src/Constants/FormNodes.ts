export const signUpFormNodes: {
  name: string;
  placeholder: string;
}[] = [
  {
    name: "email",
    placeholder: "Email",
  },
  {
    name: "fullName",
    placeholder: "Full Name",
  },
  {
    name: "userName",
    placeholder: "Username",
  },
  {
    name: "phone",
    placeholder: "Phone",
  },
  {
    name: "password",
    placeholder: "Password",
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
