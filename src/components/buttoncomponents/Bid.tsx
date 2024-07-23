import {
  prepareContractCall,
  readContract,
  TransactionButton,
  useActiveAccount,
  toEther,
  toWei,
  useReadContract,
} from "@/app/thirdweb";
import { auctioncontract, tokencontract } from "@/app/contract";
import config from "@/Strings/config";
import ApproveToken from "./ApproveToken";
import { useState, useEffect } from "react";
import { TransactionError } from "@thirdweb-dev/react";
import { ErrorAlert, ErrorHandler } from "../error/error";

type BidButtonProps = {
  id: bigint;
  price: bigint;
  owner: string;
};

export default function BidButton({ id, price, owner }: BidButtonProps) {
  const transactionError = TransactionError;
  const account = useActiveAccount();
  const address = account?.address;
  const [allowance, setAllowance] = useState(0);
  const [bidAmount, setBidAmount] = useState<number | string>(0);

  const pricetoEther = toEther(price);
  const currentPrice = parseInt(pricetoEther);

  const CheckAllowance = async () => {
    if (!address) return;

    try {
      const allowance = await readContract({
        contract: tokencontract,
        method: "allowance",
        params: [
          `${address}`, // user address
          config.AuctionAddres as `0x${string}`,
        ],
      });

      const allowed = toEther(allowance);
      const verified = parseInt(allowed);
      setAllowance(verified);
      console.log("allowance", allowance);
      console.log(verified);
    } catch (error) {
      console.error("Error checking allowance:", error);
    }
  };

  useEffect(() => {
    CheckAllowance();
  }, [address, currentPrice]);

  const handleApprovalSuccess = () => {
    CheckAllowance();
  };

  const handleBidAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(parseFloat(value)) && isFinite(Number(value))) {
      setBidAmount(Number(value));
    } else {
      setBidAmount("");
    }
  };

  const parsedBidAmount = bidAmount !== "" ? BigInt(bidAmount) : BigInt(0);

  console.log("allowed", allowance);
  console.log("BidAmount", parsedBidAmount);

  return (
    <div className="flex flex-col   w-full h-full items-center justify-center">
      <p>Auction ID: {id.toString()}</p>
      {owner === address ? (
        <div className="">Owner cannot Bid</div>
      ) : allowance >= currentPrice ? (
        <div>
          <input
            type="number"
            value={bidAmount}
            onChange={handleBidAmountChange}
            placeholder="Enter bid amount"
            className="text-black"
          />
          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract: auctioncontract,
                method: "bid",
                params: [id, toWei(`${parsedBidAmount}`)],
              })
            }
            onTransactionSent={() => alert("Successfully placed a bid")}
            onError={(error) => {
              ErrorAlert(error);
              ErrorHandler(error);
            }}
          >
            Bid
          </TransactionButton>
        </div>
      ) : (
        <div>
          <p>You have only approved {allowance}. Please approve more tokens.</p>
          <ApproveToken
            contractAddress={config.AuctionAddres}
            price={price}
            onApprovalSuccess={handleApprovalSuccess}
          />
        </div>
      )}
    </div>
  );
}
