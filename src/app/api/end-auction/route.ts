import { NextRequest } from "next/server";
import { amoy } from "@/app/chain";

const {
  ENGINE_URL,
  ENGINE_ACCESS_TOKEN,
  NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS,
  BACKEND_WALLET_ADDRESS,
} = process.env;

export async function GET(req: NextRequest) {
  return handleAuctionProcessing();
}

export async function POST(req: NextRequest) {
  return handleAuctionProcessing();
}

async function handleAuctionProcessing() {
  const handleEnded = async (auctionId: number) => {
    if (
      !ENGINE_URL ||
      !ENGINE_ACCESS_TOKEN ||
      !NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS ||
      !BACKEND_WALLET_ADDRESS
    ) {
      throw new Error("Server misconfigured: check your environment file");
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
            args: [auctionId.toString()], // Convert to string if required by API
          }),
        }
      );

      if (!tx.ok) {
        throw new Error(`Failed to end auction with ID: ${auctionId}`);
      }

      console.log(`Auction ${auctionId} ended successfully`);
    } catch (error: any) {
      throw new Error(`Error ending auction ${auctionId}: ${error.message}`);
    }
  };

  try {
    // Fetch all auctions
    const resp = await fetch(
      `${ENGINE_URL}/contract/${amoy.id}/${NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS}/read?functionName=getAllAuctions`,
      {
        headers: {
          Authorization: `Bearer ${ENGINE_ACCESS_TOKEN}`,
        },
      }
    );

    if (!resp.ok) {
      throw new Error("Failed to fetch auctions");
    }

    const rawData = await resp.json();
    console.log("Raw response data:", rawData);

    // Process the auctions
    if (rawData && Array.isArray(rawData.result)) {
      const auctions = rawData.result.map((item: any[]) => {
        // Convert BigNumber to Number if possible
        const id = item[0]?.toNumber
          ? item[0].toNumber()
          : parseInt(item[0]?.hex, 16);

        return {
          id,
          name: item[1],
          image: item[2],
          description: item[3],
          coverImage: item[4],
          // Map other properties as needed
        };
      });

      console.log("Processed auctions:", auctions);

      
      for (const auction of auctions) {
        try {
          const endedResp = await fetch(
            `${ENGINE_URL}/contract/${amoy.id}/${NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS}/read?functionName=hasAuctionEnded&args=${auction.id}`,
            {
              headers: {
                Authorization: `Bearer ${ENGINE_ACCESS_TOKEN}`,
              },
            }
          );

          // Check the response status and log the full body
          if (!endedResp.ok) {
            const errorMsg = await endedResp.text();
            throw new Error(
              `Failed to check auction status for ID: ${auction.id}. Error: ${errorMsg}`
            );
          }

          const responseData = await endedResp.json();
          console.log("Response from hasAuctionEnded:", responseData);

          // Extract the 'ended' property (adapt this to the actual structure of responseData)
          const ended =
            responseData.ended || responseData.result || responseData[0]; // Adjust this depending on the structure

          if (ended) {
            await handleEnded(auction.id);
          } else {
            console.log(
              `Auction ${auction.id} has not ended yet. Response data:`,
              responseData
            );
          }
        } catch (error) {
          console.error(`Error checking auction ${auction.id}:`, error);
        }
      }

      return new Response("Auction processing completed", { status: 200 });
    } else {
      return new Response("No auctions found", { status: 404 });
    }
  } catch (error: any) {
    console.error("Error in auction processing:", error);
    return new Response(error.message || "Internal server error", {
      status: 500,
    });
  }
}
