"use client";
import EndedAuctions from "@/components/grids/EndedAuctionGrid";
import Link from "next/link";

export default function Auction() {
  return (
    <div className=" w-full flex  items-center justify-center min-h-full p-5 bg-[#181934]">
      <div className=" flex flex-col gap-5 lg:gap-10 items-center justify-center">
        <Link href={"/Auction"}>
          <div className=" relative top-5 w-[200px] h-[40px] rounded-[11px] flex items-center justify-center buttonGradient">
            <div className="   text-white ">View Active Auctions</div>
          </div>
        </Link>

        <EndedAuctions />
      </div>
    </div>
  );
}
