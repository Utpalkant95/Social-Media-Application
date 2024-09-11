"use client";
import React, { useState } from "react";
import qrImage from "../../../../public/bibok12079_qr.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const colorPalets = [
  {
    id: "1",
    bgColor: "#d6cd6d",
  },
  {
    id: "2",
    bgColor: "#57B7E9",
  },
  {
    id: "3",
    bgColor: "#e9b957",
  },
  {
    id: "4",
    bgColor: "#d9a9a9",
  },
  {
    id: "5",
    bgColor: "#a9d1a9",
  },
];

const Page = () => {
  const [bgColor, setBgColor] = useState<string>("#d6cd6d");
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="h-screen flex items-center justify-center"
    >
      <div className="max-w-4xl w-full flex justify-center items-center">
        <div className="w-full h-full">
          <Image
            src={qrImage}
            alt="qr"
            className="max-w-[250px] max-h-[270px] w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <h3 className="text-3xl text-white font-light">
            QR code helps people follow you quickly
          </h3>
          <p className="text-sm text-white font-light">
            People can scan your QR code with their smartphone’s camera to see
            your profile. Download and print your QR code, then stick it on your
            products, posters, and more.
          </p>
          <div className="flex items-center gap-x-2">
            {colorPalets.map((colorPalate) => {
              const active = colorPalate.bgColor === bgColor;
              return (
                <div
                  style={{ backgroundColor: colorPalate.bgColor }} // Inline style for dynamic background color
                  className={`w-8 h-8 cursor-pointer rounded-full ${
                    active ? "border-2 border-black" : ""
                  }`}
                  key={colorPalate.id}
                  onClick={() => setBgColor(colorPalate.bgColor)}
                />
              );
            })}
          </div>
          <Button className="text-black bg-white text-sm max-w-fit">
            Download QR code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
