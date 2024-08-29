import { DialogSheet } from "@/components";
import { useSidebarCompFactory } from "@/hooks";
import { User } from "@/model/User";
import React from "react";

const ProfilePostAtom = ({ user }: { user: User }) => {
  const [isDailog, setIsDailog] = React.useState<boolean>(false);
  const Component = useSidebarCompFactory({ key: 6 });
  const Post = user?.posts;
  console.log("post", Post);
  return (
    <div className="">
      <div onClick={() => setIsDailog(true)} className="cursor-pointer">
        hello open form
      </div>
      <DialogSheet
        isOpen={isDailog}
        onClose={() => {
          setIsDailog(false);
        }}
      >
        <Component />
      </DialogSheet>
    </div>
  );
};

export default ProfilePostAtom;
