import { MediaRenderer } from "thirdweb/react";
import { client } from "@/app/client";

type AuctionDetail = {
  image: string;
  userName?: string;
  auctionName?: string;
  auctionId?: bigint;
  productName?: string;
  productId?: bigint;
};

export default function SellerSection({
  image,
  auctionName,
  auctionId,
  userName,
  productId,
  productName,
}: AuctionDetail) {
  return (
    <div className="flex items-center justify-center p-[1px] text-[#55567a] borderGradient w-full h-[203px] rounded-[11px] buttonHover">
      <div className="flex flex-col gap-4 p-3 w-full bg-[#0e131d] h-full rounded-[10px]">
        <div className="flex gap-5 items-center ">
          <p className="font-bold text-2xl"> {auctionName || productName}</p>
          <p className="text-xl">
            {" "}
            #{auctionId?.toString() || productId?.toString()}
          </p>
        </div>

        <div className="w-full h-full flex flex-col  p-5  rounded-[10px] border-[1px] border-[#262830] hover:border-[0px] hover:bg-[#08040f]">
          <p className="text-bold text-[18px]"> Listed By</p>
          <div className="flex  items-center w-1/4">
            {" "}
            <div className="rounded-full p-[2px] border-[1px] border-[#262830] hover:border-[0px] hover:bg-[#1B1C22]">
              <MediaRenderer
                client={client}
                className="rounded-full"
                src={`ipfs://${image}`}
                height="45px"
                width="45px"
              />
            </div>
            <p className="ml-3">{userName}</p>
          </div>
        </div>

      
      </div>
    </div>
  );
}
