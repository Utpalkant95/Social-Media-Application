import React from "react";

const Page = ({ params }: { params: { storyId: string } }) => {
  return <div>{JSON.stringify(params.storyId)}</div>;
};

export default Page;
