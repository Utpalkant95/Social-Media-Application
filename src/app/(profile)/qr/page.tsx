"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getQrCode } from "@/ApiServices/UserServices";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  const [qr, setQr] = useState<string>("");

  const { data, mutate } = useMutation({
    mutationKey: ["qrCode", bgColor],
    mutationFn: getQrCode,
    onSuccess : (data) =>{
      setQr(data?.qrURL)
    }
  });

  useEffect(() => {
    mutate({ userName: "utpal95", color: encodeURIComponent(bgColor) });
  }, [bgColor]);

  console.log("data", data);

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="h-screen flex items-center justify-center"
    >
      <div className="max-w-4xl w-full flex justify-center items-center gap-x-10">
        <div className="max-w-[220px] w-full h-full bg-white rounded-xl p-1">
          <Image
            src={data?.qrURL}
            alt="qr"
            className="max-w-[220px] max-h-[250px] w-full h-full"
            width={220}
            height={250}
          />

          <h2
            style={{ color: bgColor }}
            className={`text-xl text-center uppercase font-bold`}
          >
            Utpal95
          </h2>
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
                  style={{ backgroundColor: colorPalate.bgColor }}
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