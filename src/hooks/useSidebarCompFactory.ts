import { NotificationAtom, SearchAtom } from "@/Atom";
import { CreatePostFrag } from "@/Fragments";

const useSidebarCompFactory = ({ key }: { key: number | undefined }): () => React.JSX.Element => {
    switch (key) {
        case 2:
            return SearchAtom;
        case 5:
            return NotificationAtom;
        case 6:
            return CreatePostFrag;
        default:
          return   CreatePostFrag;
    }
};

export default useSidebarCompFactory;