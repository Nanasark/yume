import React, { useEffect, useState } from "react";
import {
  useActiveAccount,
  prepareContractCall,
  toWei,
  toEther,
  useSendTransaction,
} from "@/app/thirdweb";

import { tokencontract } from "@/app/contract";
import config from "@/Strings/config";
import { PreparedTransaction, readContract } from "thirdweb";
import { allowance } from "thirdweb/extensions/erc20";

export default function ApproveToken() {
  const [contractAddress, setContractAddress] = useState(0);

  const [theprice, setPrice] = useState(0);
  const auctionContract = config.AuctionAddres as `0x${string}`;
  const buyContract = config.ContractAddress as `0x${string}`;

  const account = useActiveAccount();
  const address = account?.address;
  const { mutate: sendTx } = useSendTransaction();
  const [amount, setAmount] = useState<number | string>("");
  const contract =
    contractAddress == 1
      ? auctionContract
      : contractAddress == 2
      ? buyContract
      : null;

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value); // Update amount state when input changes
  };

  const handleApproval = async () => {
    if (!amount || isNaN(Number(amount))) {
      alert("Please enter a valid amount."); // Basic validation for amount
      return;
    }

    const price = toWei(`${amount}`);

    try {
      const transaction = (await prepareContractCall({
        contract: tokencontract,
        method: "approve",
        params: [contract as `0x${string}`, price],
      })) as PreparedTransaction;
      console.log("address test:", contract);
      await sendTx(transaction);
      console.log("Approved");
    } catch (error) {
      console.error("Error approving token:", error);
      alert("Error approving token. Please try again.");
    }
    alert("Approved");
  };

  console.log("the auction addrss", contract);

  return (
    <div className="bg-black w-full text-white p-6 rounded-lg max-w-md mx-auto text-center">
      <div>
        <div>
          <label htmlFor="amount" className="block text-purple-500 mb-2">
            Amount to approve :
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className="w-full p-2 rounded border border-purple-500 bg-gray-800 text-white mb-4"
          />
        </div>
        <div className="flex gap-4">
          <div>
            {" "}
            <button
              onClick={() => setContractAddress(1)}
              className={`${
                contractAddress == 1 ? "bg-emerald-700" : "bg-gray-700"
              }  text-white py-2 px-4 rounded hover:bg-purple-700`}
            >
              Auction
            </button>
          </div>

          <div>
            {" "}
            <button
              onClick={() => setContractAddress(2)}
              className={`${
                contractAddress == 2 ? "bg-emerald-700" : "bg-gray-700"
              }  text-white py-2 px-4 rounded hover:bg-purple-700`}
            >
              Buy
            </button>
          </div>
          <div>
            {" "}
            <button
              onClick={handleApproval}
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuctionAllowawnce() {
  const account = useActiveAccount();
  const address = account?.address;
  const [auctionAllowance, setAuctionAllowance] = useState(0);

  const CheckAuctionAllowance = async () => {
    if (!address) return;

    try {
      const allowance = await readContract({
        contract: tokencontract,
        method: "allowance",
        params: [`${address}`, config.AuctionAddres as `0x${string}`],
      });

      const allowed = toEther(allowance);
      const verified = parseInt(allowed);
      setAuctionAllowance(verified);
      console.log("allowance", allowance);
      console.log(verified);
    } catch (error) {
      console.error("Error checking allowance:", error);
    }
  };

  useEffect(() => {
    CheckAuctionAllowance();
  }, [address]);
  return <div>{auctionAllowance}</div>;
}

export function BuyAllowance() {
  const account = useActiveAccount();
  const address = account?.address;
  const [BuyAllowance, setAllowance] = useState(0);
  const CheckBuyAllowance = async () => {
    if (!address) return;

    try {
      const allowance = await readContract({
        contract: tokencontract,
        method: "allowance",
        params: [`${address}`, config.ContractAddress as `0x${string}`],
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
    CheckBuyAllowance();
  }, [address]);

  return <div>{BuyAllowance}</div>;
}
