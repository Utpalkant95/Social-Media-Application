import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GroupedStories } from "@/app/api/update/Story/get-stories/route";

export default function StoryPreview({
  story,
}: {
  story: GroupedStories[] | undefined;
}) {
  const [currentUserIndex, setCurrentUserIndex] = useState(0); // Fixed initial value to 0
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleNextStory = () => {
    if (currentStoryIndex < currentUser.stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setProgress(0);
    } else if (  story &&  currentUserIndex < story.length - 1) {
      setCurrentUserIndex((prev) => prev + 1);
      setCurrentStoryIndex(0);
      setProgress(0);
    }
  };
  // Auto-progress for stories


  if (!story || story.length === 0) {
    return <div>No stories available</div>; // Add null check to avoid errors
  }

  const currentUser = story[currentUserIndex];
  const currentStory = currentUser.stories[currentStoryIndex];



  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      setProgress(0);
    } else if (currentUserIndex > 0) {
      setCurrentUserIndex((prev) => prev - 1);
      setCurrentStoryIndex(story[currentUserIndex - 1].stories.length - 1);
      setProgress(0);
    }
  };


  return (
    <div className="relative w-full max-w-md mx-auto h-[600px] bg-gray-900 text-white overflow-hidden rounded-lg">
      <div className="flex items-center justify-center h-full">
        {/* Previous user's story preview */}
        {currentUserIndex > 0 && (
          <div className="absolute left-0 top-0 bottom-0 w-12 overflow-hidden opacity-50">
            <img
              src={story[currentUserIndex - 1].stories[0].file}
              alt="Previous story"
              className="h-full object-cover"
            />
          </div>
        )}

        {/* Current user's story */}
        <div className="w-full h-full">
          <img
            src={currentStory?.file} // Fixed file access
            alt={`Story ${currentStoryIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Next user's story preview */}
        {currentUserIndex < story.length - 1 && (
          <div className="absolute right-0 top-0 bottom-0 w-12 overflow-hidden opacity-50">
            <img
              src={story[currentUserIndex + 1].stories[0].file}
              alt="Next story"
              className="h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 flex">
        {currentUser.stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-gray-600 mx-0.5">
            <div
              className="h-full bg-white"
              style={{
                width: `${
                  index < currentStoryIndex
                    ? 100
                    : index === currentStoryIndex
                    ? progress
                    : 0
                }%`,
              }}
            />
          </div>
        ))}
      </div>

      {/* User info */}
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <Avatar className="w-8 h-8 border border-white">
          <AvatarImage
            src={currentUser.userDetails.profilePicture}
            alt={currentUser.userDetails.username}
          />
          <AvatarFallback>{currentUser.userDetails.username[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-semibold">
          {currentUser.userDetails.username}
        </span>
        <span className="text-xs text-gray-300">2h</span>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-2 -translate-y-1/2"
        onClick={handlePrevStory}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-2 -translate-y-1/2"
        onClick={handleNextStory}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  );
}
