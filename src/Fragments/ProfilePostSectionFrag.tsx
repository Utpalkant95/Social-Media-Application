import { ProfilePostAtom, ProfileSavedAtom, ProfileTagedAtom } from "@/Atom";
import { Tab } from "@/components";
import { User } from "@/model/User";
import React from "react";
import { BsPostcardHeart } from "react-icons/bs";
import { CiSaveDown2 } from "react-icons/ci";
import { FaUserTag } from "react-icons/fa";

interface IProfilePostSectionFrag {
    user: User;
    username : string;
}

const ProfilePostSectionFrag = ({user, username} : IProfilePostSectionFrag) => {
  const tabItems = [
    {
      label: "POSTS",
      value: "posts",
      content: <ProfilePostAtom userName={username} />,
      Icon: BsPostcardHeart,
    },
    {
      label: "SAVED",
      value: "saved",
      content: <ProfileSavedAtom user={user} />,
      Icon: CiSaveDown2,
    },
    // {
    //   label: "TAGGED",
    //   value: "tagged",
    //   content: <ProfileTagedAtom user={user} />,
    //   Icon: FaUserTag,
    // },
  ];

  return (
    <div className="post section">
      <Tab
        defaultValue="posts"
        tabItems={tabItems}
        className="w-full border-t"
        TabsListClassName="bg-white"
        TabsTriggerClassName="data-[state=active]:border-t border-black rounded-none shadow-none text-xs py-2 flex items-center gap-x-1"
      />
    </div>
  );
};

export default ProfilePostSectionFrag;