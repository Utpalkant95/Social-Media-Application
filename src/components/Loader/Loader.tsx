import React from "react";

const Loader = ({className} : {className ?: string}) => {
  return (
    <div >
      <div className={`relative ${className} w-4 h-4`}>
        <div className="absolute inset-0 animate-spin-fast rounded-full border-4 border-t-transparent border-blue-600"></div>
        <div className="absolute inset-0 animate-spin-slow rounded-full border-4 border-t-transparent border-blue-400"></div>
        <div className="absolute inset-0 animate-spin-normal rounded-full border-4 border-t-transparent border-blue-200"></div>
      </div>
    </div>
  );
};

export default Loader;
