"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Info, Phone, Send, Video } from "lucide-react";
import { RiMessengerLine } from "react-icons/ri";

export default function Page() {
  const [currentChat, setCurrentChat] = useState("Emma Watson");

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

  return (
    <div className="flex-1 flex justify-center items-center flex-col">
      <div className="p-4 rounded-full border-2 border-black">
        <RiMessengerLine size={60}/>
      </div>
      <div>
        <h2 className="text-2xl font-semibold`">Your messages</h2>
      </div>
      <div>
        <p>Send a message to start a chat.</p>
      </div>
    </div>
  );
}
