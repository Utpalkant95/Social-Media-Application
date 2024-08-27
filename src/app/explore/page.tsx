import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React from "react";

const Page = () => {
  const mediaItems = [
    // Replace these URLs with your media URLs (images or videos)
    "https://via.placeholder.com/300x400",
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x200",
    "https://via.placeholder.com/400x300",
    "https://via.placeholder.com/200x300",
    "https://via.placeholder.com/300x400",
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x200",
    "https://via.placeholder.com/400x300",
  ];
  return (
    <div className="px-24 pt-8">
      <div className="grid grid-cols-3">
        {mediaItems.map((item, index) => (
          <div key={index} className="relative w-full h-48">
            <Image
              src={item}
              alt={`Gallery Item ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {mediaItems.map((item, index) => (
          <div className="flex items-center space-x-4" key={index}>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Page;
