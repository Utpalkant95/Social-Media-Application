"use client";
import { getSignleUserData } from "@/ApiServices/UserServices";
import { ProfileFrag } from "@/Fragments";
import { decodeToken } from "@/helpers/userInfo";
import { User } from "@/model/User";
import { useMutation, useQuery } from "@tanstack/react-query";
const Page = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const user = decodeToken();
  console.log(user?.userId);

 const {data} = useQuery({
   queryKey: ["user"],
   queryFn: () => getSignleUserData(username),
 })

 const userData : User = data?.data
  
  const ownViewer= user?.username === username;
  
  // fetch user details

  return <ProfileFrag user = {userData} ownViewer = {ownViewer}>{username}</ProfileFrag>;
};

export default Page;