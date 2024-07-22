import { useReadContract } from "@/app/thirdweb";
import { auctioncontract } from "@/app/contract";
import Link from "next/link";
import AuctionCard from "../cards/AuctionCard";

export default function AllAuctions() {
  const { data: auction, isLoading: isAuctionLoading } = useReadContract({
    contract: auctioncontract,
    method: "getAllAuctions",
  });

  if (isAuctionLoading) {
    return <div>Loading auctions...</div>;
  }

  return (
    <div className="relative  h-full pl-14 pr-16 pt-10 w-screen">
      <div className=" grid grid-cols-4 gap-10">
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
