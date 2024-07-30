import { amoy } from "./chain";
import { client } from "./client";
import { getContract } from "@/app/thirdweb";
import config from "@/Strings/config";
import { registryABI } from "./contractabi/registryABI";
import { contractABI } from "./contractabi/contractABI";
import { tokenABI } from "./contractabi/tokenABI";
import { auctionABI } from "./contractabi/auctionABI";
import { claimABI } from "./contractabi/claimABI";

export const contract = getContract({
  client: client,
  chain: amoy,
  address: config.ContractAddress,
  abi: contractABI,
});

export const tokencontract = getContract({
  client: client,
  chain: amoy,
  address: config.TokenAddress,
  abi: tokenABI,
});

export const registryContract = getContract({
  client: client,
  chain: amoy,
  address: config.RegistryAddress as `0x${string}`,
  abi: registryABI,
});

export const auctioncontract = getContract({
  client: client,
  chain: amoy,
  address: config.AuctionAddres as `0x${string}`,
  abi: auctionABI,
});

export const claimcontract = getContract({
  client: client,
  chain: amoy,
  address: config.claimAddress as `0x${string}`,
  abi: claimABI,
});
