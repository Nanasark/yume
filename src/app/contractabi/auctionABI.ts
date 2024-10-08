export const auctionABI = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_artYumeRegistryAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "AuctionEndedWithoutBids",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "highestBidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundsAndProductTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "NewHighestBid",
    type: "event",
  },
  {
    inputs: [],
    name: "Registry",
    outputs: [
      {
        internalType: "contract ArtYumeRegistry",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "auctionDetails",
    outputs: [
      {
        internalType: "address payable",
        name: "highestBidder",
        type: "address",
      },
      {
        internalType: "string",
        name: "highestBidderEmail",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "currentPrice",
        type: "uint256",
      },
      {
        internalType: "enum ArtYumeAuction.AuctionStatus",
        name: "AuctionStatus",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "Seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "bid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "cancelAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "checkBid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "startPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "file",
        type: "string",
      },
      {
        internalType: "string",
        name: "coverimage",
        type: "string",
      },
      {
        internalType: "string",
        name: "display1",
        type: "string",
      },
      {
        internalType: "string",
        name: "display2",
        type: "string",
      },
      {
        internalType: "string",
        name: "display3",
        type: "string",
      },
    ],
    name: "createAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "endAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllAuctions",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "AuctionName",
            type: "string",
          },
          {
            internalType: "string",
            name: "coverimage",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "display1",
            type: "string",
          },
          {
            internalType: "string",
            name: "display2",
            type: "string",
          },
          {
            internalType: "string",
            name: "display3",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "string",
            name: "sellerEmail",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "startPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256",
          },
          {
            internalType: "enum ArtYumeAuction.AuctionStatus",
            name: "AuctionStatus",
            type: "uint8",
          },
        ],
        internalType: "struct ArtYumeAuction.Auction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "getAllBiddersEmails",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getAuctionById",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "AuctionName",
            type: "string",
          },
          {
            internalType: "string",
            name: "coverimage",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "display1",
            type: "string",
          },
          {
            internalType: "string",
            name: "display2",
            type: "string",
          },
          {
            internalType: "string",
            name: "display3",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "string",
            name: "sellerEmail",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "startPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256",
          },
          {
            internalType: "enum ArtYumeAuction.AuctionStatus",
            name: "AuctionStatus",
            type: "uint8",
          },
        ],
        internalType: "struct ArtYumeAuction.Auction",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "getAuctionDetail",
    outputs: [
      {
        components: [
          {
            internalType: "address[]",
            name: "bidders",
            type: "address[]",
          },
          {
            internalType: "string[]",
            name: "biddersmail",
            type: "string[]",
          },
          {
            internalType: "address payable",
            name: "highestBidder",
            type: "address",
          },
          {
            internalType: "string",
            name: "highestBidderEmail",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "currentPrice",
            type: "uint256",
          },
          {
            internalType: "enum ArtYumeAuction.AuctionStatus",
            name: "AuctionStatus",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "Seller",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
        ],
        internalType: "struct ArtYumeAuction.AuctionDetail",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "getAuctionHash",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getBidIncrement",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "getBids",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEndedAuctions",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "AuctionName",
            type: "string",
          },
          {
            internalType: "string",
            name: "coverimage",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "display1",
            type: "string",
          },
          {
            internalType: "string",
            name: "display2",
            type: "string",
          },
          {
            internalType: "string",
            name: "display3",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "string",
            name: "sellerEmail",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "startPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256",
          },
          {
            internalType: "enum ArtYumeAuction.AuctionStatus",
            name: "AuctionStatus",
            type: "uint8",
          },
        ],
        internalType: "struct ArtYumeAuction.Auction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "getHighestBidderEmail",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "getUserTotalBid",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "hasAuctionEnded",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "hasBid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxPrice",
        type: "uint256",
      },
    ],
    name: "searchAuctionsByPriceRange",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "AuctionName",
            type: "string",
          },
          {
            internalType: "string",
            name: "coverimage",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "display1",
            type: "string",
          },
          {
            internalType: "string",
            name: "display2",
            type: "string",
          },
          {
            internalType: "string",
            name: "display3",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "string",
            name: "sellerEmail",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "startPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256",
          },
          {
            internalType: "enum ArtYumeAuction.AuctionStatus",
            name: "AuctionStatus",
            type: "uint8",
          },
        ],
        internalType: "struct ArtYumeAuction.Auction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
