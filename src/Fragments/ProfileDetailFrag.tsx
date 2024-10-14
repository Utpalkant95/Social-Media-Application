import { ProfileAvatarAtom, ProfileHeaderAtom } from "@/Atom";
import { decodeToken } from "@/helpers/userInfo";
import { User } from "@/model/User";
import Link from "next/link";
import { GoPlus } from "react-icons/go";

interface IProfileDetailFrag {
  user: User;
  ownViewer: boolean;
}

const ProfileDetailFrag = ({ ownViewer, user }: IProfileDetailFrag) => {
  const ActualUser = decodeToken();
  return (
    <div className="py-10 flex flex-col gap-y-5 sm:gap-y-10 px-2">
      {/* Profile Section */}
      <div className="flex items-center gap-x-4 sm:gap-x-24">
        <ProfileAvatarAtom ownViewer={ownViewer} user={user} />

        {/* detail section */}
        <div className="flex  flex-col gap-y-4">
          {/* fist */}
          <ProfileHeaderAtom ActualUser={ActualUser} ownViewer={ownViewer} user={user}/>
          {/* second */}
          <div className="flex items-center gap-x-8">
            <div>
              <p>{user?.posts.length} posts</p>
            </div>
            <div>
              <Link href={`/${user?.userName}/followers`}>
                <p>{user?.followers.length} followers</p>
              </Link>
            </div>
            <div>
              <Link href={`/${user?.userName}/following`}>
                <p>{user?.following.length} following</p>
              </Link>
            </div>
          </div>
          {/* third */}
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{user?.fullName}</p>
          </div>
        </div>
      </div>

      <div>
        <p>{user?.fullName}</p>
      </div>

      {/* Highlish Section */}
      <div>
        <div className="w-20 h-20 rounded-full border flex items-center justify-center bg-[#FAFAFA] cursor-pointer">
          <GoPlus size={50} className="text-[#C7C7C7]" />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailFrag;