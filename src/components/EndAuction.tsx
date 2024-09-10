// "use client";
// import { useEffect } from "react";
// import {
//   prepareContractCall,
//   PreparedTransaction,
//   sendAndConfirmTransaction,
//   sendTransaction,
//   toSerializableTransaction,
// } from "thirdweb";

// import { auctioncontract } from "@/app/contract";

// import config from "@/Strings/config";
// import { client } from "@/app/client";

// import { privateKeyToAccount } from "thirdweb/wallets";
// import { TransactionError } from "@thirdweb-dev/react";
// import { useSendTransaction } from "thirdweb/react";
// import { ErrorAlert } from "./error/error";

// type EndAuctionProps = {
//   endTime: bigint;
//   id: bigint;
//   seller: string;
// };

// const EndAuction = ({ endTime, id, seller }: EndAuctionProps) => {
//   const account = privateKeyToAccount({
//     client: client,
//     privateKey: config.EndAuctionkey as `0x${string}`,
//   });
//   useEffect(() => {
//     const endAuction = async () => {
//       try {
//         console.log(`Preparing to end auction ID ${id}...`);

//         const transaction = (await prepareContractCall({
//           contract: auctioncontract,
//           method: "endAuction",
//           params: [id],
//         })) as PreparedTransaction;

//         console.log(`Sending transaction for auction ID ${id}...`);
//         const transactionHash = await sendTransaction({
//           account,
//           transaction,
//         });

//         await sendAndConfirmTransaction({
//           account: account,
//           transaction: transactionHash,
//         });
//         console.log(`Auction with ID ${id} ended successfully.`);
//       } catch (error) {
//         ErrorAlert(error);
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
