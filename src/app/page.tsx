"use client";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");

    if (!hasRefreshed) {
      sessionStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }
  }, []);
  return <div>page</div>;
};

export default Page;
