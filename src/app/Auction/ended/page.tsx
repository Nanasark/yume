"use client";
import EndedAuctions from "@/components/grids/EndedAuctionGrid";
import Link from "next/link";

export default function Auction() {
  return (
    <div className=" w-full flex  items-center justify-center min-h-full p-5 bg-[#181934]">
      <div className=" flex flex-col gap-5 lg:gap-10">
        <div className=" relative left-14 top-5 w-[140px] h-[40px] rounded-[11px] flex items-center justify-center bg-gray-900">
          <Link href={"/Auction"}>
            <div className="   text-white "> Active Auctions</div>
          </Link>
        </div>

        <EndedAuctions />
      </div>
    </div>
  );
}
