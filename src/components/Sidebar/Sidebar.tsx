"use client";
import { useSidebarCompFactory } from "@/hooks";
import { INavItems, navItems, navItems2 } from "@/Constants/SideBarMenus";
import Link from "next/link";
import Image from "next/image";
import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { DialogSheet, PopOver, SlideSheet } from "@/components";
import logo from "../../../public/snapify-favicon-white.svg";

const Sidebar = () => {
  const [activeId, setActiveId] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isDailog, setIsDailog] = useState<boolean>(false);
  const [isPopOver, setIsPopOver] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const username = "utpal95";
  console.log("Sidebar component rendering");

  const drawerContent = useMemo<ReactNode>(() => {
    const Component = useSidebarCompFactory({ key: activeId });
    return Component ? <Component /> : null; // Execute the function to get the JSX element
  }, [activeId]);

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
        className={`border h-screen pr-1 pl-1 grid grid-rows-[max-content_1fr_max-content]  ${
          isDrawerOpen ? "max-w-fit" : "w-56"
        }`}
      >
        {/* ADD LOGO SECTION */}
        <header
          className={`flex items-center  h-20  ${
            isDrawerOpen ? "justify-center" : "px-3"
          }`}
        >
          <span
            className={`${isDrawerOpen ? "hidden" : "font-medium text-2xl"}`}
          >
            Snapify
          </span>
          <Image
            src={logo}
            alt="logo"
            width={40}
            height={40}
            className={`${isDrawerOpen ? "block" : "hidden"}`}
          />
        </header>

        <nav>
          <ul className="flex flex-col gap-y-2">
            {navItems.map((item: INavItems) => {
              const isActive = activeId === item.id;
              const dynamicPath =
                item.name === "profile"
                  ? `/${username}`
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
                    className="flex items-center gap-x-3"
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
                        <Image
                          src={
                            item.img ||
                            "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=05qe_AeNbowQ7kNvgHD_c7I&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYASaeyU9jSGFck1ZKRnFVaMFapEUGaG7JXM_5xPDs-3MQ&oe=66C4344F&_nc_sid=328259"
                          }
                          alt="profile"
                          width={28}
                          height={28}
                          className="rounded-full overflow-hidden transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
                        />
                      </div>
                    )}
                    <span
                      className={`capitalize text-base ${
                        isActive ? "font-bold" : "font-light"
                      } ${isDrawerOpen ? "hidden" : ""}`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <nav className="flex flex-col gap-y-2 pb-4">
          {navItems2.map((item: INavItems) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                className="group hover:bg-zinc-200 py-2 rounded-md px-2 transform transition-all duration-300 ease-in-out"
                onClick={() => handleItemClick(item)}
              >
                <Link href={item.path} className="flex items-center gap-x-3">
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
                  <span
                    className={`capitalize text-base ${
                      isDrawerOpen ? "hidden" : ""
                    } ${isActive ? "font-bold" : "font-light"}`}
                  >
                    {item.name}
                  </span>
                </Link>
              </div>
            );
          })}
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