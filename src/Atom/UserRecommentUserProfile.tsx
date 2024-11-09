import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link"
interface IUserRecommentUserProfile {
  key: string;
  profileImage: string;
  userName: string;
  followType: boolean;
}

const UserRecommentUserProfile = ({
  key,
  profileImage,
  userName,
  followType,
}: IUserRecommentUserProfile) => {
  return (
    <Link href={`/${userName}`} prefetch={false}>
    <div key={key} className="flex items-center justify-between mt-2">
      <div className="flex items-center gap-x-2">
        <div className="w-11 h-11 overflow-hidden rounded-full">
          <Image
            src={
              profileImage
                ? profileImage
                : "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=05qe_AeNbowQ7kNvgHD_c7I&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYASaeyU9jSGFck1ZKRnFVaMFapEUGaG7JXM_5xPDs-3MQ&oe=66C4344F&_nc_sid=328259"
            }
            alt="profile"
            width={44}
            height={44}
            className="rounded-full w-full overflow-hidden h-full object-cover"
          />
        </div>
        <span className="text-sm font-medium">{userName}</span>
      </div>
        <Link href={`/${userName}`} prefetch={false}>
          <span className="text-xs text-blue-500 cursor-pointer">View</span>
        </Link>
    </div>
    </Link>
  );
};

export default UserRecommentUserProfile;
