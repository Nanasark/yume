"use client";
import Registry from "@/Uploaders/Registry";
import config from "@/Strings/config";
import Image from "next/image";
export default function Register() {
  return (
    <div className="w-full flex md:flex-row flex-col h-full p-2 pt-10 md:p-20 items-center bg-[#181934]">
      <Registry />
    </div>
  );
}
