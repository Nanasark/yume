"use client";
import { useEffect } from "react";
import {
  prepareContractCall,
  PreparedTransaction,
  sendAndConfirmTransaction,
  sendTransaction,
  toSerializableTransaction,
} from "thirdweb";

import { auctioncontract } from "@/app/contract";

import config from "@/Strings/config";
import { client } from "@/app/client";

import { privateKeyToAccount } from "thirdweb/wallets";
import { TransactionError } from "@thirdweb-dev/react";
import { useSendTransaction } from "thirdweb/react";

type EndAuctionProps = {
  endTime: bigint;
  id: bigint;
  seller: string;
};

const EndAuction = ({ endTime, id, seller }: EndAuctionProps) => {
  const account = privateKeyToAccount({
    client: client,
    privateKey: config.EndAuctionkey as `0x${string}`,
  });
  useEffect(() => {
    const endAuction = async () => {
      try {
        console.log(`Preparing to end auction ID ${id}...`);

        const transaction = (await prepareContractCall({
          contract: auctioncontract,
          method: "endAuction",
          params: [id],
        })) as PreparedTransaction;

        console.log(`Sending transaction for auction ID ${id}...`);
        const transactionHash = await sendTransaction({
          account,
          transaction,
        });

        await sendAndConfirmTransaction({
          account: account,
          transaction: transactionHash,
        });
        console.log(`Auction with ID ${id} ended successfully.`);
      } catch (error) {
        if (error instanceof TransactionError) {
          // Assuming TransactionError is a custom error class
          console.error("Transaction Error message:", error.message);
          console.error("Transaction Cause Details:", error.cause); // Log additional details if available
          console.error("reason", error.reason);
          console.error("error info", error.info)
          console.error("error info", error.raw);
        } else {
          console.error("Unexpected Error:", error);
        }
      }
    };

    if (id && seller && endTime) {
      const endDate = new Date(Number(endTime) * 1000).getTime();
      const currentTimestamp = new Date().getTime();
      const delay = endDate - currentTimestamp;

      if (delay > 0) {
        console.log(
          `Scheduling end for auction ID ${id} in ${delay} milliseconds.`
        );
        const timerId = setTimeout(() => endAuction(), delay);
        return () => {
          console.log(`Clearing timeout for auction ID ${id}.`);
          clearTimeout(timerId);
        }; // Clean up the timer on component unmount
      } else {
        console.log(
          `The end time for auction ID ${id} has already passed. Ending auction now.`
        );
        endAuction();
      }
    } else {
      console.log("Missing required URL parameters.");
    }
  }, [endTime, id, seller]);

  return null; // This component doesn't render anything
};

export default EndAuction;

//
//
//
//
//
//
//
// "use client";
// import { useEffect } from "react";
// import {
//   prepareContractCall,
//   PreparedTransaction,
//   prepareTransaction,
//   toSerializableTransaction,
// } from "thirdweb";
// import { useSendTransaction } from "thirdweb/react";
// import { signTransaction } from "thirdweb";
// import { auctioncontract } from "@/app/contract";
// import { serializeTransaction } from "thirdweb/transaction";
// import EndAuctionkey from "@/Strings/config";

// type EndAuctionProps = {
//   endTime: bigint;
//   id: bigint;
//   seller: string;
// };

// const EndAuction = ({ endTime, id, seller }: EndAuctionProps) => {
//   const { mutate: sendTx } = useSendTransaction();
//   useEffect(() => {
//     const endAuction = async () => {
//       try {
//         console.log(`Preparing to end auction ID ${id}...`);
//         const transaction = (await prepareContractCall({
//           contract: auctioncontract,
//           method: "endAuction",
//           params: [id],
//         })) as PreparedTransaction;

//         const finalTx = await toSerializableTransaction({
//           transaction: transaction,
//         });

//         const signTx = await signTransaction({
//           transaction: { finalTx },
//           privateKey: process.env.NEXT_PUBLIC_END_AUCTION_KEY as `0x${string}`,
//         });

//         console.log(`Sending transaction for auction ID ${id}...`);

//         await sendTx(transaction);
//         console.log(`Auction with ID ${id} ended successfully.`);
//       } catch (error) {
//         console.error(`Error ending auction ID ${id}:`, error);
//       }
//     };

//     if (id && seller && endTime) {
//       const endDate = new Date(Number(endTime) * 1000).getTime();
//       const currentTimestamp = new Date().getTime();
//       const delay = endDate - currentTimestamp;

//       if (delay > 0) {
//         console.log(
//           `Scheduling end for auction ID ${id} in ${delay} milliseconds.`
//         );
//         const timerId = setTimeout(() => endAuction(), delay);
//         return () => {
//           console.log(`Clearing timeout for auction ID ${id}.`);
//           clearTimeout(timerId);
//         }; // Clean up the timer on component unmount
//       } else {
//         console.log(
//           `The end time for auction ID ${id} has already passed. Ending auction now.`
//         );
//         endAuction();
//       }
//     } else {
//       console.log("Missing required URL parameters.");
//     }
//   }, [endTime, id, seller]);

//   return null; // This component doesn't render anything
// };

// export default EndAuction;
