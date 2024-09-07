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


export interface ICreatePost {
    file : File;
    description : string;
    location : string;
    altText : string;
    hideLikeViewCount : boolean;
    hideComment : boolean;
    likeCount : number;
    commentCount : number;
    shareCount : number;
}

export interface ISendFriendRequest {
    senderId : string;
    receiverId : string
}