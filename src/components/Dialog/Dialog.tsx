import { IoIosCloseCircleOutline } from "react-icons/io";
interface SlideSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }
  
  const DailogSheet = ({ isOpen, onClose, children }: SlideSheetProps) => {
    return (
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 left-0 bg-opacity-50 z-40 bg-black/80 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
        </div>
  
        {/* Centered Drawer */}
        <div>
        <div
          className={`fixed inset-0 h-full w-full flex items-center justify-center z-50 transition-transform ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
           <div className="text-white absolute text-center w-full h-screen flex justify-end p-2 ">
            <IoIosCloseCircleOutline size={24} onClick={onClose} className="cursor-pointer"/>
          </div>
          {/* Drawer content */}
          <div className="bg-white p-6 rounded shadow-lg">{children}</div>
        </div>
        </div>
      </>
    );
  };
  
  export default DailogSheet;
  