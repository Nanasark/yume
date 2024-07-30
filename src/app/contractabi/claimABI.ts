export const claimABI = [
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
    name: "claim",
    inputs: [
      {
        type: "address",
        name: "user",
        internalType: "address",
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
    name: "outToken",
    inputs: [
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
