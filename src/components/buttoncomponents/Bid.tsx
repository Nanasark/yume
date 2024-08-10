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
import toast from "react-hot-toast";

type BidButtonProps = {
  id: bigint;
  price: bigint;
  owner: string;
};

export default function BidButton({ id, price, owner }: BidButtonProps) {
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
          {allowance.toString() < bidAmount ? (
            <div>
              <p> you have only {allowance} approved, increasese allowance</p>
              <ApproveToken
                contractAddress={config.AuctionAddres}
                price={price}
                onApprovalSuccess={handleApprovalSuccess}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center justify-items-center">
              <input
                type="number"
                value={bidAmount}
                onChange={handleBidAmountChange}
                placeholder="Enter bid amount"
                className="text-black pl-3 bg-slate-100 rounded-sm w-[120px] h-[35px]"
              />
              <TransactionButton
                transaction={() =>
                  prepareContractCall({
                    contract: auctioncontract,
                    method: "bid",
                    params: [id, toWei(`${parsedBidAmount}`)],
                  })
                }
                onTransactionSent={() =>
                  toast.loading("transaction sent ...", {
                    id: "transaction",
                    icon: "🔥",
                  })
                }
                onError={ErrorAlert}
                onTransactionConfirmed={() =>
                  toast.success("Bid successfull", {
                    id: "transaction",
                    icon: "✅",
                    duration: 5000,
                  })
                }
              >
                Bid
              </TransactionButton>
            </div>
          )}
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
