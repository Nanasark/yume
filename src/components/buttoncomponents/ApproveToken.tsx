import React, { useState } from "react";
import {
  useActiveAccount,
  prepareContractCall,
  toWei,
  toEther,
  useSendTransaction,
} from "@/app/thirdweb";


import { tokencontract } from "@/app/contract";
import config from "@/Strings/config";
import { PreparedTransaction } from "thirdweb";

type Approve = {
  contractAddress: string;
  price: bigint;
  onApprovalSuccess: () => void;
};

export default function ApproveToken({
  price,
  contractAddress,
  onApprovalSuccess,
}: Approve) {
  const account = useActiveAccount();
  const { mutate: sendTx } = useSendTransaction();
  const [amount, setAmount] = useState<number | string>(""); // State to hold user input amount

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
        params: [contractAddress as `0x${string}`, price],
      })) as PreparedTransaction;

      await sendTx(transaction);
      console.log("Approved");
      alert("Approved");
      onApprovalSuccess();
    } catch (error) {
      console.error("Error approving token:", error);
      alert("Error approving token. Please try again.");
    }
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg max-w-md mx-auto text-center">
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
      <button
        onClick={handleApproval}
        className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700"
      >
        Approve
      </button>
    </div>
  );
}
