import { User } from "@/model/User";
import axios from "axios";

export const updateUserProfileImage = async (data: FormData) => {
  const res = await axios.post(
    "http://localhost:3000/api/user/update-profile-image",
    data
  );
  return res.data;
};

export const getSignleUserData = async (userName: string) => {
  const res = await axios.get(
    `http://localhost:3000/api/user/user-by-userName?userName=${userName}`
  );
  return res.data;
};


export const getSearchedUsers = async (searchKey: string) => {
  const res = await axios.get(
    `http://localhost:3000/api/search-user?searchKey=${searchKey}`
  );
  return res.data.data as User[];
}


export const seachUser = async (searchKey: string) => {
  const res = await axios.get(
    `http://localhost:3000/api/search-user?searchKey=${searchKey}`
  );
  return res.data;
}