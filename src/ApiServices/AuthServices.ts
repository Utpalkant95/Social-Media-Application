import axios from "axios";
import { ISignInUser, ISignUpUser, IVerifyUser } from "./interfaces/request";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const signUpUser = async ( data: ISignUpUser ) => {
  const res = await axios.post(`${baseUrl}auth/sign-up`, data);
  return res.data
};

export const signInUser = async (data : ISignInUser) => {
  const res = await axios.post(`${baseUrl}auth/sign-in`, data);
  return res.data
};

export const verifyUser = async (data :  IVerifyUser) => {
  const res = await axios.post(`${baseUrl}auth/verify`, data);
  return res.data
}