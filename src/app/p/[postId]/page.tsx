"use client";
import { explorePosts } from "@/ApiServices/PostServices";
import { getHomePageContent } from "@/ApiServices/UserServices";
import { PostViewFrag } from "@/Fragments";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CarDetailPage = ({ params }: { params: { postId: string } }) => {
  const searchParams = useSearchParams();
  const [selectedPostIndex, setSelectedPostIndex] = useState<number>(0);
  const router = useRouter();
  const type = searchParams.get("type");

  const fetchPosts = async () => {
    if (type === "home") {
      return await getHomePageContent();
    } else {
      return await explorePosts();
    }
  };

  const { data } = useQuery({
    queryKey: ["posts", params.postId],
    queryFn: fetchPosts,
  });

  useEffect(() => {
    if (data) {
      const selectedIndex = data.findIndex(
        (post) => post._id === params.postId
      );
      setSelectedPostIndex(selectedIndex !== -1 ? selectedIndex : 0);
    }
  }, [params.postId, data]);
  return (
    <PostViewFrag
      posts={data}
      type={type}
      selectedIndex={selectedPostIndex}
      onClose={() => {
        setSelectedPostIndex(0);
        router.back();
      }}
      setSelectedPostIndex={setSelectedPostIndex}
    />
  );
};

export default CarDetailPage;
