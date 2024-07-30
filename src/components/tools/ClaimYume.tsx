import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { PreparedTransaction } from "thirdweb";
import { tokencontract } from "@/app/contract";
import config from "@/Strings/config";
import { useActiveAccount } from "thirdweb/react";
import { toWei } from "thirdweb";
import { ErrorAlert, ErrorHandler } from "../error/error";
import { Account } from "thirdweb/wallets";
import { claimcontract } from "@/app/contract";
import { TransactionButton } from "thirdweb/react";

export default function ClaimYume() {
  const account = useActiveAccount();
  const address = account?.address || config.AuctionAddres;

  // const { mutate: sendTx } = useSendTransaction();

  // const ClaimFunction = async () => {
  //   try {
  //     const transaction = (await prepareContractCall({
  //       contract: claimcontract,
  //       method: "claim",
  //       params: [address, toWei("1000")],
  //     })) as PreparedTransaction;

  //     const { transactionHash } = await sendTransaction({
  //       transaction,
  //       account: account as Account,
  //     });

  //     transactionHash ? alert("claimed") : alert("sorry claim another time");
  //   } catch (error) {
  //     ErrorHandler(error);
  //     console.error(error);
  //   }
  // };

  return (
    <div className="w-1/3">
      {/* <button
        onClick={ClaimFunction}
        className="w-200px ring-black bg-green-600 h-[60px] rounded-sm"
      >
        claim 1000 ARYM
      </button> */}

      <TransactionButton
        transaction={() =>
          prepareContractCall({
            contract: claimcontract,
            method: "claim",
            params: [address, toWei("1000")],
          })
        }
        onTransactionConfirmed={() => {
          alert("claim sucessful");
        }}
        onError={ErrorAlert}
        unstyled
        className="w-200px ring-black bg-green-600 h-[60px] rounded-sm"
      >
        claim 1000 ARYM
      </TransactionButton>
    </div>
  );
}
