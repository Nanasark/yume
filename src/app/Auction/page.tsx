"use client";
import Link from "next/link";
import AllAuctions from "../../components/grids/AllAuctions";

export default function Auction() {
  return (
    <div className="w-full flex items-center justify-center p-5 h-full bg-[#181934]">
      <div className=" flex flex-col items-center justify-center">
        <Link href={"/Auction/ended"}>
          <div className=" relative  top-5 w-[200px] h-[40px] rounded-[11px] flex items-center justify-center buttonGradient">
            <div className=" text-white ">View Ended Auctions</div>
          </div>
        </Link>
        <AllAuctions />
      </div>
    </div>
  );
}
