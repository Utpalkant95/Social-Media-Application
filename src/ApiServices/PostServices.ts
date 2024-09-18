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

export const getAllSavedPosts = async (userName: string) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/update/Post/saved-post`);
    return res.data.data as IAllPost[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Optionally, return a default value or rethrow the error
    throw error;
  } 
}


export const createPost = async (data: FormData) => {
  try {
    const res = await axios.post("http://localhost:3000/api/update/Post/add-post", data);
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export const addSavedPost = async ({postId} : {postId : string}) => {
  try {
    const res = await axios.post("http://localhost:3000/api/update/Post/saved-post/add", postId, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}