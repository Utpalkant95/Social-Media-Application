import React from "react";
import { CiCamera } from "react-icons/ci";
import { IconType } from "react-icons/lib";

const EmptyComp = ({Icon, label, des} : {Icon : IconType, label: string, des: string}) => {
  return (
    <div className="flex justify-center items-center flex-col pt-4 gap-y-2">
      <div>
        <Icon size={50} />
      </div>
      <div className="text-2xl font-bold">{label}</div>
      <div className="text-sm  max-w-96 w-full">
        {des}
      </div>
    </div>
  );
};

export default EmptyComp;
