// "use client"
// import { useRef, useState } from "react";
// import {PopOver} from "@/components";

// const Page = () => {
//   const [popoverOpen, setPopoverOpen] = useState(false);
//   const anchorRef = useRef<HTMLButtonElement>(null); // Reference for the anchor

//   const handleButtonClick = () => {
//     // Trigger popover manually
//     setPopoverOpen(true);
//   };

//   return (
//     <div className="h-screen w-full flex items-center justify-center">
//       {/* The element that will act as the anchor */}
//       <button onClick={handleButtonClick} className="p-2 bg-blue-500 text-white rounded">
//         Open Popover
//       </button>

//       {/* Popover component controlled by external state */}
//       <PopOver open={popoverOpen} onOpenChange={setPopoverOpen} anchorRef={anchorRef} />
//     </div>
//   );
// };

// export default Page;

import { Tab } from '@/components'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'

const Page = () => {
  const tabItems = [
    {
      label: "Account",
      value: "account",
      content: (
        <div>
          <div>
            <div>Account</div>
            <div>
              Make changes to your account here. Click save when you're done.
            </div>
          </div>
          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </div>
          <div>
            <Button>Save changes</Button>
          </div>
        </div>
      ),
    },
    {
      label: "Password",
      value: "password",
      content: (
        <div>
          <div>
            <div>Password</div>
            <div>
              Change your password here. After saving, you'll be logged out.
            </div>
          </div>
          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </div>
          <div>
            <Button>Save password</Button>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Tab defaultValue="account" tabItems={tabItems} className="w-[400px]" />
    </div>

  )
}

export default Page
