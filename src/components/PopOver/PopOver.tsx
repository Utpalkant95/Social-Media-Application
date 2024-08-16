import { Popover, PopoverContent, PopoverAnchor } from "@radix-ui/react-popover";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface PopOverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorRef: React.RefObject<HTMLButtonElement>; // The anchor element reference (button)
  children?: React.ReactNode;
}

const PopOver = ({ open, onOpenChange, anchorRef, children }: PopOverProps) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {/* Anchor element */}
      <PopoverAnchor asChild>
        {/* The anchorRef is passed to the button element */}
        <button ref={anchorRef} style={{ visibility: 'hidden', position: 'absolute' }} />
      </PopoverAnchor>

      {/* Popover Content */}
      <PopoverContent side="top" align="end" className="ml-4 bg-white rounded shadow-lg" sideOffset={70} >
        <div className="relative">
          {/* Close Button */}
          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopOver;
