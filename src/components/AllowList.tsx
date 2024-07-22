// "use client";

// import {
//   useActiveAccount,
//   prepareContractCall,
//   toWei,
//   TransactionButton,
// } from "@/app/thirdweb";
// import { amoy } from "../app/chain";
// import { client } from "../app/client";
// import { contract } from "@/app/contract";

// import AddSellerByUser from "./buttoncomponents/AddSellerByUser";
// import ApproveToken from "./buttoncomponents/ApproveToken";
// import RemoveSeller from "./buttoncomponents/RemoveSeller";

// export default function AllowList() {
//   const account = useActiveAccount();
//   const address = account? account.address: "No account"

//   return (
//     <div>
//       <h1>Request Permission to List Products</h1>
//       <h2>Fee:</h2>
//       <Test />
//       <AddSellerByUser />
//       {/* <ApproveToken /> */}
//       <RemoveSeller
//         sellerAddress={address}
//       />
//     </div>
//   );
// }
