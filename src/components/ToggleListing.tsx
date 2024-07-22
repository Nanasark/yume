"use client";

import {
  useActiveAccount,
  prepareContractCall,
  toWei,
  toEther,
  TransactionButton,
} from "@/app/thirdweb";

import { contract, tokencontract } from "@/app/contract";
import config from "@/Strings/config";

type Toggle = {
  id: bigint;
  status: boolean;
};

export default function ToggleList({ id, status }: Toggle) {
  const account = useActiveAccount();
  const address = account ? account.address : "No user Logged In";

  return (
    <TransactionButton
      transaction={async () =>
        prepareContractCall({
          contract: contract,
          method: "toggleProductListing",
          params: [id],
        })
      }
      onTransactionSent={() => {
        {status ? <p>Delist</p> : <p>ReList</p>}
      }}
    >
      {status ? <p>Delist</p> : <p>ReList</p>}
    </TransactionButton>
  );
}
