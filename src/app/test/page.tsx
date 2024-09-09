"use client";
import { updateUserProfileImage } from "@/ApiServices/UserServices";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// export default function Component() {
//   return (
//     <div className="flex flex-col h-screen">
//       <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
//         <Link href="#" className="flex items-center gap-2" prefetch={false}>
//           <InstagramIcon className="h-6 w-6" />
//           <span className="font-bold text-lg">Instagram</span>
//         </Link>
//         <nav className="flex items-center gap-4">
//           <Link href="#" className="hover:underline" prefetch={false}>
//             Home
//           </Link>
//           <Link href="#" className="hover:underline" prefetch={false}>
//             Explore
//           </Link>
//           <Link href="#" className="hover:underline" prefetch={false}>
//             Reels
//           </Link>
//           <Link href="#" className="hover:underline" prefetch={false}>
//             Messages
//           </Link>
//           <Link href="#" className="hover:underline" prefetch={false}>
//             Notifications
//           </Link>
//           <Link href="#" className="hover:underline" prefetch={false}>
//             Profile
//           </Link>
//         </nav>
//       </header>
//       <main className="flex-1 bg-background p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-2xl font-bold">Notifications</h1>
//           <Button variant="ghost" size="icon">
//             <CheckIcon className="h-5 w-5" />
//             <span className="sr-only">Mark all as read</span>
//           </Button>
//         </div>
//         <div className="space-y-4">
//           {/* <div className="flex items-center gap-4">
//             <Avatar className="w-12 h-12 border-2 border-primary">
//               <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
//               <AvatarFallback>AC</AvatarFallback>
//             </Avatar>
//             <div className="flex-1">
//               <div className="flex items-center gap-2">
//                 <Link href="#" className="font-medium" prefetch={false}>
//                   shadcn
//                 </Link>
//                 <span className="text-muted-foreground">
//                   started following you
//                 </span>
//               </div>
//               <div className="text-sm text-muted-foreground">2h ago</div>
//             </div>
//           </div> */}
//           <div className="flex items-center gap-4">
//             <Avatar className="w-12 h-12 border-2 border-primary">
//               <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
//               <AvatarFallback>AC</AvatarFallback>
//             </Avatar>
//             <div className="flex-1">
//               <div className="flex items-center gap-2">
//                 <Link href="#" className="font-medium" prefetch={false}>
//                   shadcn
//                 </Link>
//                 <span className="text-muted-foreground">liked your post</span>
//               </div>
//               <div className="text-sm text-muted-foreground">4h ago</div>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <Avatar className="w-12 h-12 border-2 border-primary">
//               <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
//               <AvatarFallback>AC</AvatarFallback>
//             </Avatar>
//             <div className="flex-1">
//               <div className="flex items-center gap-2">
//                 <Link href="#" className="font-medium" prefetch={false}>
//                   shadcn
//                 </Link>
//                 <span className="text-muted-foreground">
//                   commented on your post
//                 </span>
//               </div>
//               <div className="text-sm text-muted-foreground">6h ago</div>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <Avatar className="w-12 h-12 border-2 border-primary">
//               <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
//               <AvatarFallback>AC</AvatarFallback>
//             </Avatar>
//             <div className="flex-1">
//               <div className="flex items-center gap-2">
//                 <Link href="#" className="font-medium" prefetch={false}>
//                   shadcn
//                 </Link>
//                 <span className="text-muted-foreground">
//                   mentioned you in a post
//                 </span>
//               </div>
//               <div className="text-sm text-muted-foreground">8h ago</div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function CheckIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M20 6 9 17l-5-5" />
//     </svg>
//   );
// }

// function InstagramIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
//       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
//       <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
//     </svg>
//   );
// }

import { decodeToken } from "@/helpers/userInfo";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const Page = () => {
  const { mutate , data} = useMutation({
    mutationKey: ["update user profile image"],
    mutationFn: updateUserProfileImage,
  });
  return (
    <div>
      <input
        type="file"
        onChange={async (e) => {
          if (e.target.files) {
            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            mutate(formData);
          }
        }}
      />

      {JSON.stringify(data)}

      {/* <button onClick={() => updateUserProfileImage()}>Send Request</button> */}
    </div>
  );
};

export default Page;
