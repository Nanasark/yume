"use client";

import {
  useActiveAccount,
  prepareContractCall,
  toWei,
  TransactionButton,
} from "@/app/thirdweb";
import { amoy } from "../../app/chain";
import { client } from "../../app/client";
import { contract } from "@/app/contract";
import { resolveMethod } from "thirdweb";

interface UpdateFeeProps {
  amount: string 
}


export default function UpdateFee({ amount }: UpdateFeeProps) {
  const account = useActiveAccount();
  const address = account?.address;

  return (
    <>
      <TransactionButton
        transaction={() =>
          prepareContractCall({
            contract: contract,
            method: "upgradeFee",
            params: [toWei(amount)],
          })
        }
      >
        Update Fee
      </TransactionButton>
    </>
  );
}
