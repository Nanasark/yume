export const registryABI = [
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
    name: "checkRegistered",
    inputs: [
      {
        type: "address",
        name: "_user",
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
