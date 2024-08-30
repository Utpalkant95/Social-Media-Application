import axios from "axios";
import { IAllPost } from "./interfaces/response";

export const getAllPosts = async (userName: string) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/update/Post/all-post?userName=${userName}`);
    return res.data.data as IAllPost[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Optionally, return a default value or rethrow the error
    throw error;
  }
};
