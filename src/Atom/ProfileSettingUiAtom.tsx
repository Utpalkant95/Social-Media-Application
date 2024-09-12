"use client";
import Link from "next/link";
import React from "react";

const ProfileSettingUiAtom = () => {
  // const items = [
  //   "QR code",
  //   "Settings and privacy",
  //   "Log Out",
  // ]

  const items = [
    {
      id: "1",
      label: "QR code",
      link: "/qr",
    },
    // {
    //   id : "2",
    //   label : "Settings and privacy",
    //   link  : "/settings",
    // },
    {
      id: "3",
      label: "Log Out",
      onClick: () => void 0,
    },
  ];
  return (
    <div className="rounded-xl bg-white max-w-md w-full">
      {items.map((item, index) => {
        return (
          <Link href={item.link ?? "#"} key={item.id}>
            <div
              className={`py-3 text-center cursor-pointer  text-sm ${
                index === items.length - 1 ? "border-0" : "border-b"
              }`}
              onClick={item?.onClick}
            >
              {item.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfileSettingUiAtom;
