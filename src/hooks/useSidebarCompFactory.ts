import { NotificationAtom, SearchAtom, SidebarMore } from "@/Atom";
import { CreatePostFrag } from "@/Fragments";

const useSidebarCompFactory = ({ key }: { key: number | undefined }): () => React.JSX.Element => {
    switch (key) {
        case 2:
            return SearchAtom;
        case 5:
            return NotificationAtom;
        case 6:
            return CreatePostFrag;
        case 999:
            return SidebarMore
        default:
          return   SidebarMore;
    }
};

export default useSidebarCompFactory;