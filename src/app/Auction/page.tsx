"use client";
import Link from "next/link";
import AllAuctions from "../../components/grids/AllAuctions";

export default function Auction() {
  return (
    <div className="w-full flex items-center justify-center p-5 h-dvh bg-[#181934]">
      <div className=" flex flex-col gap-5 lg:gap-10">
        <div className=" relative left-14 top-5 w-[140px] h-[40px] rounded-[11px] flex items-center justify-center bg-gray-900">
          <Link href={"/Auction/ended"}>
            <div className=" text-white "> Ended Auctions</div>
          </Link>
        </div>

        <AllAuctions />
      </div>
    </div>
  );
}
