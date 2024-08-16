
interface SlideSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SlideSheet = ({ isOpen, onClose, children }: SlideSheetProps) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0  left-[75px] bg-opacity-50 z-40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-64  bg-white z-50 transform transition-transform ${
          isOpen ? "translate-x-14" : "-translate-x-full"
        }`}
      >
        {/* Drawer content */}
        {children}
      </div>
    </>
  );
};

export default SlideSheet;