import React from "react";
import { Button } from "../ui/button";
import { Home, PlusCircle, Search, Compass } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { decodeToken, IUserInfo } from "@/helpers/userInfo";

const MobileViewSidebar = () => {
  const user : IUserInfo | null =  decodeToken();
  return (
    <footer className="flex justify-around items-center p-4 border-t">
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
      <Button variant="ghost" size="icon">
        <PlusCircle className="h-6 w-6" />
      </Button>
      <Button variant="ghost" size="icon">
        <Link href={"/explore"}>
          <Compass className="h-6 w-6" />
        </Link>
      </Button>
      <Link href={`/${user?.username}`}>
        <Avatar className="w-6 h-6">
          <AvatarImage src="https://i.pravatar.cc/128?img=69" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </Link>
    </footer>
  );
};

export default MobileViewSidebar;
