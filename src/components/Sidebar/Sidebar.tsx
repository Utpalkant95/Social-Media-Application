"use client";
import { useSidebarCompFactory } from "@/hooks";
import { INavItems, navItems, navItems2 } from "@/Constants/SideBarMenus";
import Link from "next/link";
import Image from "next/image";
import { ReactNode, useRef, useState, useMemo, useCallback } from "react";
import { DialogSheet, PopOver, SlideSheet } from "@/components";
import logo from "../../../public/snapify-favicon-white.svg";
import { decodeToken } from "@/helpers/userInfo";
import { useQuery } from "@tanstack/react-query";
import { getSignleUserData } from "@/ApiServices/UserServices";
import { CiLogout } from "react-icons/ci";
import Logout from "@/helpers/Logout";

const Sidebar = () => {
  const [activeId, setActiveId] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isDailog, setIsDailog] = useState<boolean>(false);
  const [isPopOver, setIsPopOver] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const user = decodeToken();
  const username = user?.username;

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getSignleUserData(username as string),
    enabled: !!username,
  });

  // Call the hook at the top level
  const SidebarComponent = useSidebarCompFactory({ key: activeId });

  const drawerContent = useMemo<ReactNode>(() => {
    return SidebarComponent ? (
      <SidebarComponent setIsDrawerOpen={setIsDrawerOpen} />
    ) : null;
  }, [SidebarComponent]);

  const handleItemClick = useCallback(
    (item: INavItems) => {
      setActiveId((prevId) => {
        if (prevId !== item.id) {
          return item.id;
        }
        return prevId;
      });

      if (item.popUp && !isPopOver) setIsPopOver(true);
      if (item.dialog && !isDailog) setIsDailog(true);
      if (item.drawer && !isDrawerOpen) {
        setIsDrawerOpen(true);
      } else if (!item.drawer && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    },
    [isPopOver, isDailog, isDrawerOpen]
  );

  return (
    <>
      <aside
        className={`border h-screen pr-1 w-fit xl:w-56 pl-1 grid grid-rows-[max-content_1fr_max-content]  ${
          isDrawerOpen ? "max-w-fit" : "w-56"
        }`}
      >
        {/* LOGO SECTION */}
        <header
          className={`flex items-center  h-20 ${
            isDrawerOpen ? "justify-center" : "px-3"
          }`}
        >
          {isDrawerOpen ? (
            <span
              className={` ${isDrawerOpen ? "hidden" : "font-medium text-2xl"}`}
            >
              Snapify
            </span>
          ) : (
            <span
              className={`hidden xl:block ${
                isDrawerOpen ? "hidden" : "font-medium text-2xl"
              }`}
            >
              Snapify
            </span>
          )}
          {isDrawerOpen ? (
            <Image
              style={isDrawerOpen ? { display: "block" } : { display: "none" }}
              src={logo}
              alt="logo"
              width={40}
              height={40}
            />
          ) : (
            <Image
              src={logo}
              alt="logo"
              width={40}
              height={40}
              className={`block xl:hidden`}
            />
          )}
        </header>

        <nav>
          <ul className="flex flex-col gap-y-2">
            {navItems.map((item: INavItems) => {
              const isActive = activeId === item.id;
              const dynamicPath =
                item.name === "profile"
                  ? `/${data?.userName}`
                  : item.path && item.path;
              return (
                <li
                  key={item.id}
                  className={`group py-2 rounded-md px-2 transform transition-all duration-300 ease-in-out ${
                    isDrawerOpen
                      ? "hover:bg-zinc-200"
                      : "hover:bg-zinc-200 border-none"
                  } ${isActive ? "border" : ""}`}
                  onClick={() => handleItemClick(item)}
                >
                  <Link
                    href={item.drawer ? "#" : dynamicPath}
                    className="flex items-center justify-center xl:justify-normal gap-x-3"
                  >
                    {isActive
                      ? item.DV_ICON && (
                          <item.DV_ICON
                            size={28}
                            className="transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
                          />
                        )
                      : item.LV_ICON && (
                          <item.LV_ICON
                            size={28}
                            className="transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
                          />
                        )}
                    {item.img && (
                      <div
                        className={`${
                          isActive
                            ? "border-2 border-black w-7 h-7 rounded-full overflow-hidden"
                            : ""
                        } `}
                      >
                        <div className="w-7 h-7 rounded-full overflow-hidden">
                          <Image
                            src={
                              data?.profileImage ||
                              "https://images.pexels.com/photos/28220699/pexels-photo-28220699/free-photo-of-nguoitamchuyenhouse-sai-gon-vi-t-nam-2020-saigon-vietnam-2020.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                            }
                            alt=""
                            width={28}
                            height={28}
                            className="rounded-full w-full h-full object-cover overflow-hidden transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
                          />
                        </div>
                      </div>
                    )}
                    {isDrawerOpen ? (
                      <span
                        className={`capitalize text-base ${
                          isActive ? "font-bold" : "font-light"
                        } ${isDrawerOpen ? "hidden" : ""}`}
                      >
                        {item.name}
                      </span>
                    ) : (
                      <span
                        className={`capitalize hidden xl:block text-base ${
                          isActive ? "font-bold" : "font-light"
                        }`}
                      >
                        {item.name}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <nav className="flex flex-col gap-y-2 pb-4">
          {/* {navItems2.map((item: INavItems) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                className="group hover:bg-zinc-200 py-2 rounded-md px-2 transform transition-all duration-300 ease-in-out"
                onClick={() => handleItemClick(item)}
              >
                <Link
                  href={item.path}
                  className="flex items-center justify-center xl:justify-normal gap-x-3"
                >
                  {isActive
                    ? item.DV_ICON && (
                        <item.DV_ICON
                          size={28}
                          className="transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
                        />
                      )
                    : item.LV_ICON && (
                        <item.LV_ICON
                          size={28}
                          className="transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
                        />
                      )}
                  {isDrawerOpen ? (
                    <span
                      className={`capitalize text-base ${
                        isDrawerOpen ? "hidden" : ""
                      } ${isActive ? "font-bold" : "font-light"}`}
                    >
                      {item.name}
                    </span>
                  ) : (
                    <span
                      className={`capitalize hidden xl:block  text-base  ${
                        isActive ? "font-bold" : "font-light"
                      }`}
                    >
                      {item.name}
                    </span>
                  )}
                </Link>
              </div>
            );
          })} */}

          <div
            className="group hover:bg-zinc-200 py-2 rounded-md px-2 transform transition-all duration-300 ease-in-out"
            onClick={Logout}
          >
            <Link
              href=""
              className="flex items-center justify-center xl:justify-normal gap-x-3"
            >
              <CiLogout
                size={28}
                className="transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
              />
              {isDrawerOpen ? (
                <span
                  className={`capitalize text-base ${
                    isDrawerOpen ? "hidden" : ""
                  }`}
                >
                  Log Out
                </span>
              ) : (
                <span
                  className={`capitalize hidden xl:block  text-base`}
                >
                  Log Out
                </span>
              )}
            </Link>
          </div>
        </nav>
      </aside>

      <SlideSheet
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setActiveId(1);
        }}
      >
        {drawerContent}
      </SlideSheet>

      <DialogSheet
        isOpen={isDailog}
        onClose={() => {
          setIsDailog(false);
          setActiveId(1);
        }}
      >
        {drawerContent}
      </DialogSheet>

      <PopOver
        onOpenChange={setIsPopOver}
        open={isPopOver}
        anchorRef={anchorRef}
      >
        {drawerContent}
      </PopOver>
    </>
  );
};

export default Sidebar;
