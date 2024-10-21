import axios from "axios";
import { ISendFriendRequest } from "./interfaces/request";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const sendFollowRequest = async (data : ISendFriendRequest) => {
  const res = await axios.post(
    `${baseUrl}friend/follow-request`,
    data
  );
  return res.data;
};


export const sendUnFollowRequest = async (data : ISendFriendRequest) => {
  const res = await axios.post(
    `${baseUrl}friend/unfollow-request`,
    data
  );
  return res.data;
};
