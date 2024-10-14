"use client"
import { SearchAtom } from "@/Atom";

const Page = () => {
  return (
    <>
      <SearchAtom setIsDrawerOpen={(value) => console.log(value)}/>
    </>
  );
};

export default Page;
