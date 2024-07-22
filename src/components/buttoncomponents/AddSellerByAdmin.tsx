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

interface AddSellerByAdmin {
  sellerAddress: string;
}

export default function AddSellerByAdmin({ sellerAddress }: AddSellerByAdmin) {
  const account = useActiveAccount();
  const address = account?.address;

  return (
    <>
      <TransactionButton
        transaction={() =>
          prepareContractCall({
            contract: contract,
            method: "addSellerByAdmin",
            params: [sellerAddress],
          })
        }
      >
        AddSellerByAdmin
      </TransactionButton>
    </>
  );
}
