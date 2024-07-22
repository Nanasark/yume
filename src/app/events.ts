import { AbiEvent } from "@thirdweb-dev/sdk";
import { PreparedEvent, prepareEvent } from "thirdweb";
// import { watchContractEvents } from "thirdweb";

// type ProductListedEvent = AbiEvent & {
//   type: "event";
//   name: "ProductListed";
//   anonymous: false;
//   inputs: [
//     {
//       type: "address";
//       name: "seller";
//       internalType: "address";
//       indexed: true;
//     },
//     {
//       type: "uint256";
//       name: "productId";
//       internalType: "uint256";
//       indexed: true;
//     }
//   ];
// };

// type ProductPurchasedEvent = AbiEvent & {
//   type: "event"; // This specifies the kind of ABI item this is.
//   name: "ProductPurchased"; // The name of the event.
//   anonymous: false; // Whether the event is anonymous.
//   inputs: [
//     {
//       type: "address";
//       name: "buyer";
//       internalType: "address";
//       indexed: true;
//     },
//     {
//       type: "uint256";
//       name: "productId";
//       internalType: "uint256";
//       indexed: true;
//     },
//     {
//       type: "uint256";
//       name: "price";
//       internalType: "uint256";
//       indexed: false;
//     },
//     {
//       type: "string";
//       name: "hash";
//       internalType: "string";
//       indexed: false;
//     }
//   ];
// };

const ProductPurchased = prepareEvent({
  signature:
    "event ProductPurchased(address indexed buyer, uint256 indexed productId, uint256 price, string hash)",
});
export const ProductPurchasedEvent = [ProductPurchased];

const ProductListed = prepareEvent({
  signature:
    "event ProductListed(address indexed seller, uint256 indexed productId)",
});

export const ProductListedEvent = [ProductListed];
