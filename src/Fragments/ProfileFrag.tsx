import Image from "next/image"
import { ReactNode } from "react"
import { FaCamera } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { Tab } from "@/components";
import { ProfilePostAtom, ProfileSavedAtom, ProfileTagedAtom } from "@/Atom";

const ProfileFrag = ({children} : {children : ReactNode}) => {
  
  const tabItems = [
    {
      label: "POSTS",
      value: "posts",
      content : <ProfilePostAtom />,
    },
    {
      label: "SAVED",
      value: "saved",
      content : <ProfileSavedAtom />
    },
    {
      label: "TAGGED",
      value: "tagged",
      content : <ProfileTagedAtom />
    }
  ];
  return (
    <div className="px-44">
      {/* User name profile section */}
     <div className="profile section  py-10 flex flex-col gap-y-10">
      {/* Profile Section */}
        <div className="flex items-center gap-x-24">
          {/* photo section */}
          <div>
          <div className="relative cursor-pointer">
             <div className="bg-black/60 absolute w-[150px] h-[150px] overflow-hidden rounded-full">

              </div>
               <Image  src="https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=05qe_AeNbowQ7kNvgHD_c7I&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYASaeyU9jSGFck1ZKRnFVaMFapEUGaG7JXM_5xPDs-3MQ&oe=66C4344F&_nc_sid=328259" alt="profile" width={150} height={150}/> 
                <div className="absolute  left-[55px] bottom-[55px]">
               <FaCamera className="text-white" size={40}/>
                </div>

             </div>
          </div>

          {/* detail section */}
          <div className="flex  flex-col gap-y-4">
            {/* fist */}
              <div className="flex items-center gap-x-4">
                {/* username */}
                <div>
                  <p>utpal_9540</p>
                </div>
                {/* buttons */}
                <div className="flex items-center gap-x-2">
                <div><Button variant="profileButton">Edit profile</Button></div>
                 <div><Button variant="profileButton">view archive</Button></div>
                <div><IoIosSettings size={30}/></div>
                </div>
              </div>
              {/* second */}
              <div className="flex items-center gap-x-8">
                <div>
                  <p>0 posts</p>
                </div>
                <div>
                  <p>16 followers</p>
                </div>
                <div>
                  <p>20 following</p>
                </div>
              </div>
              {/* third */}
              <div>
                <p  className="text-sm font-medium">Utpal Kant</p>
              </div>
          </div>
        </div>

        {/* Highlish Section */}
        <div>
          <div className="w-20 h-20 rounded-full border flex items-center justify-center bg-[#FAFAFA] cursor-pointer">
                <GoPlus size={50} className="text-[#C7C7C7]"/>
          </div>
        </div>

     </div>
     {/* post saved tagged section */}
     <div className="post section">
     <Tab defaultValue="posts" tabItems={tabItems} className="w-full border-t" TabsListClassName="bg-white" TabsTriggerClassName="data-[state=active]:border-t border-black rounded-none shadow-none text-xs py-2"/>
     </div>
    </div>
  )
}

export default ProfileFrag