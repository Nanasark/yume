const config = {
  appwriteUrl: String(process.env.NEXT_APP_APPWRITE_URL),
  appwriteProjectId: String(process.env.NEXT_APP_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(process.env.NEXT_APP_APPWRITE_DATABASE_ID),
  appwriteNftCollectionId: String(
    process.env.NEXT_APP_APPWRITE_NFTCOLLECTION_ID
  ),
  appwriteNftCollectionBuctketId: String(
    process.env.NEXT_APP_APPWRITE_COLLECTION_BUCKET_ID
  ),
  appwriteNftBuctketId: String(process.env.NEXT_APP_APPWRITE_NFT_BUCKET_ID),
  thirdwebClientId: String(process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID),
  pinataJWT: String(process.env.NEXT_PUBLIC_PINATA_JWT),
  ContractAddress: String(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS),
  TokenAddress: String(process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS),
  AuctionAddres: String(process.env.NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS),
  RegistryAddress: String(process.env.NEXT_PUBLIC_REGISTRY_CONTRACT_ADDRESS),
  EndAuctionkey: String(process.env.NEXT_PUBLIC_END_AUCTION_KEY),
  claimAddress: String(process.env.NEXT_PUBLIC_CLAIM_CONTRACT_ADDRESS),
  defaultProfile: String(process.env.NEXT_PUBLIC_DEFAULT_PROFILE),
  buyARYMwithFiat: String(process.env.NEXT_PUBLIC_BUYARYMWITHFIAT_CONTRACT_ADDRESS),
};

export default config;
