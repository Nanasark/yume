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
          {auctionId ||
            (productId && (
              <>
                <p className="font-bold text-2xl">
                  {" "}
                  {auctionName || productName}
                </p>
                <p className="text-xl">
                  {" "}
                  #{auctionId?.toString() || productId.toString()}
                </p>
              </>
            ))}
        </div>
        {/* User Info Section
        <div className="w-full h-[55px] bg-transparent flex items-center justify-center rounded-[11px] p-[1px] buttonHover">
          <div className="w-full h-full flex items-center justify-center rounded-[10px] border-[1px] border-[#262830] hover:border-[0px] hover:bg-[#1B1C22]">
            <div className="rounded-full p-[2px] border-[1px] border-[#262830] hover:border-[0px] hover:bg-[#1B1C22]">
              <MediaRenderer
                client={client}
                className="rounded-full"
                src={`ipfs://${image}`}
                height="55px"
                width="55px"
              />
            </div>
            <p className="ml-3">{userName}</p>
          </div>
        </div>

        {/* Profile Link Section */}
        {/* <div className="w-full h-[55px] bg-transparent flex items-center justify-center rounded-[11px] p-[1px] buttonHover">
          <div className="w-full h-full flex items-center justify-center rounded-[10px] border-[1px] border-[#262830] hover:border-[0px] hover:bg-[#1B1C22]">
            
          </div>
        </div> */}
      </div>
    </div>
  );
}
