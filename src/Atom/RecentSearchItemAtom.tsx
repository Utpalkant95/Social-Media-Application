import { ISearchedUser } from "@/ApiServices/interfaces/response";
import { User } from "@/model/User";
import Image from "next/image";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { LuDot } from "react-icons/lu";
const RecentSearchItemAtom = ({ user, crossHide }: { user: ISearchedUser, crossHide : boolean }) => {
  return (
    <Link href={`/${user.userName}`}>
      <div className="flex items-center justify-between hover:bg-zinc-200 py-2 px-6">
        <div className="flex items-center gap-x-2">
          <div>
            <Image
              src={user.profileImage || "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=05qe_AeNbowQ7kNvgHD_c7I&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYASaeyU9jSGFck1ZKRnFVaMFapEUGaG7JXM_5xPDs-3MQ&oe=66C4344F&_nc_sid=328259"}
              alt="logo"
              width={45}
              height={45}
              className="overflow-hidden rounded-full"
            />
          </div>
          <div>
            <p className="font-medium text-sm">{user.userName}</p>
            <p className="text-sm font-light flex items-center">
              {user.fullName} <LuDot /> {user.followersCount} followers
            </p>
          </div>
        </div>
        <div>
          {crossHide ? <IoMdClose /> : null}
        </div>
      </div>
    </Link>
  );
};

export default RecentSearchItemAtom;
