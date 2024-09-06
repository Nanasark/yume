import { NextRequest } from "next/server";
import { auctioncontract } from "@/app/contract";
import { readContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import { amoy } from "@/app/chain";

const {
  ENGINE_URL,
  ENGINE_ACCESS_TOKEN,
  NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS,
  BACKEND_WALLET_ADDRESS,
} = process.env;

export async function POST(req: NextRequest) {
    const handleEnded = async (auctionId: bigint) => {
      if (
        !ENGINE_URL ||
        !ENGINE_ACCESS_TOKEN ||
        !NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS ||
        !BACKEND_WALLET_ADDRESS
      ) {
        throw "server misconfigured check your env file";
      }
    try {
      const tx = await fetch(
        `${ENGINE_URL}/contract/${amoy.id}/${NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS}/write`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ENGINE_ACCESS_TOKEN}`,
            "x-backend-wallet-address": BACKEND_WALLET_ADDRESS,
          },
          body: JSON.stringify({
            functionName: "endAuction",
            args: [`${auctionId}`],
          }),
        }
      );

      if (!tx.ok) {
        throw new Error(`Failed to end auction with ID: ${auctionId}`);
      }

      console.log(`Auction ${auctionId} ended successfully`);
    } catch (error) {
      console.error(`Error ending auction ${auctionId}:`, error);
    }
  };

  // Fetch all auctions
  const { data: auctions, isLoading: isProductLoading } = useReadContract({
    contract: auctioncontract,
    method: "getAllAuctions",
  });

  // Check if data is still loading
  if (isProductLoading) {
    return new Response("Auctions are still loading", { status: 400 });
  }

  // Process each auction
  if (auctions) {
    for (const auction of auctions) {
      try {
        const ended = await readContract({
          contract: auctioncontract,
          method: "hasAuctionEnded",
          params: [auction.id],
        });

        if (ended) {
          await handleEnded(auction.id);
        }
      } catch (error) {
        console.error(`Error checking auction ${auction.id}:`, error);
      }
    }
  }

  return new Response("Auction processing completed", { status: 200 });
}
