export const contractABI = [
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