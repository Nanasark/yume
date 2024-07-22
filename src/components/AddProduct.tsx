// "use client";

// import {
//   useActiveAccount,
//   prepareContractCall,
//   toWei,
//   TransactionButton,
// } from "@/app/thirdweb";
// import { amoy } from "../app/chain";
// import { client } from "../app/client";
// import { contract, tokencontract } from "@/app/contract";
// import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

// interface AddProductInterface {
//   name: string;
//   tag: string;
//   cover: string;
//   display1: string;
//   display2: string;
//   display3: string;
//   hash: string;
//   description: string;
//   price: string;
//   stock: bigint;
//   isMaticPayment: boolean;
// }

// export default function AddProduct({
//   name,
//   tag,
//   description,
//   price,
//   isMaticPayment,
//   stock,
//   cover,
//   display1,
//   display2,
//   display3,
//   hash,
// }: AddProductInterface) {


    
//   return (
//     <div>
//       <TransactionButton
//         transaction={() =>
//           prepareContractCall({
//             contract,
//             method: "addProduct",
//             params: [
              
//             ],
//           })
//         }
//       >
//         AddProduct
//       </TransactionButton>
//     </div>
//   );
// }
