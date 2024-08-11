"use client";
import Link from "next/link";
import AllAuctions from "../../components/grids/AllAuctions";

export default function Auction() {
  return (
    <div className="  w-full flex  items-center justify-center p-5 h-full bg-[#181934]">
      <div className=" relative w-full flex flex-col items-center gap-4 ">
        <div className=" relative top-5 w-1/3 flex items-center">
          <Link href={"/Auction/ended"}>
            <div className="h-[40px] w-full rounded-md flex items-center border-[2px] border-cyan-900 bg-slate-800 text-white ">
              {" "}
              Ended Auctions
            </div>
          </Link>
        </div>

        <AllAuctions />
      </div>
    </div>
  );
}
