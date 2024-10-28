"use client";
import { getSignleUserData } from "@/ApiServices/UserServices";
import { ProfileDetailFrag, ProfilePostSectionFrag } from "@/Fragments";
import { decodeToken } from "@/helpers/userInfo";
import { User } from "@/model/User";
import { useQuery } from "@tanstack/react-query";
const Page = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const user = decodeToken();

  const { data } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getSignleUserData(username),
    enabled: !!username,
  });

  const ownViewer = user?.username === username;

  return (
    <div className="max-w-4xl mx-auto w-full">
      <ProfileDetailFrag ownViewer={ownViewer} user={data as User}/>
      <ProfilePostSectionFrag  user={data as User} username={username}/>
    </div>
  );
};

export default Page;