"use client";
import { lora } from "@/helpers/fonts";

import ListAuction from "@/Uploaders/ListAuction";
// import ListBuy from "@/components/ListBuy";
import ListBuy from "@/Uploaders/ListBuyTest";
import react, { useState } from "react";

export default function Sell() {
  const [auction, setAuction] = useState(false);

  return (
    <div className="flex h-full flex-col p-5 bg-[#181934]">
      <div className=" w-full h-full p-10 flex gap-10 items-center justify-center ">
        <button
          className="rounded-lg border-radius-[2px] w-[120px] bg-yellow-400 text-black "
          onClick={() => setAuction(false)}
        >
          ListBuy
        </button>
        <button
          className="rounded-lg border-radius-[2px] w-[120px] bg-yellow-400 text-black "
          onClick={() => setAuction(true)}
        >
          ListAuction
        </button>
      </div>

      <div className=" flex gap-10  justify-center text-white items-center ">
        <div>{auction ? <ListAuction /> : <ListBuy />}</div>

        <div
          className={`${lora.className}  bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 saturate-100 backdrop-contrast-100`}
        >
          <h1>Welcome To our Sell Page</h1>
          <h2> You Can either List a product for Buy or List for Auction</h2>
          <h2>
            Please Read FAQs for Buy and Auction before you list on the platform
          </h2>
        </div>
      </div>
    </div>
  );
}
