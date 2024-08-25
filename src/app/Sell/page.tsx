"use client";
import { lora } from "@/helpers/fonts";

import ListAuction from "@/Uploaders/ListAuction";
// import ListBuy from "@/components/ListBuy";
import ListBuy from "@/Uploaders/ListBuyTest";
import react, { useState } from "react";

export default function Sell() {
  const [auction, setAuction] = useState(false);

  return (
    <div className="flex w-screen md:w-full h-full flex-col items-center pt-20 justify-center p-5 bg-[#181934]">
      <div className=" w-1/2 h-full p-2 lg:p-10 flex gap-10 items-center justify-center ">
        <div
          className={`${
            auction == false ? "buttonGradient " : " bg-transparent"
          } p-[1px]  rounded-[11px] flex justify-center h-[48px] w-[148px] items-center `}
        >
          <button
            className={`${
              auction == false ? "bg-[#181934]" : "buttonbg"
            } relative rounded-[10px] w-full h-full text-stone-50
           `}
            onClick={() => setAuction(false)}
          >
            ListBuy
          </button>
        </div>
        <div
          className={`${
            auction == true ? "borderGradient " : "bg-transparent "
          } p-[1px] rounded-[11px] flex justify-center h-[48px] w-[148px] items-center `}
        >
          <button
            className={`${
              auction == true ? "bg-[#181934]" : "buttonbg"
            } rounded-[10px] w-full h-full text-stone-50
           `}
            onClick={() => setAuction(true)}
          >
            ListAuction
          </button>
        </div>
      </div>

      <div className=" flex h-full w-full lg:w-3/4 justify-center text-white items-center ">
        <div className="w-full h-full relative">
          {auction ? <ListAuction /> : <ListBuy />}
        </div>
      </div>
    </div>
  );
}

// <div
//   className={`${lora.className}  bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 saturate-100 backdrop-contrast-100`}
// >
//   <h1>Welcome To our Sell Page</h1>
//   <h2> You Can either List a product for Buy or List for Auction</h2>
//   <h2>
//     Please Read FAQs for Buy and Auction before you list on the platform
//   </h2>
// </div>;
