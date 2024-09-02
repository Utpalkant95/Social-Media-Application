import axios from "axios";
import { ISendFriendRequest } from "./interfaces/request";

export const sendFriendRequest = async (data : ISendFriendRequest) => {
  const res = await axios.post(
    "http://localhost:3000/api/friend/friend-request",
    data
  );
  return res.data;
};
