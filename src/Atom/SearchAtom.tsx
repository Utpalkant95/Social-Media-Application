import { Input } from "@/components/ui/input";
import React from "react";
import {RecentSearchItemAtom} from "@/Atom";
import { TbXboxXFilled } from "react-icons/tb";

const SearchAtom = () => {
  const [searchKey, setSearchKey] = React.useState<string>("");
  console.log("searchKey", searchKey);
  
  return (
    <div className="">
      <div className="p-6">
        <h2 className="font-medium text-2xl">Search</h2>
        <div className="flex items-center bg-[#FAFAFA] border rounded-md mt-6 pr-2">
          <Input placeholder="Search" className="border-none" value={searchKey} onChange={(e) => setSearchKey(e.target.value)}/>
          <TbXboxXFilled className="text-[#C7C7C7] cursor-pointer" />
        </div>
      </div>
      <div className="border-t">
        <div className="">
          <div className="flex items-center justify-between p-6">
            <h2 className="font-medium text-base">Recent</h2>
            <span className="text-sm cursor-pointer text-blue-500 hover:text-black">
              Clear all
            </span>
          </div>
            <RecentSearchItemAtom />
        </div>
      </div>
    </div>
  );
};

export default SearchAtom;
