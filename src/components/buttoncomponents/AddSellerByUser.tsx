// "use client";
// import { sendTransaction } from "thirdweb";
// import { createWallet } from "thirdweb/wallets";
// import { useSendTransaction } from "thirdweb/react";

// import React from "react";
// import {
//   useActiveAccount,
//   prepareContractCall,
//   toWei,
//   TransactionButton,
// } from "@/app/thirdweb";
// import { contract, tokencontract } from "@/app/contract";
// import config from "@/Strings/config";
// import { readContract } from "thirdweb";

// export default function AddSellerByUser() {
//   const account = useActiveAccount();
//   const address = account?.address;
//   const { mutate: sendTransaction, isPending } = useSendTransaction();

//   async function handleApprovalAndAddSeller() {
//     try {
//       // Retrieve the current allowance
//       const allowance = await readContract({
//         contract: tokencontract,
//         method: "allowance",
//         params: [
//           "0x1559572a045F8ec085FbAc8A80B399D23Ecfd01a", // user address
//           config.ContractAddress,
//         ],
//       });

//       console.log(`Current allowance: ${allowance}`);

//       // Check if the current allowance is 0
//       if (allowance === BigInt(0)) {
//         // If allowance is 0, approve more tokens
//         console.log(
//           "About to call approve with address and amount:",
//           config.ContractAddress,
//           toWei("0")
//         );
//         const transactionapprove = prepareContractCall({
//           contract: tokencontract,
//           method: "approve",
//           params: [config.ContractAddress, toWei("50")],
//         });

//         await sendTransaction(transactionapprove);

//         console.log("Approval call made");

//         // Immediately after approval, add the seller
//         const transactionAdd = prepareContractCall({
//           contract: contract,
//           method: "addSellerByUser",
//         });

//         await sendTransaction(transactionAdd);

//         console.log("Seller added");
//       } else {
//         // If allowance is not 0, proceed with adding the seller
//         const transactionAdd = prepareContractCall({
//           contract: contract,
//           method: "addSellerByUser",
//         });

//         await sendTransaction(transactionAdd);

//         console.log("Seller added");
//       }
//     } catch (error) {
//       console.error("Error handling token approval or adding seller:", error);
//     }
//   }


//   return (
//     <>
//       <button onClick={handleApprovalAndAddSeller}>Add Seller By User</button>
//     </>
//   );
// }
