"use client";
import { getSignleUserData } from "@/ApiServices/UserServices";
import { ProfileDetailFrag, ProfileFrag, ProfilePostSectionFrag } from "@/Fragments";
import { decodeToken } from "@/helpers/userInfo";
import { User } from "@/model/User";
import { useQuery } from "@tanstack/react-query";
const Page = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const user = decodeToken();

  const { data } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getSignleUserData(username),
  });

  const userData: User = data?.data;

  const ownViewer = user?.username === username;

  return (
    <div className="max-w-4xl mx-auto w-full">
      <ProfileDetailFrag ownViewer={ownViewer} user={userData}/>
      <ProfilePostSectionFrag  user={userData} username={username}/>
    </div>
  );
};

export default Page;