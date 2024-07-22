"use client";

import {
  useActiveAccount,
  prepareContractCall,
  toWei,
  TransactionButton,
} from "@/app/thirdweb";
import { amoy } from "../app/chain";
import { client } from "../app/client";
import { contract } from "@/app/contract";

export default function AllowList() {
  const account = useActiveAccount();
  const address = account?.address;

  return (
    <div>
      <h1>Request Permission to List Products</h1>
      <h2>Fee:</h2>
    </div>
  );
}
