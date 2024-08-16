"use client"
import { useRef, useState } from "react";
import {PopOver} from "@/components";

const Page = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null); // Reference for the anchor

  const handleButtonClick = () => {
    // Trigger popover manually
    setPopoverOpen(true);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      {/* The element that will act as the anchor */}
      <button onClick={handleButtonClick} className="p-2 bg-blue-500 text-white rounded">
        Open Popover
      </button>

      {/* Popover component controlled by external state */}
      <PopOver open={popoverOpen} onOpenChange={setPopoverOpen} anchorRef={anchorRef} />
    </div>
  );
};

export default Page;
