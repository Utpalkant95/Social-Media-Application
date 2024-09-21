import { DialogSheet } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { IoAddSharp } from "react-icons/io5";
import CreateStory from "./CreateStory";
import { useState } from "react";

const StoryFrag = () => {
  const [isOpenCreateStory, setIsOpenCreateStory] = useState<boolean>(false);

  return (
    <>
      <ScrollArea className="w-full  rounded-lg mb-8 bg-white">
        <div className="flex p-4 space-x-4">
          <div className="flex flex-col items-center space-y-1 relative cursor-pointer" onClick={() => setIsOpenCreateStory(true)}>
            <Avatar className="w-16 h-16 border-2 border-pink-500 p-1">
              <AvatarImage
                src={`https://i.pravatar.cc/128?img=${1}`}
                alt={`User `}
              />
              <AvatarFallback>U 1</AvatarFallback>
            </Avatar>
            <span className="text-xs">User {1}</span>
            <div className="absolute bottom-5 right-1 w-4 h-4 rounded-full overflow-hidden bg-blue-500">
              <IoAddSharp className="text-white" size={16} />
            </div>
          </div>
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-1">
              <Avatar className="w-16 h-16 border-2 border-pink-500 p-1">
                <AvatarImage
                  src={`https://i.pravatar.cc/128?img=${i + 1}`}
                  alt={`User ${i + 1}`}
                />
                <AvatarFallback>U{i + 1}</AvatarFallback>
              </Avatar>
              <span className="text-xs">User {i + 1}</span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <DialogSheet
        isOpen={isOpenCreateStory}
        onClose={() => setIsOpenCreateStory(false)}
      >
        <CreateStory />
      </DialogSheet>
    </>
  );
};

export default StoryFrag;
