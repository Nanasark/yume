"use client";
import Registry from "@/Uploaders/Registry";
import config from "@/Strings/config";
import Image from "next/image";
export default function Register() {
  console.log(config.pinataJWT);

  return (
    <div className="w-full flex md:flex-row flex-col h-full p-2 md:p-20 items-center bg-[#181934]">
      <div className=" relative top-10 md:top-0 w-full ">
        <Registry />
      </div>
    </div>
  );
}
