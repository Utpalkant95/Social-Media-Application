import axios from "axios";
import { IAllPost, ISearchedUser } from "./interfaces/response";
import { updatePasswordSchema } from "@/schemas/updatePasswordSchema";
import { z } from "zod";
import { GroupedStories } from "@/app/api/update/Story/get-stories/route";
import { Post } from "@/app/api/home-page-post/route";

export const updateUserProfileImage = async (file: FormData) => {
  const res = await axios.post(
    "http://localhost:3000/api/user/update-profile-image",
    file
  );
  return res.data;
};

export const getSignleUserData = async (userName: string) => {
  const res = await axios.get(
    `http://localhost:3000/api/user/user-by-userName?userName=${userName}`
  );
  return res.data;
};

export const getSearchedUsers = async ({
  searchKey,
  page,
}: {
  searchKey: string;
  page: number;
}) => {
  const res = await axios.get(
    `http://localhost:3000/api/search-user?searchKey=${searchKey}&page=${page}`
  );
  return res.data.data as ISearchedUser[];
};

export const seachUser = async (searchKey: string) => {
  const res = await axios.get(
    `http://localhost:3000/api/search-user?searchKey=${searchKey}`
  );
  return res.data;
};

export const getFollowers = async (userName: string) => {
  const res = await axios.get(
    `http://localhost:3000/api/user/followers?userName=${userName}`
  );
  return res.data.data as {
    userName: string;
    fullName: string;
  }[];
};

export const getFollowings = async (userName: string) => {
  const res = await axios.get(
    `http://localhost:3000/api/user/following?userName=${userName}`
  );
  return res.data.data as {
    userName: string;
    fullName: string;
  }[];
};

export const getQrCode = async (data: { userName: string; color: string }) => {
  const res = await axios.post(
    `http://localhost:3000/api/user/generateQr`,
    data
  );
  return res.data;
};

export const setAccountPrivate = async (data: { privateAccount: boolean }) => {
  const res = await axios.patch(
    `http://localhost:3000/api/user/accountPrivate`,
    data
  );
  return res.data;
};

export const updatePassword = async (
  data: z.infer<typeof updatePasswordSchema>
) => {
  const res = await axios.patch(
    `http://localhost:3000/api/user/changePassword`,
    data
  );
  return res.data;
};

export const setStory = async (file: FormData) => {
  const res = await axios.post(`http://localhost:3000/api/update/Story/add-story`, file);
  return res.data;
};

export const getStories = async () => {
  const res = await axios.get(`http://localhost:3000/api/update/Story/get-stories`);
  return res.data.stories as GroupedStories[];
}

export const getRecommendedUsers = async () => {
  const res = await axios.get(`http://localhost:3000/api/user/recommendUser`);
  return res.data.data 
}

export const getHomePageContent = async () => {
  const res = await axios.get(`http://localhost:3000/api/home-page-post`);
  return res.data.data as Post[]
}