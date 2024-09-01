import { Input } from "@/components/ui/input";
import React, { useState, useCallback } from "react";
import { RecentSearchItemAtom } from "@/Atom";
import { TbXboxXFilled } from "react-icons/tb";
import { useMutation } from "@tanstack/react-query";
import { getSearchedUsers } from "@/ApiServices/UserServices";
import { debounce } from "lodash";
import { Loader } from "@/components";
import { ISearchedUser } from "@/ApiServices/interfaces/response";

const SearchAtom = () => {
  const [searchKey, setSearchKey] = useState<string>("");

  const { data, mutate, isLoading } = useMutation({
    mutationKey: ["searchUser"],
    mutationFn: getSearchedUsers,
  });

  // Stable debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      console.log("Debounced Search Query:", query);
      mutate(query);
    }, 1000), 
    [] 
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
    debouncedSearch(value); // Pass the latest value directly
  };

  return (
    <div className="">
      <div className="p-6">
        <h2 className="font-medium text-2xl">Search</h2>
        <div className="flex items-center bg-[#FAFAFA] border rounded-md mt-6 pr-2">
          <Input
            placeholder="Search"
            className="border-none"
            value={searchKey}
            onChange={handleOnChange}
          />
          {isLoading ? (
            <Loader className="w-4 h-4" />
          ) : (
            <TbXboxXFilled
              className="text-[#C7C7C7] cursor-pointer"
              onClick={() => {
                setSearchKey("");
                mutate(searchKey);
              }}
            />
          )}
        </div>
      </div>
      <div className="border-t overflow-y-scroll">
        {data && data.length > 0 && (
          <>
            {data?.map((user: ISearchedUser) => {
              return <RecentSearchItemAtom user={user} crossHide={false} />;
            })}
          </>
        )}
        {data && data.length === 0 && (
          <div className="">
            <div className="flex items-center justify-between p-6">
              <h2 className="font-medium text-base">Recent</h2>
              <span className="text-sm cursor-pointer text-blue-500 hover:text-black">
                Clear all
              </span>
            </div>
            {/* Recent Search */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAtom;