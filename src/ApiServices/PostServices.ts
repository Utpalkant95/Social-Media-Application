import axios from "axios";
import { IAllPost } from "./interfaces/response";
import { Post } from "@/app/api/home-page-post/route";

export const getAllPosts = async (userName: string) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/update/Post/all-post?userName=${userName}`
    );
    return res.data.data as IAllPost[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Optionally, return a default value or rethrow the error
    throw error;
  }
};

export const getPostById = async (postId: string) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/update/Post/get-post-by-id?postId=${postId}`
    );
    return res.data.data as IAllPost;
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Optionally, return a default value or rethrow the error
    throw error;
  }
};

export const getAllSavedPosts = async () => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/update/Post/saved-post`
    );
    return res.data.data as IAllPost[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Optionally, return a default value or rethrow the error
    throw error;
  }
};

export const createPost = async (data: FormData) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/update/Post/add-post",
      data
    );
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const addSavedPost = async ({ postId }: { postId: string }) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/update/Post/saved-post/add",
      postId,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const removeSavedPost = async ({ postId }: { postId: string }) => {
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/update/Post/saved-post/remove?postId=${postId}`
    );
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getSavedPostsForUser = async () => {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/update/Post/saved-post/get"
    );
    return res.data.data as string[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const explorePosts = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/explore");
    return res.data.data as Post[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Optionally, return a default value or rethrow the error
    throw error;
  }
};

export const deletePost = async ({ postId }: { postId: string }) => {
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/update/Post/delete-post?postId=${postId}`
    );
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const likeThePost = async (data: { postId: string }) => {
  try {
    const res = await axios.post(
      `http://localhost:3000/api/update/Post/like-post`,
      data
    );
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getLikedPostsForUser = async () => {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/update/Post/get-like-post"
    );
    return res.data.data as string[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};


export const unLikeThePost = async (data: { postId: string }) => {
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/update/Post/unlike-post?postId=${data.postId}`,
    );
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};