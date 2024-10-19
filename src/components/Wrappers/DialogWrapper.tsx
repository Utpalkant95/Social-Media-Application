import { ReactNode } from "react";
import { IoArrowBackSharp } from "react-icons/io5";

interface DialogWrapperProps {
  children: ReactNode;
  className ?: string
  title : string;
  backward?: () => void;
  next?: () => void;
  share?: () => void;
}

const DialogWrapper = ({ children, backward, next, share,title, className }: DialogWrapperProps) => {
  return (
    <div className={`w-1/3 z-[999] bg-white h-5/6 sm:h-4/5 rounded-xl ${className}`}>
      <div className="grid grid-cols-[1fr_max-content_1fr] py-2 border-b px-2">
        <div className="">
          {backward && <IoArrowBackSharp size={20} className="cursor-pointer" onClick={backward}/>}
        </div>
        <div>
        <h2 className="font-medium text-center">{title}</h2>
        </div>
        <div className="text-end">
          {share && <span onClick={share} className="cursor-pointer">Share</span>}
          {next && <span onClick={next} className="cursor-pointer">Next</span>}
        </div>
      </div>
      {children}
    </div>
  );
};

export default DialogWrapper;
