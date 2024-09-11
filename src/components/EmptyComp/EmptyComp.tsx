import React from "react";
import { CiCamera } from "react-icons/ci";

const EmptyComp = () => {
  return (
    <div className="flex justify-center items-center flex-col pt-4 gap-y-2">
      <div>
        <CiCamera size={50} />
      </div>
      <div className="text-2xl font-bold">Share Photos</div>
      <div className="text-sm">
        When you share photos, they will appear on your profile.
      </div>
    </div>
  );
};

export default EmptyComp;
