import { amoy } from "./chain";
import { client } from "./client";
import { getContract } from "@/app/thirdweb";
import config from "@/Strings/config";

const contractABI = [
  {
    type: "constructor",
    name: "",
    inputs: [
      {
        type: "address",
        name: "_token",
        internalType: "contract IERC20",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "ReentrancyGuardReentrantCall",
    inputs: [],
    outputs: [],
  },
  {
    type: "event",
    name: "ProductAdded",
    inputs: [
      {
        type: "address",
        name: "seller",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "productId",
        indexed: true,
        internalType: "uint256",
      },
      {
        type: "tuple",
        name: "product",
        components: [
          {
            type: "string",
            name: "tag",
            internalType: "string",
          },
          {
            type: "string",
            name: "name",
            internalType: "string",
          },
          {
            type: "string",
            name: "cover",
            internalType: "string",
          },
          {
            type: "string",
            name: "display1",
            internalType: "string",
          },
          {
            type: "string",
            name: "display2",
            internalType: "string",
          },
          {
            type: "string",
            name: "display3",
            internalType: "string",
          },
          {
            type: "string",
            name: "description",
            internalType: "string",
          },
          {
            type: "uint256",
            name: "price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "stock",
            internalType: "uint256",
          },
          {
            type: "bool",
            name: "isMaticPayment",
            internalType: "bool",
          },
          {
            type: "address",
            name: "seller",
            internalType: "address payable",
          },
          {
            type: "uint256",
            name: "id",
            internalType: "uint256",
          },
          {
            type: "bool",
            name: "isListed",
            internalType: "bool",
          },
        ],
        indexed: false,
        internalType: "struct ArtYumeBuy.Product",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProductDelisted",
    inputs: [
      {
        type: "address",
        name: "seller",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "productId",
        indexed: true,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProductListed",
    inputs: [
      {
        type: "address",
        name: "seller",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "productId",
        indexed: true,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProductPurchased",
    inputs: [
      {
        type: "address",
        name: "buyer",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "productId",
        indexed: true,
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "price",
        indexed: false,
        internalType: "uint256",
      },
      {
        type: "string",
        name: "hash",
        indexed: false,
        internalType: "string",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "addProduct",
    inputs: [
      {
        type: "string",
        name: "cover",
        internalType: "string",
      },
      {
        type: "string",
        name: "name",
        internalType: "string",
      },
      {
        type: "uint256",
        name: "price",
        internalType: "uint256",
      },
      {
        type: "bool",
        name: "isMaticPayment",
        internalType: "bool",
      },
      {
        type: "string",
        name: "tag",
        internalType: "string",
      },
      {
        type: "string",
        name: "description",
        internalType: "string",
      },
      {
        type: "string",
        name: "display1",
        internalType: "string",
      },
      {
        type: "string",
        name: "display2",
        internalType: "string",
      },
      {
        type: "string",
        name: "display3",
        internalType: "string",
      },
      {
        type: "uint256",
        name: "stock",
        internalType: "uint256",
      },
      {
        type: "string",
        name: "hash",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "buyProduct",
    inputs: [
      {
        type: "uint256",
        name: "productId",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "buyerHistory",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "productId",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "price",
        internalType: "uint256",
      },
      {
        type: "string",
        name: "hash",
        internalType: "string",
      },
      {
        type: "uint256",
        name: "timestamp",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllProducts",
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "string",
            name: "tag",
            internalType: "string",
          },
          {
            type: "string",
            name: "name",
            internalType: "string",
          },
          {
            type: "string",
            name: "cover",
            internalType: "string",
          },
          {
            type: "string",
            name: "display1",
            internalType: "string",
          },
          {
            type: "string",
            name: "display2",
            internalType: "string",
          },
          {
            type: "string",
            name: "display3",
            internalType: "string",
          },
          {
            type: "string",
            name: "description",
            internalType: "string",
          },
          {
            type: "uint256",
            name: "price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "stock",
            internalType: "uint256",
          },
          {
            type: "bool",
            name: "isMaticPayment",
            internalType: "bool",
          },
          {
            type: "address",
            name: "seller",
            internalType: "address payable",
          },
          {
            type: "uint256",
            name: "id",
            internalType: "uint256",
          },
          {
            type: "bool",
            name: "isListed",
            internalType: "bool",
          },
        ],
        internalType: "struct ArtYumeBuy.Product[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFee",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getProductById",
    inputs: [
      {
        type: "uint256",
        name: "id",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "tuple",
        name: "",
        components: [
          {
            type: "string",
            name: "tag",
            internalType: "string",
          },
          {
            type: "string",
            name: "name",
            internalType: "string",
          },
          {
            type: "string",
            name: "cover",
            internalType: "string",
          },
          {
            type: "string",
            name: "display1",
            internalType: "string",
          },
          {
            type: "string",
            name: "display2",
            internalType: "string",
          },
          {
            type: "string",
            name: "display3",
            internalType: "string",
          },
          {
            type: "string",
            name: "description",
            internalType: "string",
          },
          {
            type: "uint256",
            name: "price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "stock",
            internalType: "uint256",
          },
          {
            type: "bool",
            name: "isMaticPayment",
            internalType: "bool",
          },
          {
            type: "address",
            name: "seller",
            internalType: "address payable",
          },
          {
            type: "uint256",
            name: "id",
            internalType: "uint256",
          },
          {
            type: "bool",
            name: "isListed",
            internalType: "bool",
          },
        ],
        internalType: "struct ArtYumeBuy.Product",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getProductHash",
    inputs: [
      {
        type: "uint256",
        name: "productId",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "buyer",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getProducts",
    inputs: [
      {
        type: "address",
        name: "seller",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "string",
            name: "tag",
            internalType: "string",
          },
          {
            type: "string",
            name: "name",
            internalType: "string",
          },
          {
            type: "string",
            name: "cover",
            internalType: "string",
          },
          {
            type: "string",
            name: "display1",
            internalType: "string",
          },
          {
            type: "string",
            name: "display2",
            internalType: "string",
          },
          {
            type: "string",
            name: "display3",
            internalType: "string",
          },
          {
            type: "string",
            name: "description",
            internalType: "string",
          },
          {
            type: "uint256",
            name: "price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "stock",
            internalType: "uint256",
          },
          {
            type: "bool",
            name: "isMaticPayment",
            internalType: "bool",
          },
          {
            type: "address",
            name: "seller",
            internalType: "address payable",
          },
          {
            type: "uint256",
            name: "id",
            internalType: "uint256",
          },
          {
            type: "bool",
            name: "isListed",
            internalType: "bool",
          },
        ],
        internalType: "struct ArtYumeBuy.Product[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "productbytag",
    inputs: [
      {
        type: "string",
        name: "tag",
        internalType: "string",
      },
    ],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "string",
            name: "tag",
            internalType: "string",
          },
          {
            type: "string",
            name: "name",
            internalType: "string",
          },
          {
            type: "string",
            name: "cover",
            internalType: "string",
          },
          {
            type: "string",
            name: "display1",
            internalType: "string",
          },
          {
            type: "string",
            name: "display2",
            internalType: "string",
          },
          {
            type: "string",
            name: "display3",
            internalType: "string",
          },
          {
            type: "string",
            name: "description",
            internalType: "string",
          },
          {
            type: "uint256",
            name: "price",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "stock",
            internalType: "uint256",
          },
          {
            type: "bool",
            name: "isMaticPayment",
            internalType: "bool",
          },
          {
            type: "address",
            name: "seller",
            internalType: "address payable",
          },
          {
            type: "uint256",
            name: "id",
            internalType: "uint256",
          },
          {
            type: "bool",
            name: "isListed",
            internalType: "bool",
          },
        ],
        internalType: "struct ArtYumeBuy.Product[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "toggleProductListing",
    inputs: [
      {
        type: "uint256",
        name: "productId",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "token",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IERC20",
      },
    ],
    stateMutability: "view",
  },
] as const;

export const contract = getContract({
  client: client,
  chain: amoy,
  address: config.ContractAddress,
  abi: contractABI,
});
//
//
//
//
//
//
//
//
//
const tokenABI = [
  {
    type: "constructor",
    name: "",
    inputs: [
      {
        type: "address",
        name: "initialOwner",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "ERC20InsufficientAllowance",
    inputs: [
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "allowance",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "needed",
        internalType: "uint256",
      },
    ],
    outputs: [],
  },
  {
    type: "error",
    name: "ERC20InsufficientBalance",
    inputs: [
      {
        type: "address",
        name: "sender",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "balance",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "needed",
        internalType: "uint256",
      },
    ],
    outputs: [],
  },
  {
    type: "error",
    name: "ERC20InvalidApprover",
    inputs: [
      {
        type: "address",
        name: "approver",
        internalType: "address",
      },
    ],
    outputs: [],
  },
  {
    type: "error",
    name: "ERC20InvalidReceiver",
    inputs: [
      {
        type: "address",
        name: "receiver",
        internalType: "address",
      },
    ],
    outputs: [],
  },
  {
    type: "error",
    name: "ERC20InvalidSender",
    inputs: [
      {
        type: "address",
        name: "sender",
        internalType: "address",
      },
    ],
    outputs: [],
  },
  {
    type: "error",
    name: "ERC20InvalidSpender",
    inputs: [
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
    ],
    outputs: [],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
      },
    ],
    outputs: [],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [],
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        type: "address",
        name: "owner",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "spender",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "value",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "newOwner",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        type: "address",
        name: "from",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "to",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "value",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
      },
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "value",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [
      {
        type: "uint8",
        name: "",
        internalType: "uint8",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "value",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      {
        type: "address",
        name: "from",
        internalType: "address",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "value",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const tokencontract = getContract({
  client: client,
  chain: amoy,
  address: config.TokenAddress,
  abi: tokenABI,
});
//
//
//

const auctionABI = [
  {
    type: "constructor",
    name: "",
    inputs: [
      {
        type: "address",
        name: "_token",
        internalType: "contract IERC20",
      },
      {
        type: "address",
        name: "_artYumeRegistryAddress",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "Registry",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract ArtYumeRegistry",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "auctionDetails",
    inputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "address",
        name: "highestBidder",
        internalType: "address",
      },
      {
        type: "string",
        name: "highestBidderEmail",
        internalType: "string",
      },
      {
        type: "uint256",
        name: "currentPrice",
        internalType: "uint256",
      },
      {
        type: "uint8",
        name: "AuctionStatus",
        internalType: "enum ArtYumeAuction.AuctionStatus",
      },
      {
        type: "address",
        name: "Seller",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "bid",
    inputs: [
      {
        type: "uint256",
        name: "auctionId",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cancelAuction",
    inputs: [
      {
        type: "uint256",
        name: "auctionId",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "checkBid",
    inputs: [
      {
        type: "address",
        name: "bidder",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "auctionId",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createAuction",
    inputs: [
      {
        type: "string",
        name: "name",
        internalType: "string",
      },
      {
        type: "string",
        name: "description",
        internalType: "string",
      },
      {
        type: "uint256",
        name: "startPrice",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "duration",
        internalType: "uint256",
      },
      {
        type: "string",
        name: "file",
        internalType: "string",
      },
      {
        type: "string",
        name: "coverimage",
        internalType: "string",
      },
      {
        type: "string",
        name: "display1",
        internalType: "string",
      },
      {
        type: "string",
        name: "display2",
        internalType: "string",
      },
      {
        type: "string",
        name: "display3",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "endAuction",
    inputs: [
      {
        type: "uint256",
        name: "auctionId",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAllAuctions",
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "uint256",
            name: "id",
            internalType: "uint256",
          },
          {
            type: "string",
            name: "AuctionName",
            internalType: "string",
          },
          {
            type: "string",
            name: "coverimage",
            internalType: "string",
          },
          {
            type: "string",
            name: "description",
            internalType: "string",
          },
          {
            type: "string",
            name: "display1",
            internalType: "string",
          },
          {
            type: "string",
            name: "display2",
            internalType: "string",
          },
          {
            type: "string",
            name: "display3",
            internalType: "string",
          },
          {
            type: "address",
            name: "seller",
            internalType: "address payable",
          },
          {
            type: "string",
            name: "sellerEmail",
            internalType: "string",
          },
          {
            type: "uint256",
            name: "startPrice",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "endTime",
            internalType: "uint256",
          },
          {
            type: "uint8",
            name: "AuctionStatus",
            internalType: "enum ArtYumeAuction.AuctionStatus",
          },
        ],
        internalType: "struct ArtYumeAuction.Auction[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllBiddersEmails",
    inputs: [
      {
        type: "uint256",
        name: "auctionId",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "string[]",
        name: "",
        internalType: "string[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAuctionById",
    inputs: [
      {
        type: "uint256",
        name: "id",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "tuple",
        name: "",
        components: [
          {
            type: "uint256",
            name: "id",
            internalType: "uint256",
          },
          {
            type: "string",
            name: "AuctionName",
            internalType: "string",
          },
          {
            type: "string",
            name: "coverimage",
            internalType: "string",
          },
          {
            type: "string",
            name: "description",
            internalType: "string",
          },
          {
            type: "string",
            name: "display1",
            internalType: "string",
          },
          {
            type: "string",
            name: "display2",
            internalType: "string",
          },
          {
            type: "string",
            name: "display3",
            internalType: "string",
          },
          {
            type: "address",
            name: "seller",
            internalType: "address payable",
          },
          {
            type: "string",
            name: "sellerEmail",
            internalType: "string",
          },
          {
            type: "uint256",
            name: "startPrice",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "endTime",
            internalType: "uint256",
          },
          {
            type: "uint8",
            name: "AuctionStatus",
            internalType: "enum ArtYumeAuction.AuctionStatus",
          },
        ],
        internalType: "struct ArtYumeAuction.Auction",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAuctionDetail",
    inputs: [
      {
        type: "uint256",
        name: "auctionId",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "tuple",
        name: "",
        components: [
          {
            type: "address[]",
            name: "bidders",
            internalType: "address[]",
          },
          {
            type: "string[]",
            name: "biddersmail",
            internalType: "string[]",
          },
          {
            type: "address",
            name: "highestBidder",
            internalType: "address",
          },
          {
            type: "string",
            name: "highestBidderEmail",
            internalType: "string",
          },
          {
            type: "uint256",
            name: "currentPrice",
            internalType: "uint256",
          },
          {
            type: "uint8",
            name: "AuctionStatus",
            internalType: "enum ArtYumeAuction.AuctionStatus",
          },
          {
            type: "address",
            name: "Seller",
            internalType: "address",
          },
        ],
        internalType: "struct ArtYumeAuction.AuctionDetail",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAuctionHash",
    inputs: [
      {
        type: "address",
        name: "bidder",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "auctionId",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getBids",
    inputs: [
      {
        type: "uint256",
        name: "auctionId",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "address[]",
        name: "",
        internalType: "address[]",
      },
      {
        type: "uint256[]",
        name: "",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEndedAuctions",
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "uint256",
            name: "id",
            internalType: "uint256",
          },
          {
            type: "string",
            name: "AuctionName",
            internalType: "string",
          },
          {
            type: "string",
            name: "coverimage",
            internalType: "string",
          },
          {
            type: "string",
            name: "description",
            internalType: "string",
          },
          {
            type: "string",
            name: "display1",
            internalType: "string",
          },
          {
            type: "string",
            name: "display2",
            internalType: "string",
          },
          {
            type: "string",
            name: "display3",
            internalType: "string",
          },
          {
            type: "address",
            name: "seller",
            internalType: "address payable",
          },
          {
            type: "string",
            name: "sellerEmail",
            internalType: "string",
          },
          {
            type: "uint256",
            name: "startPrice",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "endTime",
            internalType: "uint256",
          },
          {
            type: "uint8",
            name: "AuctionStatus",
            internalType: "enum ArtYumeAuction.AuctionStatus",
          },
        ],
        internalType: "struct ArtYumeAuction.Auction[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getHighestBidderEmail",
    inputs: [
      {
        type: "uint256",
        name: "auctionId",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasBid",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "searchAuctionsByPriceRange",
    inputs: [
      {
        type: "uint256",
        name: "minPrice",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "maxPrice",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "uint256",
            name: "id",
            internalType: "uint256",
          },
          {
            type: "string",
            name: "AuctionName",
            internalType: "string",
          },
          {
            type: "string",
            name: "coverimage",
            internalType: "string",
          },
          {
            type: "string",
            name: "description",
            internalType: "string",
          },
          {
            type: "string",
            name: "display1",
            internalType: "string",
          },
          {
            type: "string",
            name: "display2",
            internalType: "string",
          },
          {
            type: "string",
            name: "display3",
            internalType: "string",
          },
          {
            type: "address",
            name: "seller",
            internalType: "address payable",
          },
          {
            type: "string",
            name: "sellerEmail",
            internalType: "string",
          },
          {
            type: "uint256",
            name: "startPrice",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "endTime",
            internalType: "uint256",
          },
          {
            type: "uint8",
            name: "AuctionStatus",
            internalType: "enum ArtYumeAuction.AuctionStatus",
          },
        ],
        internalType: "struct ArtYumeAuction.Auction[]",
      },
    ],
    stateMutability: "view",
  },
] as const;

export const auctioncontract = getContract({
  client: client,
  chain: amoy,
  address: config.AuctionAddres,
  abi: auctionABI,
});
//
//
//
//
//
//
//
//
//

const registryABI = [
  {
    type: "constructor",
    name: "",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "REGISTRY_INTERVAL",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "admin",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "editProfile",
    inputs: [
      {
        type: "string",
        name: "_firstName",
        internalType: "string",
      },
      {
        type: "string",
        name: "_secondName",
        internalType: "string",
      },
      {
        type: "string",
        name: "_email",
        internalType: "string",
      },
      {
        type: "string",
        name: "_userName",
        internalType: "string",
      },
      {
        type: "string",
        name: "_socialLink",
        internalType: "string",
      },
      {
        type: "string",
        name: "_Bio",
        internalType: "string",
      },
      {
        type: "string",
        name: "_profileImage",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAllReports",
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "string",
            name: "topic",
            internalType: "string",
          },
          {
            type: "uint256",
            name: "reportId",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "reporter",
            internalType: "address",
          },
          {
            type: "address",
            name: "userReported",
            internalType: "address",
          },
          {
            type: "string",
            name: "report",
            internalType: "string",
          },
          {
            type: "uint256",
            name: "reportTime",
            internalType: "uint256",
          },
        ],
        internalType: "struct ArtYumeRegistry.Report[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUnverifiedUsers",
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "string",
            name: "firstName",
            internalType: "string",
          },
          {
            type: "string",
            name: "secondName",
            internalType: "string",
          },
          {
            type: "string",
            name: "email",
            internalType: "string",
          },
          {
            type: "string",
            name: "userName",
            internalType: "string",
          },
          {
            type: "string",
            name: "socialLink",
            internalType: "string",
          },
          {
            type: "string",
            name: "Bio",
            internalType: "string",
          },
          {
            type: "string",
            name: "profileImage",
            internalType: "string",
          },
          {
            type: "address",
            name: "userAddress",
            internalType: "address",
          },
          {
            type: "bool",
            name: "isVerified",
            internalType: "bool",
          },
        ],
        internalType: "struct ArtYumeRegistry.Register[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserDetails",
    inputs: [
      {
        type: "address",
        name: "_user",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "tuple",
        name: "",
        components: [
          {
            type: "string",
            name: "firstName",
            internalType: "string",
          },
          {
            type: "string",
            name: "secondName",
            internalType: "string",
          },
          {
            type: "string",
            name: "email",
            internalType: "string",
          },
          {
            type: "string",
            name: "userName",
            internalType: "string",
          },
          {
            type: "string",
            name: "socialLink",
            internalType: "string",
          },
          {
            type: "string",
            name: "Bio",
            internalType: "string",
          },
          {
            type: "string",
            name: "profileImage",
            internalType: "string",
          },
          {
            type: "address",
            name: "userAddress",
            internalType: "address",
          },
          {
            type: "bool",
            name: "isVerified",
            internalType: "bool",
          },
        ],
        internalType: "struct ArtYumeRegistry.Register",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isRegistered",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "lastRegistry",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "register",
    inputs: [
      {
        type: "string",
        name: "firstName",
        internalType: "string",
      },
      {
        type: "string",
        name: "secondName",
        internalType: "string",
      },
      {
        type: "string",
        name: "userName",
        internalType: "string",
      },
      {
        type: "string",
        name: "email",
        internalType: "string",
      },
      {
        type: "string",
        name: "socialLink",
        internalType: "string",
      },
      {
        type: "string",
        name: "Bio",
        internalType: "string",
      },
      {
        type: "string",
        name: "profileImage",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "registry",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "string",
        name: "firstName",
        internalType: "string",
      },
      {
        type: "string",
        name: "secondName",
        internalType: "string",
      },
      {
        type: "string",
        name: "email",
        internalType: "string",
      },
      {
        type: "string",
        name: "userName",
        internalType: "string",
      },
      {
        type: "string",
        name: "socialLink",
        internalType: "string",
      },
      {
        type: "string",
        name: "Bio",
        internalType: "string",
      },
      {
        type: "string",
        name: "profileImage",
        internalType: "string",
      },
      {
        type: "address",
        name: "userAddress",
        internalType: "address",
      },
      {
        type: "bool",
        name: "isVerified",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "reportById",
    inputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "string",
        name: "topic",
        internalType: "string",
      },
      {
        type: "uint256",
        name: "reportId",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "reporter",
        internalType: "address",
      },
      {
        type: "address",
        name: "userReported",
        internalType: "address",
      },
      {
        type: "string",
        name: "report",
        internalType: "string",
      },
      {
        type: "uint256",
        name: "reportTime",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "reportUser",
    inputs: [
      {
        type: "string",
        name: "reportTopic",
        internalType: "string",
      },
      {
        type: "address",
        name: "userReported",
        internalType: "address",
      },
      {
        type: "string",
        name: "reportMsg",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "verifyUser",
    inputs: [
      {
        type: "address",
        name: "_userAddress",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "viewProfile",
    inputs: [
      {
        type: "address",
        name: "user",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "tuple",
        name: "",
        components: [
          {
            type: "string",
            name: "firstName",
            internalType: "string",
          },
          {
            type: "string",
            name: "secondName",
            internalType: "string",
          },
          {
            type: "string",
            name: "email",
            internalType: "string",
          },
          {
            type: "string",
            name: "userName",
            internalType: "string",
          },
          {
            type: "string",
            name: "socialLink",
            internalType: "string",
          },
          {
            type: "string",
            name: "Bio",
            internalType: "string",
          },
          {
            type: "string",
            name: "profileImage",
            internalType: "string",
          },
          {
            type: "address",
            name: "userAddress",
            internalType: "address",
          },
          {
            type: "bool",
            name: "isVerified",
            internalType: "bool",
          },
        ],
        internalType: "struct ArtYumeRegistry.Register",
      },
    ],
    stateMutability: "view",
  },
] as const;

export const registryContract = getContract({
  client: client,
  chain: amoy,
  address: config.RegistryAddress as `0x${string}`,
  abi: registryABI,
});
//
//
//
//
