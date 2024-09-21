import { DialogWrapper, Loader } from "@/components";
import { PiPopcornFill } from "react-icons/pi";

const LoadingStateForm = ({ loading }: { loading: boolean }) => {
  return (
    <DialogWrapper title="Sharing">
      <div className="flex items-center justify-center h-[calc(100%-40px)]">
        {loading ? <Loader /> : <PiPopcornFill />}
      </div>
    </DialogWrapper>
  );
};

export default LoadingStateForm;