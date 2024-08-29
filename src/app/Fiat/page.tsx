"use client";
import FiatPay from "@/components/tools/FiatPay";
import { useReadContract } from "thirdweb/react";
import { BuyARYMFiatContract } from "../contract";
import { toEther } from "thirdweb";

export default function Fiat() {
  const { data } = useReadContract({
    contract: BuyARYMFiatContract,
    method: "getContractTokenBalance",
    params: [],
  });
  return (
    <div className="w-full flex flex-col space-y-10 p-5 lg:p-10 lg:pr-40 lg:pl-40 items-center justify-center h-dvh bg-[#181934]">
      <div className="w-full h-2/8">
        Amount of ARYM Available: {data ? toEther(BigInt(data)) : "loading..."}
      </div>
      <FiatPay />
    </div>
  );
}
