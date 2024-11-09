import axios from "axios";
import { ISearchedUser } from "./interfaces/response";
import { updatePasswordSchema } from "@/schemas/updatePasswordSchema";
import { z } from "zod";
import { GroupedStories } from "@/app/api/update/Story/get-stories/route";
import { Post } from "@/app/api/home-page-post/route";
import { IrecommendedUser } from "@/app/api/user/recommendUser/route";
import { User } from "@/model/User";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAllUsers = async () => {
  const res = await axios.get(`${baseUrl}user`);
  return res.data.data as User[];
};

export const updateUserProfileImage = async (data : { file: string }) => {
  const res = await axios.post(`${baseUrl}user/update-profile-image`, data);
  return res.data;
};

export const getSignleUserData = async (userName: string) => {
  const res = await axios.get(
    `${baseUrl}user/user-by-userName?userName=${userName}`
  );
  return res.data.data as User;
};

export const getSearchedUsers = async ({
  searchKey,
  page,
}: {
  searchKey: string;
  page: number;
}) => {
  const res = await axios.get(
    `${baseUrl}search-user?searchKey=${searchKey}&page=${page}`
  );
  return res.data.data as ISearchedUser[];
};

export const seachUser = async (searchKey: string) => {
  const res = await axios.get(`${baseUrl}search-user?searchKey=${searchKey}`);
  return res.data;
};

export const getFollowers = async (userName: string) => {
  const res = await axios.get(`${baseUrl}user/followers?userName=${userName}`);
  return res.data.data as {
    userName: string;
    fullName: string;
  }[];
};

export const getFollowings = async (userName: string) => {
  const res = await axios.get(`${baseUrl}user/following?userName=${userName}`);
  return res.data.data as {
    userName: string;
    fullName: string;
  }[];
};

export const getQrCode = async (data: { userName: string; color: string }) => {
  const res = await axios.post(`${baseUrl}user/generateQr`, data);
  return res.data;
};

export const setAccountPrivate = async (data: { privateAccount: boolean }) => {
  const res = await axios.patch(`${baseUrl}user/accountPrivate`, data);
  return res.data;
};

export const updatePassword = async (
  data: z.infer<typeof updatePasswordSchema>
) => {
  const res = await axios.patch(`${baseUrl}user/changePassword`, data);
  return res.data;
};

export const setStory = async (data: { file: string }) => {
  const res = await axios.post(`${baseUrl}update/Story/add-story`, data);
  return res.data;
};

export const getStories = async () => {
  const res = await axios.get(`${baseUrl}update/Story/get-stories`);
  return res.data.stories as GroupedStories[];
};

export const getRecommendedUsers = async () => {
  const res = await axios.get(`${baseUrl}user/recommendUser`);
  return res.data.data as IrecommendedUser[];
};

export const getHomePageContent = async () => {
  const res = await axios.get(`${baseUrl}home-page-post`);
  return res.data.data as Post[];
};

export const getNotifications = async (userId: string) => {
  const res = await axios.get(`${baseUrl}update/Notification?userId=${userId}`);
  return res.data.data;
};

export const changeFirstLoginOfUser = async () => {
  const res = await axios.post(`${baseUrl}user/changeFirstLogin`);
  return res;
};