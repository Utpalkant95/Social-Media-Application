import axios from "axios";
import { ISignInUser, ISignUpUser } from "./interfaces/request";

export const signUpUser = async ( data: ISignUpUser ) => {
  const res = await axios.post("http://localhost:3000/api/sign-up", data);
  return res.data
};


export const signInUser = async (data : ISignInUser) => {
  const res = await axios.post("http://localhost:3000/api/sign-in", data);
  return res.data
};