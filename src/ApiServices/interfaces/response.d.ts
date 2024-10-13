import { Post } from "@/model/Post";

export interface IRESSignUpUser {
    success : boolean;
    message : string;
    route : string;
}

export interface IAllPost extends Post{
    _id : string
}

export interface ISearchedUser {
    fullName : string;
    userName : string;
    profileImage : string;
    followersCount : string;
}

export interface IComment {
    _id: string;
    senderId: string;
    senderUsername: string;
    senderProfileImage: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }