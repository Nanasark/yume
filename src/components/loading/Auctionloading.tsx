// components/LoadingCard.tsx
import React from "react";

const AuctionLoadingCard = () => {
  return (
    <div className="flex items-center justify-center borderGradient rounded-[20px] w-[282px] h-[422px]">
      <div className="flex flex-col items-center justify-center gap-3 w-[280px] h-[420px] p-4 bg-[#1F2045] rounded-[20px] shadow-lg ">
        {/* Profile Image and User Details */}
        <div className="flex gap-4 h-[60px] mr-[80px] items-center">
          <div className="relative flex-initial rounded-full overflow-hidden bg-[#0e131d] w-9 h-9"></div>
          <div className="text-[14px] text-[#E1EBEE]">
            <div className="h-4 bg-[#0e131d] rounded w-24 mb-1"></div>
            <div className="h-3 bg-[#0e131d] rounded w-16"></div>
          </div>
        </div>

        {/* Auction Image */}
        <div className="w-[230px] h-[230px] overflow-hidden rounded-lg bg-[#0e131d]"></div>

        {/* Auction Details */}
        <div className="flex text-[14px] justify-between w-full">
          <div className="w-2/3">
            <div className="h-5 bg-[#0e131d] rounded mb-2 w-20"></div>
            <div className="flex flex-col gap-1">
              <div className="h-4 bg-[#0e131d] rounded w-12"></div>
              <div className="h-4 bg-[#0e131d] rounded w-12"></div>
              <div className="h-4 bg-[#0e131d] rounded w-12"></div>
            </div>
          </div>
          <div className="space-y-2 items-center text-center">
            <div className="h-10 bg-[#0e131d] rounded w-28"></div>
            <div className="flex font-light w-[110px] h-[40px] text-center justify-center items-center rounded-[5px] bg-[#0e131d]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionLoadingCard;
