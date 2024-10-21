"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Home, PlusCircle, Search, Compass } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { decodeToken, IUserInfo } from "@/helpers/userInfo";
import { useQuery } from "@tanstack/react-query";
import { getSignleUserData } from "@/ApiServices/UserServices";
import DailogSheet from "../Dialog/Dialog";
import { CreatePostFrag } from "@/Fragments";

const MobileViewSidebar = () => {
  const user : IUserInfo | null =  decodeToken();
  const [openSlideSheet, setOpenSlideSheet] = useState<boolean>(false);

  const {data} = useQuery({
    queryKey : ["user", user?.username],
    queryFn : () =>getSignleUserData(user?.username as string)
  });

  return (
    <footer className="flex justify-around items-center py-2 border-t">
      <Button variant="ghost" size="icon">
        <Link href={"/"}>
          <Home className="h-6 w-6" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon">
        <Link href={"/search"}>
          <Search className="h-6 w-6" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" onClick={() => setOpenSlideSheet(true)}>
        <PlusCircle className="h-6 w-6" />
      </Button>
      <Button variant="ghost" size="icon">
        <Link href={"/explore"}>
          <Compass className="h-6 w-6" />
        </Link>
      </Button>
      <Link href={`/${data?.userName}`}>
        <Avatar className="w-6 h-6">
          <AvatarImage src={data?.profileImage} alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </Link>

      <DailogSheet isOpen={openSlideSheet} onClose={() => setOpenSlideSheet(false)}>
        <CreatePostFrag />
      </DailogSheet>
    </footer>
  );
};

export default MobileViewSidebar;
