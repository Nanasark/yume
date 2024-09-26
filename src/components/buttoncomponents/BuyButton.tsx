import {
  prepareContractCall,
  readContract,
  TransactionButton,
  useActiveAccount,
  toEther,
} from "@/app/thirdweb";
import { contract, tokencontract } from "@/app/contract";
import config from "@/Strings/config";
import ApproveToken from "./ApproveToken";
import { useState, useEffect } from "react";
import ToggleList from "../ToggleListing";
import { ErrorAlert } from "../error/error";
import SuccessHandler from "../success/success";
import toast from "react-hot-toast";

type BuyButtonProps = {
  id: bigint;
  price: bigint;
  isMaticPayment: boolean;
  isListed: boolean;
  owner: string;
};

export default function BuyButton({
  id,
  price,
  isMaticPayment,
  isListed,
  owner,
}: BuyButtonProps) {
  const account = useActiveAccount();
  const address = account?.address;
  const [allowance, setAllowance] = useState(0);

  const pricetoEther = toEther(price);
  const productPrice = parseInt(pricetoEther);

  const CheckAllowance = async () => {
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
    CheckAllowance();
  }, [address, productPrice]);

  const handleApprovalSuccess = () => {
    CheckAllowance();
  };

  console.log("allowed", allowance);

  return (
    <div>
      {owner === address ? (
        <ToggleList id={id} status={isListed} />
      ) : isMaticPayment ? (
        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract,
              method: "buyProduct",
              params: [id],
              value: price,
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
            toast.success("item successfully purchased", {
              id: "transaction",
              icon: "✅",
              duration: 5000,
            })
          }
        >
          Buy Item with MATIC
        </TransactionButton>
      ) : allowance >= productPrice ? (
        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract,
              method: "buyProduct",
              params: [id],
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
            toast.success("Bought successfull, download now", {
              id: "transaction",
              icon: "✅",
              duration: 5000,
            })
          }
        >
          Buy Item with Token
        </TransactionButton>
      ) : (
        <div>
          <p>You have only approved {allowance}. Please approve more tokens.</p>
          <ApproveToken
            contractAddress={config.ContractAddress}
            price={price}
            onApprovalSuccess={handleApprovalSuccess}
          />
        </div>
      )}
    </div>
  );
}
