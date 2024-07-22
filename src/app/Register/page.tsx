"use client";
import Registry from "@/pages/Registry";
import config from "@/Strings/config";
import Image from "next/image";
export default function Register() {
  console.log(config.pinataJWT);

  return (
    <div className="flex   h-full  bg-gradient-to-bl from-slate-900 via-purple-900 to-slate-900">
      <div className="w-1/2">
        <Registry />
      </div>
      <div className="border-gray-950 border-[2px] lg:bg-[url('/images/regbg.png')] w-1/2 bg-contain"></div>
    </div>
  );
}
