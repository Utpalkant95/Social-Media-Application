import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getRecommendedUsers } from "@/ApiServices/UserServices";

const UserRecommendAtom = () => {
    const {data, isLoading} = useQuery({
        queryKey: ["recommend user"],
        queryFn : getRecommendedUsers
    })

    console.log("data", data);
    
  return (
    <>
      <h4 className="text-sm font-semibold text-gray-500">Suggested for you</h4>
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
          <span className="text-xs text-blue-500 cursor-pointer">Follow</span>
        </div>
      ))}
    </>
  );
};

export default UserRecommendAtom;