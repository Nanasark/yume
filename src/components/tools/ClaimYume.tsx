import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { PreparedTransaction } from "thirdweb";
import { tokencontract } from "@/app/contract";
import config from "@/Strings/config";
import { useActiveAccount } from "thirdweb/react";
import { toWei } from "thirdweb";
import { ErrorHandler } from "../error/error";

export default function ClaimYume() {
  const account = useActiveAccount();
  const address = account?.address ? account.address : config.AuctionAddres;

  const { mutate: sendTx } = useSendTransaction();

  const ClaimFunction = async () => {
    try {
      const transaction = (await prepareContractCall({
        contract: tokencontract,
        method: "transferFrom",
        params: [config.AuctionAddres, address, toWei("50")],
      })) as PreparedTransaction;

      await sendTx(transaction);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  return (
    <div className="w-1/3">
      <button
        onClick={ClaimFunction}
        className="W-200px ring-black bg-green-600 h-[60px] rounded-sm"
      >
        claim ARYM
      </button>
    </div>
  );
}
