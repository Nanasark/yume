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

interface UpgradeReceipient {
  receipient: string;
}

export default function UpgradeReceipient({ receipient }: UpgradeReceipient) {
  const account = useActiveAccount();
  const address = account?.address;

  return (
    <>
      <TransactionButton
        transaction={() =>
          prepareContractCall({
            contract: contract,
            method: "upgradeReceipient",
            params: [receipient],
          })
        }
      >
        UpgradeReceipient
      </TransactionButton>
    </>
  );
}
