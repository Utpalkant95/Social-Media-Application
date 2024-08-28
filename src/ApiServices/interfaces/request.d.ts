export interface ISignUpUser {
    email: string,
    fullName : string;
    userName : string;
    phone : string;
    password : string
}

export interface ISignInUser {
    email : string;
    password : string
}

export interface IVerifyUser {
    userName : string
    emailOtp : string
    phoneOtp : string
}
