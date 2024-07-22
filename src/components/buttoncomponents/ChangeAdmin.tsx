// "use client";

// import {
//   useActiveAccount,
//   prepareContractCall,
//   TransactionButton,
// } from "@/app/thirdweb";

// import { contract } from "@/app/contract";

// interface ChangeAdmin {
//   oldAdmin: string;
//   newAdmin: string;
// }

// export default function ChangeAdmin({ oldAdmin, newAdmin }: ChangeAdmin) {
//   const account = useActiveAccount();
//   const address = account?.address;

//   return (
//     <>
//       <TransactionButton
//         transaction={() =>
//           prepareContractCall({
//             contract: contract,
//             method: "changeAdmin",
//             params: [oldAdmin, newAdmin],
//           })
//         }
//       >
//         AddSellerByAdmin
//       </TransactionButton>
//     </>
//   );
// }
