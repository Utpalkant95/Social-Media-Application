import axios from "axios";

export const updateUserProfileImage = async (data: FormData) => {
  const res = await axios.post(
    "http://localhost:3000/api/user/update-user-profile-image",
    data
  );
  return res.data;
};

export const getSignleUserData = async (userName: string) => {
  const res = await axios.get(
    `http://localhost:3000/api/user/user-by-id?userName=${userName}`
  );
  return res.data;
};