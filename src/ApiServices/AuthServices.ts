import axios from "axios";
import { ISignInUser, ISignUpUser, IVerifyUser } from "./interfaces/request"

export const signUpUser = async ( data: ISignUpUser ) => {
  const res = await axios.post("http://localhost:3000/api/auth/sign-up", data);
  return res.data
};


export const signInUser = async (data : ISignInUser) => {
  const res = await axios.post("http://localhost:3000/api/auth/sign-in", data);
  return res.data
};

export const verifyUser = async (data :  IVerifyUser) => {
  const res = await axios.post("http://localhost:3000/api/auth/verify", data);
  return res.data
}