import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, Phone, Send, Video } from "lucide-react";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            {/* <AvatarImage src={`https://i.pravatar.cc/100?u=${currentChat}`} /> */}
            {/* <AvatarFallback>{currentChat[0]}</AvatarFallback> */}
          </Avatar>
          <h2 className="text-lg font-semibold">{params.id}</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        Chat messages would go here
        <div className="space-y-4">
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-[70%]">
              Hey! How it going?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg py-2 px-4 max-w-[70%]">
              Hi! Im doing great, thanks for asking. How about you?
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form className="flex items-center gap-2">
          <Input className="flex-1" placeholder="Message..." type="text" />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
