// "use client";

// import {
//   useActiveAccount,
//   prepareContractCall,
//   toWei,
//   TransactionButton,
// } from "@/app/thirdweb";
// import { amoy } from "../../app/chain";
// import { client } from "../../app/client";
// import { contract } from "@/app/contract";
// import { resolveMethod } from "thirdweb";

// interface RemoveAdmin {
//   adminAddress: string;
// }

// export default function RemoveAdmin({ adminAddress }: RemoveAdmin) {
//   const account = useActiveAccount();
//   const address = account?.address;

//   return (
//     <>
//       <TransactionButton
//         transaction={() =>
//           prepareContractCall({
//             contract: contract,
//             method: "removeSuperAdmin",
//             params: [adminAddress],
//           })
//         }
//       >
//         AddSellerByAdmin
//       </TransactionButton>
//     </>
//   );
// }
