import {
  prepareContractCall,
  readContract,
  TransactionButton,
  useActiveAccount,
  toEther,
  toWei,
  useReadContract,
} from "@/app/thirdweb";
import {
  auctioncontract,
  registryContract,
  tokencontract,
} from "@/app/contract";
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

  const { data: isRegistered } = useReadContract({
    contract: registryContract,
    method: "isRegistered",
    params: [account?.address as `0x${string}`],
  });

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
  }, [address, currentPrice, allowance]);

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

  const handleRegistered = () => {
    if (!isRegistered) {
      toast("User Not Registered, Please Complete KYC", {
        className: "text-center border-orange-700",
        icon: "⛔",
      });
    }
  };

  const parsedBidAmount = bidAmount !== "" ? BigInt(bidAmount) : BigInt(0);

  console.log("allowed", allowance);
  console.log("BidAmount", parsedBidAmount);

  return (
    <div className="flex flex-col  w-full h-full items-center justify-center">
      {owner === address ? (
        <div className="w-full text-center font-semibold text-[2rem]">
          Owner cannot Bid
        </div>
      ) : allowance >= currentPrice ? (
        <div className="w-full">
          {allowance.toString() < bidAmount ? (
            <div className="w-full">
              <p className="text-center w-full  bg-inherit ">
                you have only {allowance} approved, increasese allowance
              </p>
              <ApproveToken
                contractAddress={config.AuctionAddres}
                price={price}
                onApprovalSuccess={handleApprovalSuccess}
              />
            </div>
          ) : (
            <div className=" flex items-center justify-center bg-[#F9FBFF] p-5 text-[#181934] md:p-10 w-full h-[203px] rounded-[11px] ">
              <div className=" flex flex-col gap-5 justify-center p-3 pl-10 pr-10 w-full h-full  items-center sellerGlass rounded-[11px]">
                {" "}
                <input
                  type="number"
                  value={bidAmount}
                  onChange={handleBidAmountChange}
                  placeholder="Enter bid amount"
                  className="text-black pl-3  border-[2px] border-[#181934] shadow-xl rounded-lg w-full h-[40px]"
                />
                <TransactionButton
                  onClick={() => handleRegistered()}
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
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className=" w-full text-center bg-inherit">
            You have only approved {allowance}. Please approve more tokens.
          </p>
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
