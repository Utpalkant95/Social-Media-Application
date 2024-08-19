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
        className={`fixed inset-0 bg-black/80 bg-opacity-50 transition-opacity z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose} // Close when overlay is clicked
      />

      {/* Centered Drawer */}
      <div
        className={`fixed inset-0 h-full w-full flex items-center justify-center z-50 transition-transform transform ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        {/* Close Button */}
        <div className="absolute top-0 right-0 p-4">
          <IoIosCloseCircleOutline
            size={32}
            onClick={onClose}
            className="text-white cursor-pointer"
          />
        </div>

        {/* Drawer Content */}
        <div className="w-full h-screen flex items-center justify-center">
          {children}
        </div>
      </div>
    </>
  );
};

export default DailogSheet;
