"use client";

import ApproveToken from "@/components/tools/ApproveToken";
import { BuyAllowance } from "@/components/tools/ApproveToken";
import { AuctionAllowawnce } from "@/components/tools/ApproveToken";
import ClaimYume from "@/components/tools/ClaimYume";
import { PayEmbed } from "thirdweb/react";
import { client } from "../client";
import { amoy } from "../chain";
import Link from "next/link";
import FiatBuy from "@/components/tools/FiatBuy";

export default function Tools() {
  return (
    <div className="relative flex flex-col items-center justify-center  h-full gap-5 p-4 md:p-10 bg-[#181934]">
      <h1>Tools For Simplicity</h1>
      <div className="relative  h-full md:pl-14 pr-2 pl-2 md:pr-16 pt-10 w-full ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
          <div className="flex p-2 md:pl-20 md:pr-20 flex-col items-center bg-[#131418] justify-center gap-5 w-full h-[300px] rounded-lg border-[2px] border-[#262830]">
            <div className="flex flex-col gap-2 w-full ">
              <div className="w-full flex items-center justify-center  text-white">
                Approve Tokens Here
              </div>
              <div className="flex  justify-center gap-5 items-center w-full">
                {" "}
                <div className="flex flex-col justify-center items-center rounded-lg border-[2px] w-full   border-[#262830]">
                  <p>Approved Buy:</p>
                  <div className="flex gap-1">
                    {" "}
                    <BuyAllowance /> <p>ARYM</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center rounded-lg border-[2px] w-full   border-[#262830]">
                  <p> Approved Auction:</p>
                  <div className="flex gap-1">
                    {" "}
                    <AuctionAllowawnce /> <p>ARYM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              {" "}
              <ApproveToken />
            </div>
          </div>
          <div className="w-full h-[300px] bg-[#131418] rounded-lg border-[2px] border-[#262830]">
            <FiatBuy />
          </div>
          <div className="w-full h-[300px] bg-[#131418] rounded-lg border-[2px] border-[#262830] flex justify-center items-center">
            {" "}
            <ClaimYume />
          </div>
          <div className="w-full h-[300px] bg-[#131418] rounded-lg border-[2px] border-[#262830]"></div>
          <div className="w-full h-[300px] bg-[#131418] rounded-lg border-[2px] border-[#262830]"></div>
          <div className="w-full h-[300px] bg-[#131418] rounded-lg border-[2px] "></div>
        </div>
      </div>
    </div>
  );
}
