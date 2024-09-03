import { useReadContract } from "@/app/thirdweb";
import { auctioncontract } from "@/app/contract";
import Link from "next/link";
import AuctionCard from "../cards/AuctionCard";
import Loading from "@/app/Auction/loading";
export default function AllAuctions() {
  const { data: auction, isLoading: isAuctionLoading } = useReadContract({
    contract: auctioncontract,
    method: "getAllAuctions",
  });

  if (isAuctionLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative  h-full lg:h-full lg:pl-14 lg:pr-16 pt-10 lg:pt-[-10px] w-full">
      <div className="h-full flex flex-col items-center justify-center gap-5 w-full lg:grid lg:grid-cols-4 lg:gap-10 ">
        {auction &&
          auction.map((auction) => (
            <Link key={auction.id} href={`/Auction/${auction.id}`}>
              <AuctionCard
                cover={auction.coverimage}
                startPrice={auction.startPrice}
                name={auction.AuctionName}
                id={auction.id}
                endTime={auction.endTime}
                seller={`${auction.seller}`}
              />
            </Link>
          ))}
      </div>
    </div>
  );
}
