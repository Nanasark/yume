import { useReadContract } from "thirdweb/react";
import { auctioncontract, contract } from "@/app/contract";
import { useActiveAccount } from "thirdweb/react";
import FileDownload from "./download";

type Auction = {
  auctionId: bigint;
  AuctionName: string;
};

export default function AuctionDownload({ auctionId, AuctionName }: Auction) {
  const account = useActiveAccount();
  const address = account ? account.address : "";

  const { data: showHash, isLoading: isLoading } = useReadContract({
    contract: auctioncontract,
    method: "getAuctionHash",
    params: [address, auctionId],
  });

  console.log("showHash", showHash);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex items-center justify-center w-full">
      {showHash ? (
        <FileDownload uri={`ipfs://${showHash}`} name={AuctionName} />
      ) : (
        <p>Not purchased.</p>
      )}
    </div>
  );
}
