"use client";
import { ReactNode, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Info, Phone, Send, Video } from "lucide-react";
import { decodeToken, IUserInfo } from "@/helpers/userInfo";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const user: IUserInfo | null = decodeToken();

  const conversations = [
    {
      name: "Emma Watson",
      message: "Hey, how are you?",
      time: "1h",
      unread: 2,
    },
    {
      name: "Tom Holland",
      message: "Did you see the new Spider-Man?",
      time: "3h",
    },
    { name: "Zendaya", message: "Lunch tomorrow?", time: "1d" },
    { name: "Robert Downey Jr.", message: "I am Iron Man", time: "1w" },
    { name: "Chris Evans", message: "Avengers, assemble!", time: "2w" },
  ];

  const handleLoadChat = (name :string) => {
    router.push(`/direct/chat/${name}`);
  }

  return (
    <div className="flex h-screen max-w-full mx-auto border rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r bg-gray-50">
        <div className="p-4 border-b">
          <Button
            variant="ghost"
            className="w-full justify-between text-lg font-semibold"
          >
            {user?.username}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.name}
              className={`flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer `}
              onClick={() => handleLoadChat(conversation.name)}
            >
              <Avatar>
                <AvatarImage
                  src={`https://i.pravatar.cc/100?u=${conversation.name}`}
                />
                <AvatarFallback>{conversation.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-medium truncate">
                    {conversation.name}
                  </p>
                  <p className="text-xs text-gray-500">{conversation.time}</p>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {conversation.message}
                </p>
              </div>
              {conversation.unread && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {conversation.unread}
                  </span>
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
};

export default Layout;
