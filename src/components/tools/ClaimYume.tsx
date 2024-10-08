import { useReadContract, useSendTransaction } from "thirdweb/react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { PreparedTransaction } from "thirdweb";
import { registryContract, tokencontract } from "@/app/contract";
import config from "@/Strings/config";
import { useActiveAccount } from "thirdweb/react";
import { toWei } from "thirdweb";
import { ErrorAlert, ErrorHandler } from "../error/error";
import { Account } from "thirdweb/wallets";
import { claimcontract } from "@/app/contract";
import { TransactionButton } from "thirdweb/react";
import toast from "react-hot-toast";

export default function ClaimYume() {
  const account = useActiveAccount();
  const address = account?.address || config.AuctionAddres;
  const { data: isRegistered } = useReadContract({
    contract: registryContract,
    method: "isRegistered",
    params: [account?.address as `0x${string}`],
  });
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

  const handleRegistered = () => {
    if (!isRegistered) {
      toast("User Not Registered, Please Complete KYC", {
        className: "text-center border-orange-700",
        icon: "⛔",
      });
    }
  };

  return (
    <div className="text-[#D6D6D6] w-[150px] h-[45px]  bg-transparent flex  flex-col gap-2 items-center justify-center rounded-[11px] p-[1px] buttonHover">
      {/* <button
        onClick={ClaimFunction}
        className="w-200px ring-black bg-green-600 h-[60px] rounded-sm"
      >
        claim 1000 ARYM
      </button> */}

      <TransactionButton
        onClick={() => handleRegistered()}
        transaction={() =>
          prepareContractCall({
            contract: claimcontract,
            method: "claim",
            params: [address, toWei("1000")],
          })
        }
        onTransactionConfirmed={() => {
          toast.success("1000 ARYM claimed successfully", {
            id: "transaction",
            icon: "✅",
            duration: 5000,
          });
        }}
        onError={ErrorAlert}
        unstyled
        className="w-full rounded-[10px] border-[1px] border-[#262830]  hover:border-[0px] hover:bg-[#1B1C22] h-full "
      >
        claim 1000 ARYM
      </TransactionButton>
    </div>
  );
}
