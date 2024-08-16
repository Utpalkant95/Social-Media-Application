"use client";
import React, { useEffect } from "react";

const page = () => {
  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");

    if (!hasRefreshed) {
      sessionStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }
  }, []);
  return <div>page</div>;
};

export default page;
