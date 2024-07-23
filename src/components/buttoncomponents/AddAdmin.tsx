// "use client";

// import { prepareContractCall, TransactionButton } from "@/app/thirdweb";

// import { contract } from "@/app/contract";

// interface AddAdmin {
//   newAdmin: string;
// }

// export default function AddAdmin({ newAdmin }: AddAdmin) {
//   return (
//     <>
//       <TransactionButton
//         transaction={() =>
//           prepareContractCall({
//             contract: contract,
//             method: "addAdmin",
//             params: [newAdmin],
//           })
//         }
//       >
//         AddSellerByAdmin
//       </TransactionButton>
//     </>
//   );
// }
