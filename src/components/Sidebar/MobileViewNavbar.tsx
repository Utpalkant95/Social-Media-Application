"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { RiMessengerLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { PrimaryPopOver } from "@/components/PrimaryPopOver";
import { decodeToken, IUserInfo } from "@/helpers/userInfo";

const MobileViewNavbar = () => {
  const user: IUserInfo | null = decodeToken();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsPopoverOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between py-4 border-b px-4">
        <div>
          <Link href={"/"}>
            <h2 className="font-medium">Snapify</h2>
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            ref={buttonRef}
            onClick={handleClick}
            aria-describedby={isPopoverOpen ? "custom-popover" : undefined}
          >
            <FiUsers size={20} />
          </button>
          <div>{/* <RiMessengerLine size={20} /> */}</div>
        </div>
      </header>

      <PrimaryPopOver
        anchorEl={buttonRef.current}
        open={isPopoverOpen}
        onClose={handleClose}
        id="custom-popover"
      >
        <ul className="flex flex-col w-24 py-1 gap-y-2">
          <Link href={`/${user?.username}/followers`}>
            <li
              className="border-b text-center py-2"
              onClick={() => setIsPopoverOpen(false)}
            >
              Followers
            </li>
          </Link>
          <Link href={`/${user?.username}/following`}>
            <li
              className="text-center py-2"
              onClick={() => setIsPopoverOpen(false)}
            >
              Followings
            </li>
          </Link>
        </ul>
      </PrimaryPopOver>
    </>
  );
};

export default MobileViewNavbar;
