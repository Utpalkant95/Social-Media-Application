"use client";
import Image from "next/image";
import { decodeToken } from "@/helpers/userInfo";

const Page = () => {
  const user = decodeToken();

  return (
    <div className="min-[1144px]:max-w-5xl w-full min-[1144px]:flex min-[1144px]:mx-auto py-6 min-[1144px]:gap-x-20">
      <div className="min-[1144px]:max-w-2xl max-w-xl mx-auto w-full">
        {/* Stories Section */}
        <div className="flex overflow-x-auto space-x-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="w-16 flex flex-col items-center">
              <div className="h-16 w-16 rounded-full border-2 flex items-center justify-center">
                <Image
                  src={
                    "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=05qe_AeNbowQ7kNvgHD_c7I&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYASaeyU9jSGFck1ZKRnFVaMFapEUGaG7JXM_5xPDs-3MQ&oe=66C4344F&_nc_sid=328259"
                  }
                  alt="profile"
                  width={56}
                  height={56}
                  className="rounded-full transform transition-transform duration-300 ease-in-out"
                />
              </div>
              <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                utpal_9540
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side (Profile Section) */}
      <div className="w-64 hidden min-[1144px]:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <div>
              <Image
                src={
                  "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=05qe_AeNbowQ7kNvgHD_c7I&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYASaeyU9jSGFck1ZKRnFVaMFapEUGaG7JXM_5xPDs-3MQ&oe=66C4344F&_nc_sid=328259"
                }
                alt="profile"
                width={44}
                height={44}
                className="rounded-full border overflow-hidden transform transition-transform duration-300 ease-in-out"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.username}</span>
              <span className="text-xs font-light text-gray-500">
                {user?.username}
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs text-blue-500 cursor-pointer">Switch</span>
          </div>
        </div>

        {/* Suggested Profiles */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-500">
            Suggested for you
          </h4>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-x-2">
                <Image
                  src={
                    "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=05qe_AeNbowQ7kNvgHD_c7I&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYASaeyU9jSGFck1ZKRnFVaMFapEUGaG7JXM_5xPDs-3MQ&oe=66C4344F&_nc_sid=328259"
                  }
                  alt="profile"
                  width={44}
                  height={44}
                  className="rounded-full border"
                />
                <span className="text-sm font-medium">random_user</span>
              </div>
              <span className="text-xs text-blue-500 cursor-pointer">
                Follow
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
