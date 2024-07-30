export const auctionABI = [
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
        internalType: "address payable",
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
            internalType: "address payable",
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
