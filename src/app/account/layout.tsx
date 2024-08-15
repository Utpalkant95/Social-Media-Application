import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full h-screen bg-white py-2">
      <div className="border-[#DBDBDB] border max-w-sm mx-auto p-2 px-12">
        <h1 className="text-center  text-4xl font-bold py-8">Snapify</h1>
        <div className="flex items-center  w-full">
         {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
