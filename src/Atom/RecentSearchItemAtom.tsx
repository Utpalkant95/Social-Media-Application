import { ISearchedUser } from "@/ApiServices/interfaces/response";
import Image from "next/image";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { LuDot } from "react-icons/lu";

const RecentSearchItemAtom = ({
  user,
  crossHide,
  userAdd,
  removeUser,
  setIsDrawerOpen
}: {
  user: ISearchedUser;
  crossHide: boolean;
  userAdd: (user: ISearchedUser) => void;
  removeUser: (userName: string) => void;
  setIsDrawerOpen : () => void
}) => {
  return (
    <div className="flex items-center justify-between hover:bg-zinc-200 py-2 px-6">
      <Link href={`/${user.userName}`} onClick={() => {
        userAdd(user)
        setIsDrawerOpen()
      }}>
        <div className="flex items-center gap-x-2">
          <div className="w-11 h-11 rounded-full overflow-hidden">
            <Image
              src={
                user.profileImage ||
                "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=05qe_AeNbowQ7kNvgHD_c7I&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYASaeyU9jSGFck1ZKRnFVaMFapEUGaG7JXM_5xPDs-3MQ&oe=66C4344F&_nc_sid=328259"
              }
              alt="logo"
              width={44}
              height={44}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-sm">{user.userName}</p>
            <p className="text-sm font-light flex items-center">
              {user.fullName} <LuDot /> {user.followersCount} followers
            </p>
          </div>
        </div>
      </Link>
      {crossHide ? (
        <IoMdClose
          onClick={(e) => {
            e.stopPropagation(); 
            removeUser(user.userName);
          }}
          className="text-[#C7C7C7] cursor-pointer"
        />
      ) : null}
    </div>
  );
};

export default RecentSearchItemAtom;