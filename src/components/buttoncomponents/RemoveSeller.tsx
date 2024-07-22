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

interface RemoveSeller {
  sellerAddress: string;
}

export default function RemoveSeller({ sellerAddress }: RemoveSeller) {
  const account = useActiveAccount();
  const address = account?.address;

  return (
    <>
      <TransactionButton
        transaction={() =>
          prepareContractCall({
            contract: contract,
            method: "removeSeller",
            params: [sellerAddress],
          })
        }
      >
       RemoveSeller
      </TransactionButton>
    </>
  );
}
