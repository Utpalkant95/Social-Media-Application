import axios from "axios";
import { ISendFriendRequest } from "./interfaces/request";

export const sendFollowRequest = async (data : ISendFriendRequest) => {
  const res = await axios.post(
    "http://localhost:3000/api/friend/follow-request",
    data
  );
  return res.data;
};


export const sendUnFollowRequest = async (data : ISendFriendRequest) => {
  const res = await axios.post(
    "http://localhost:3000/api/friend/unfollow-request",
    data
  );
  return res.data;
};
