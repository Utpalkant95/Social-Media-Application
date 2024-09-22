// import React, { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { GroupedStories } from "@/app/api/update/Story/get-stories/route";

// export default function StoryPreview({
//   story,
// }: {
//   story: GroupedStories[] | undefined;
// }) {
//   const [currentUserIndex, setCurrentUserIndex] = useState(0); // Fixed initial value to 0
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const [progress, setProgress] = useState(0);

//   const handleNextStory = () => {
//     if (currentStoryIndex < currentUser.stories.length - 1) {
//       setCurrentStoryIndex((prev) => prev + 1);
//       setProgress(0);
//     } else if (story && currentUserIndex < story.length - 1) {
//       setCurrentUserIndex((prev) => prev + 1);
//       setCurrentStoryIndex(0);
//       setProgress(0);
//     }
//   };
//   // Auto-progress for stories

//   if (!story || story.length === 0) {
//     return <div>No stories available</div>; // Add null check to avoid errors
//   }

//   const currentUser = story[currentUserIndex];
//   const currentStory = currentUser.stories[currentStoryIndex];

//   const handlePrevStory = () => {
//     if (currentStoryIndex > 0) {
//       setCurrentStoryIndex((prev) => prev - 1);
//       setProgress(0);
//     } else if (currentUserIndex > 0) {
//       setCurrentUserIndex((prev) => prev - 1);
//       setCurrentStoryIndex(story[currentUserIndex - 1].stories.length - 1);
//       setProgress(0);
//     }
//   };

//   return (
//     <div className="w-full h-screen">
//       <div className="text-white text-xl font-medium">Snapify</div>
//       {/*  stories */}
//       <div className="flex items-center justify-center h-full">
//         <div className="flex items-center gap-x-10 h-full">
//           <div className="h-[40%] w-44 rounded-md">
//             <img
//               src="https://images.unsplash.com/photo-1508394522741-82ac9c15ba69?q=80&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               alt=""
//               className="h-full w-44 object-cover"
//             />
//           </div>
//           <div className="h-[40%] w-44 rounded-md">
//             {currentUserIndex > 0 && (
//               <img
//                 src={story[currentUserIndex - 1].stories[0].file}
//                 alt="Previous story"
//                 className="h-full w-44 object-cover border-2"
//               />
//             )}
//           </div>
//         </div>
//         <div className="flex items-center h-full gap-x-4">
//           <Button>left</Button>
//           <div className="h-[90%] w-96 rounded-md">
//             <img
//               src="https://images.unsplash.com/photo-1508394522741-82ac9c15ba69?q=80&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               alt=""
//               className="h-full w-96 object-cover"
//             />
//           </div>
//           <Button>right</Button>
//         </div>
//         <div className="flex items-center gap-x-10 h-full">
//           <div className="h-[40%] w-44 rounded-md">
//             <img
//               src="https://images.unsplash.com/photo-1508394522741-82ac9c15ba69?q=80&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               alt=""
//               className="h-full w-44 object-cover"
//             />
//           </div>
//           <div className="h-[40%] w-44 rounded-md">
//             <img
//               src="https://images.unsplash.com/photo-1508394522741-82ac9c15ba69?q=80&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               alt=""
//               className="h-full w-44 object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
    } else if (story && currentUserIndex < story.length - 1) {
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
    <>
      <div className="">
        {currentUserIndex > 0 && (
          <div className="">
            <img
              src={story[currentUserIndex - 1].stories[0].file}
              alt="Previous story"
              className="h-full object-cover"
            />
          </div>
        )}
      </div>
      <div className="relative w-full max-w-md mx-auto h-[600px] bg-gray-900 text-white overflow-hidden rounded-lg">
        <div className="flex items-center justify-center h-full">
          {/* Previous user's story preview */}
          {/* {currentUserIndex > 0 && (
            <div className="absolute left-0 top-0 bottom-0 w-12 overflow-hidden opacity-50">
              <img
                src={story[currentUserIndex - 1].stories[0].file}
                alt="Previous story"
                className="h-full object-cover"
              />
            </div>
          )} */}

          {/* Current user's story */}
          <div className="w-full h-full">
            <img
              src={currentStory?.file} // Fixed file access
              alt={`Story ${currentStoryIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Next user's story preview */}
          {/* {currentUserIndex < story.length - 1 && (
            <div className="absolute right-0 top-0 bottom-0 w-12 overflow-hidden opacity-50">
              <img
                src={story[currentUserIndex + 1].stories[0].file}
                alt="Next story"
                className="h-full object-cover"
              />
            </div>
          )} */}
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
            <AvatarFallback>
              {currentUser.userDetails.username[0]}
            </AvatarFallback>
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

      <div className="">
        {currentUserIndex < story.length - 1 && (
          <div className="">
            <img
              src={story[currentUserIndex + 1].stories[0].file}
              alt="Next story"
              className="h-full object-cover"
            />
          </div>
        )}
      </div>
    </>
  );
}
