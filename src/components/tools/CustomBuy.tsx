"use client";
import { isSwapRequiredPostOnramp } from "thirdweb/pay";
import { getBuyWithFiatQuote } from "thirdweb/pay";
import { client } from "@/app/client";
import { amoy } from "@/app/chain";
import { tokencontract } from "@/app/contract";
import { useActiveAccount } from "thirdweb/react";
import { useState } from "react";

export default function CustomBuy() {
  const account = useActiveAccount();
  const address = account ? account.address : "";
  const [amount, setAmount] = useState("");

  const buyArym = async () => {
    const quote = await getBuyWithFiatQuote({
      client: client,
      isTestMode: true,
      fromAddress: address,
      fromCurrencySymbol: "USD",
      toChainId: amoy.id,
      toAmount: amount, // amount of token to buy
      toTokenAddress: tokencontract.address, // native token
      toAddress: address, // user's wallet address
    });

    const hasTwoSteps = isSwapRequiredPostOnramp(quote);

    return (
      <div className="w-full h-full p-[1px] bg-slate-950 border-[2px] border-gray-600">
        <div className="bg-transparent w-full h-full flex flex-col items-center justify-center">
          <div className="flex space-x-5">
            <div></div>
            <div>
              <ul>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
          <div>
            <label>Amount</label>
            <input type="text" onChange={(e) => setAmount(e.target.value)} />
            <button onClick={() => buyArym()}> Purchase</button>
          </div>
        </div>
      </div>
    );
  };
}
