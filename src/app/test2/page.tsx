"use client";
// import { useSocket } from "@/lib/SocketProvider";
// import React from "react"; // Adjust the path as necessary

// const NotificationList = () => {
//   const { notifications } = useSocket();

//   return (
//     <div>
//       <h2>Notifications</h2>
//       {notifications.map((notification) => (
//         <div key={notification.id}>
//           <p>{notification.message}</p>
//         </div>
//       ))}
//     </div>
//   ); 
// };

// export default NotificationList;

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import React from "react";

// const Page = () => {
//   return (
//     <ScrollArea className="w-full border rounded-lg mb-8 bg-white">
//       <div className="flex p-4 space-x-4">
//         {[...Array(20)].map((_, i) => (
//           <div key={i} className="flex flex-col items-center space-y-1">
//             <Avatar className="w-16 h-16 border-2 border-pink-500 p-1">
//               <AvatarImage
//                 src={`https://i.pravatar.cc/128?img=${i + 1}`}
//                 alt={`User ${i + 1}`}
//               />
//               <AvatarFallback>U{i + 1}</AvatarFallback>
//             </Avatar>
//             <span className="text-xs">User {i + 1}</span>
//           </div>
//         ))}
//       </div>
//       <ScrollBar orientation="horizontal" />
//     </ScrollArea>
//   );
// };

// export default Page;


import { useSocket } from '@/lib/SocketProvider'
import { useState } from 'react'

const Page = () => {
  const [message, setMessage] = useState<string>("");
  // const {sendMessage} = useSocket()
  return (
    <div>
      <input type="text" onChange={(e) => setMessage(e.target.value)}/>
      {/* <button onClick={() => sendMessage(message)}>Send</button> */}
    </div>
  )
}

export default Page