import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getRecommendedUsers } from "@/ApiServices/UserServices";
import { IrecommendedUser } from "@/app/api/user/recommendUser/route";
import { User } from "@/model/User";
import Link from "next/link";
import { DialogSheet } from "@/components";
import { LoginFrag } from "@/Fragments";
import UserRecommentUserProfile from "./UserRecommentUserProfile";

const UserRecommendAtom = ({ user }: { user: User | undefined }) => {
  const [openSwitch, setOpenSwitch] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["recommend user"],
    queryFn: getRecommendedUsers,
  });

  const handleSwitchClick = () => {
    setOpenSwitch(!openSwitch);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-x-2">
          <div className="w-11 h-11 overflow-hidden rounded-full">
            <Image
              src={user?.profileImage ? user?.profileImage : "https://images.pexels.com/photos/28220699/pexels-photo-28220699/free-photo-of-nguoitamchuyenhouse-sai-gon-vi-t-nam-2020-saigon-vietnam-2020.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"}
              alt="profile"
              width={44}
              height={44}
              className="rounded-full w-full overflow-hidden h-full object-cover"
            />
          </div>
          <Link href={`/${user?.userName}`} prefetch={false}>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.userName}</span>
              <span className="text-xs font-light text-gray-500">
                {user?.userName}
              </span>
            </div>
          </Link>
        </div>
        <div>
          <span
            className="text-xs text-blue-500 cursor-pointer"
            onClick={handleSwitchClick}
          >
            Switch
          </span>
        </div>
      </div>
      <h4 className="text-sm font-semibold text-gray-500">Suggested for you</h4>
      {data?.map((user: IrecommendedUser, index: number) => (
        <UserRecommentUserProfile  key={user._id} profileImage={user.profileImage} userName={user.userName} followType={false}/>
      ))}

      {/* Swtich Part Area */}

      <DialogSheet onClose={() => setOpenSwitch(false)} isOpen={openSwitch}>
        <div className="bg-white max-w-xl px-6 py-4 rounded-md w-full">
          <LoginFrag />
        </div>
      </DialogSheet>
    </>
  );
};

export default UserRecommendAtom;