// "use client";

// import {
//   useActiveAccount,
//   prepareContractCall,
//   toWei,
//   TransactionButton,
//   ConnectButton,
//   createThirdwebClient,
//   getContract,
// } from "@/app/thirdweb";

// import { polygonAmoy } from "thirdweb/chains";

// import { resolveMethod } from "thirdweb";
// import { amoy } from "../app/chain";
// import { client } from "../app/client";
// import { contract } from "@/app/contract";
// import config from "@/Strings/config";

// export default function Test() {
//   //   const contract = getContract({
//   //     client,

//   //     chain: amoy ,

//   //     address: "0xe930b33da5de11a8cd7f6f50270c89c0cac9ea7d",
//   //   });
//     console.log("addres", process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS!);
//     return (
      
//     <>
//       <ConnectButton client={client} chain={amoy} />

//       <TransactionButton
//         transaction={() => {
//           // Create a transaction object and return it

//           const tx = prepareContractCall({
//             contract,

//             method: "upgradeFee",

//             params: [toWei("0.0001")],
//           });

//           return tx;
//         }}
//         onTransactionSent={() => {
//           console.log("Fee Updated");
//         }}
//       >
//         Test Button
//       </TransactionButton>
//     </>
//   );
// }
