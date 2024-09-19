import { Input } from "@/components/ui/input";
import React, { useState, useCallback, useEffect } from "react";
import { RecentSearchItemAtom } from "@/Atom";
import { TbXboxXFilled } from "react-icons/tb";
import { useMutation } from "@tanstack/react-query";
import { getSearchedUsers } from "@/ApiServices/UserServices";
import { debounce } from "lodash";
import { Loader } from "@/components";
import { ISearchedUser } from "@/ApiServices/interfaces/response";
import { useDispatch, useSelector } from "react-redux";
import {
  addSearchedUser,
  removeSeachedUser,
  removeAllSearchedUser,
} from "@/Store/searchedUserSlice";
import InfiniteScroll from "react-infinite-scroll-component";

// Define the state shape for better typing
interface RootState {
  searchedUserSlice: ISearchedUser[];
}

const SearchAtom = ({
  setIsDrawerOpen,
}: {
  setIsDrawerOpen: (value: boolean) => void;
}) => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [users, setUsers] = useState<ISearchedUser[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const dispatch = useDispatch();
  const searchedUser = useSelector(
    (state: RootState) => state.searchedUserSlice
  );

  const { mutate, isLoading } = useMutation({
    mutationKey: ["searchUser"],
    mutationFn: getSearchedUsers,
    onSuccess: (data) => {
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...data]);
      }
    },
  });

  // Stable debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setCurrentPage(1); // Reset page to 1 on new search
      setUsers([]); // Clear previous users
      mutate({ searchKey: query, page: 1 }); // Fetch first page of users
    }, 1000),
    [mutate]
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
    debouncedSearch(value); // Pass the latest value directly
  };

  const fetchMoreUsers = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    mutate({ searchKey, page: nextPage });
  };

  const handleClearAll = () => {
    dispatch(removeAllSearchedUser());
  };

  const handleRemoveUser = (userName: string) => {
    dispatch(removeSeachedUser(userName));
  };

  const handleUserClick = (user: ISearchedUser) => {
    dispatch(addSearchedUser(user));
  };

  const handleAfterNavigation = () => {
    setIsDrawerOpen(false);
    setSearchKey("");
  };

  return (
    <div className="h-full">
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
                mutate({ searchKey: "", page: 0 });
              }}
            />
          )}
        </div>
      </div>
      <div className="border-t overflow-y-auto h-full" id="scrollableDiv">
        {users && users.length > 0 && (
          <InfiniteScroll
            dataLength={users.length} 
            next={fetchMoreUsers} 
            hasMore={hasMore} 
            loader={<Loader className="w-4 h-4" />} 
            endMessage={<p>No more users</p>}
            scrollableTarget="scrollableDiv" 
          >
            {users.map((user: ISearchedUser) => (
              <RecentSearchItemAtom
                key={user.userName}
                user={user}
                crossHide={false}
                userAdd={handleUserClick}
                removeUser={handleRemoveUser}
                setIsDrawerOpen={handleAfterNavigation}
              />
            ))}
          </InfiniteScroll>
        )}
        <div className="">
          <div className="flex items-center justify-between p-6 overflow-y-auto">
            <h2 className="font-medium text-base">Recent</h2>
            <span
              className="text-sm cursor-pointer text-blue-500 hover:text-black"
              onClick={handleClearAll}
            >
              Clear all
            </span>
          </div>
          {/* Recent Search */}
          {searchedUser.map((user: ISearchedUser) => (
            <RecentSearchItemAtom
              key={user.userName}
              user={user}
              crossHide={true}
              userAdd={handleUserClick}
              removeUser={handleRemoveUser}
              setIsDrawerOpen={handleAfterNavigation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAtom;
