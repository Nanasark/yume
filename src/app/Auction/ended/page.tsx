"use client";
import EndedAuctions from "@/components/grids/EndedAuctionGrid";
import Link from "next/link";

export default function Auction() {
  return (
    <div className=" w-full flex  items-center justify-center p-5 h-full bg-[#181934]">
      <div className=" flex flex-col gap-4">
        <div className=" relative top-5">
          <Link href={"/Auction"}>
            <div className="h-[40px] rounded-md border-[2px] border-cyan-900 bg-slate-800 text-white ">
              {" "}
              Active Auctions
            </div>
          </Link>
        </div>

        <EndedAuctions />
      </div>
    </div>
  );
}
