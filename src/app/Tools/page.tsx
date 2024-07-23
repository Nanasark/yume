"use client";

import ApproveToken from "@/components/tools/ApproveToken";
import { BuyAllowance } from "@/components/tools/ApproveToken";
import { AuctionAllowawnce } from "@/components/tools/ApproveToken";

export default function Tools() {
  return (
    <div className="relative flex flex-col items-center justify-center  h-full gap-5 p-10 maintool">
      <h1>Tools For Simplicity</h1>
      <div className="relative  h-full pl-14 pr-16 pt-10 w-full ">
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col items-center justify-center gap-5 w-full h-[300px] tool rounded-lg border-[2px] border-emerald-900">
            <div className="flex gap-4 w-5/6">
              <div className="w-1/3">Approve Tokens Here</div>
              <div className="flex flex-col justify-center items-center rounded-lg border-[2px] w-1/3  bg-slate-500 border-neutral-800">
                <p>Approved Buy:</p>
                <BuyAllowance />
              </div>
              <div className="flex flex-col justify-center items-center rounded-lg border-[2px] w-1/3  bg-slate-500 border-neutral-800">
                <p> Approved Auction:</p>
                <AuctionAllowawnce />
              </div>
            </div>
            <div className="w-full">
              {" "}
              <ApproveToken />
            </div>
          </div>
          <div className="w-full h-[300px] bg-slate-600 rounded-lg border-[2px] border-emerald-900"></div>
          <div className="w-full h-[300px] bg-slate-600 rounded-lg border-[2px] border-emerald-900"></div>
          <div className="w-full h-[300px] bg-slate-600 rounded-lg border-[2px] border-emerald-900"></div>
          <div className="w-full h-[300px] bg-slate-600 rounded-lg border-[2px] border-emerald-900"></div>
          <div className="w-full h-[300px] bg-slate-600 rounded-lg border-[2px] border-emerald-900"></div>
        </div>
      </div>
    </div>
  );
}
