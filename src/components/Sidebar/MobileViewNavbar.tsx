import React from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { RiMessengerLine } from "react-icons/ri";

const MobileViewNavbar = () => {
  return (
    <header className="flex items-center justify-between py-4 border-b px-4">
      <div>
        <h2>Snapify</h2>
      </div>
      <div className="flex items-center gap-x-4">
        <div>
          <IoIosHeartEmpty size={20}/>
        </div>
        <div >
          <RiMessengerLine size={20}/>
        </div>
      </div>
    </header>
  );
};

export default MobileViewNavbar;
