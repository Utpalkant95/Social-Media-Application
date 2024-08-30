import { Post } from "@/model/Post";

export interface IRESSignUpUser {
    success : boolean;
    message : string;
    route : string;
}

export interface IAllPost extends Post{
    _id : string
}