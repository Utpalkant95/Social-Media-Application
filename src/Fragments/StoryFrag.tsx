import { DialogSheet } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { IoAddSharp } from "react-icons/io5";
import CreateStory from "./CreateStory";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStories } from "@/ApiServices/UserServices";
import { GroupedStories } from "@/app/api/update/Story/get-stories/route";
import StoryPreview from "./StoryPreview";

const StoryFrag = () => {
  const [isOpenCreateStory, setIsOpenCreateStory] = useState<boolean>(false);
  const [openStoryPreview, setOpenStoryPreview] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["story"],
    queryFn: getStories,
  });

  return (
    <>
      <ScrollArea className="rounded-lg bg-white ">
        <div className="flex space-x-4">
          <div
            className="flex flex-col items-center space-y-1 relative cursor-pointer"
            onClick={() => setIsOpenCreateStory(true)}
          >
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
          {data?.map((story: GroupedStories, i) => (
            <div
              key={story.userDetails.username}
              className="flex flex-col cursor-pointer items-center space-y-1"
              onClick={() => setOpenStoryPreview(true)}
            >
              <Avatar className="w-16 h-16 border-2 border-pink-500 p-1">
                <AvatarImage
                  src={story.userDetails.profilePicture}
                  alt={`User ${i + 1}`}
                />
                <AvatarFallback>U{i + 1}</AvatarFallback>
              </Avatar>
              <span className="text-xs">{story.userDetails.username}</span>
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

      <DialogSheet
        isOpen={openStoryPreview}
        onClose={() => setOpenStoryPreview(false)}
      >
        <>
        <StoryPreview story={data}/>
        </>
      </DialogSheet>
    </>
  );
};

export default StoryFrag;
