"use client";
import { getAllPosts } from "@/ApiServices/PostServices";
import { PostViewFrag } from "@/Fragments";
import { decodeToken, IUserInfo } from "@/helpers/userInfo";
import { User } from "@/model/User";
import { useQuery } from "@tanstack/react-query";
// import { DialogSheet, GroupAvatars } from "@/components";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { addSavedPost, getPostById } from "@/ApiServices/PostServices";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { HiDotsHorizontal } from "react-icons/hi";
// import { FaRegComment, FaRegHeart } from "react-icons/fa";
// import { CiSaveDown2 } from "react-icons/ci";
// import { BsEmojiSmile } from "react-icons/bs";
// import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
// import { Textarea } from "@/components/ui/textarea";
// import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
// import { enqueueSnackbar } from "notistack";
// import { AxiosError } from "axios";

// const Page = ({ params }: { params: { postId: string } }) => {
//   const { postId } = params;
//   const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
//   const [text, setText] = useState<string>("");
//   const { data } = useQuery({
//     queryKey: ["post", postId],
//     queryFn: () => getPostById(postId),
//   });

//   const { mutate } = useMutation({
//     mutationKey: ["add saved post"],
//     mutationFn: addSavedPost,
//     onSuccess: (data: IRESSignUpUser) => {
//       enqueueSnackbar(data && data.message, {
//         variant: "success",
//         autoHideDuration: 2000,
//       });
//     },
//     onError: (error: AxiosError<IRESSignUpUser>) => {
//       enqueueSnackbar(error?.response?.data?.message, {
//         variant: "error",
//         autoHideDuration: 2000,
//       });
//     },
//   });

//   const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
//     setText((prevText) => prevText + emojiData.emoji);
//     setShowEmojiPicker(false);
//   };

//   const router = useRouter();
//   return (
//     <div>
//       <DialogSheet isOpen={true} onClose={() => router.push("/explore")}>
//         <div className="bg-white max-w-6xl w-full h-5/6">
//           <div className="grid grid-cols-2 h-full bg-white">
//             <div className="h-full overflow-hidden">
//               <Image
//                 src={data?.file as string}
//                 alt={data?.altText as string}
//                 width={576}
//                 height={1}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="cooment section flex flex-col">
//               {/* user profile */}
//               <div className="flex items-center justify-between border-b py-2 px-4">
//                 <div className="flex items-center gap-x-3">
//                   <Avatar className="w-8 h-8">
//                     <AvatarImage
//                       src="https://github.com/shadcn.png"
//                       alt="@shadcn"
//                     />
//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>
//                   <h2>USERNAME</h2>
//                 </div>
//                 <div>
//                   <HiDotsHorizontal />
//                 </div>
//               </div>

//               <div className="notification seciton px-4 flex-1 border-b">
//                 hello
//               </div>

//               <div className="flex flex-col gap-y-1 py-2 border-b px-4">
//                 <div className="live and save section flex items-center justify-between">
//                   <div className="flex items-center gap-x-3">
//                     <div>
//                       <FaRegHeart size={20} />
//                     </div>
//                     <div>
//                       <FaRegComment size={20} />
//                     </div>
//                   </div>
//                   <div
//                     className="cursor-pointer"
//                     onClick={() => mutate({ postId: data?._id as string })}
//                   >
//                     <CiSaveDown2 size={20} />
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <GroupAvatars />
//                 </div>
//               </div>

//               <div className="flex items-center gap-x-2 px-4">
//                 <BsEmojiSmile
//                   onClick={() => setShowEmojiPicker((prev) => !prev)}
//                   className="cursor-pointer"
//                 />
//                 {showEmojiPicker && (
//                   <div className="absolute bottom-10 top-0 z-10">
//                     <EmojiPicker onEmojiClick={handleEmojiClick} />
//                   </div>
//                 )}
//                 <div className="w-full">
//                   <Textarea
//                     placeholder="Add a comment..."
//                     value={text}
//                     onChange={(e) => {
//                       setText(e.target.value);
//                       // field.onChange(text);
//                     }}
//                     rows={0}
//                     className="w-full border-none focus:outline-none"
//                     style={{ resize: "none" }}
//                   />
//                 </div>
//                 <div>
//                   <span className="cursor-pointer text-sm font-medium">
//                     Post
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </DialogSheet>
//     </div>
//   );
// };

// export default Page;

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CarDetailPage = ({ params }: { params: { postId: string } }) => {
  const user: IUserInfo | null = decodeToken();
  const [selectedPostIndex, setSelectedPostIndex] = useState<number>(0);
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["posts", user?.username],
    queryFn: () => getAllPosts(user?.username as string),
  });

  useEffect(() => {
    const selectedIndex = data?.findIndex((post) => post._id === params.postId);
    setSelectedPostIndex(selectedIndex || 0);
  }, [selectedPostIndex]);

  return (
    <div>
      {/* <button onClick={goToPreviousCar} disabled={currentIndex === 0}>
        Left
      </button>
      <h1>{car.name}</h1>
      <p>{car.description}</p>
      <button onClick={goToNextCar} disabled={currentIndex === cars.length - 1}>
        Right
      </button> */}

      <PostViewFrag
        posts={data}
        selectedIndex={selectedPostIndex}
        onClose={() => {
          setSelectedPostIndex(0);
          router.back();
        }}
        setSelectedPostIndex={setSelectedPostIndex}
      />
    </div>
  );
};

export default CarDetailPage;
