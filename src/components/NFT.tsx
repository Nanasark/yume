// import React from 'react';
// import { Avatar, Box, Flex, Heading, Link, Skeleton, Text } from "@chakra-ui/react";
// import { NFT } from "@thirdweb-dev/sdk";
// import { DIGIMART_ADDRESS, NFT_COLLECTION_ADDRESS } from "../constants/addresses";
// import { ThirdwebNftMedia, useContract,useAddress, useValidDirectListings, useCancelDirectListing, Web3Button } from '@thirdweb-dev/react';

// type Props = {
//     nft: NFT;
//     showCancelButton?: boolean;
// }

// export default function NFTComponent({ nft, showCancelButton }: Props) {
//     const address = useAddress()
//     const { data: marketplace, isLoading: loadingMarketplace } = useContract(DIGIMART_ADDRESS, "marketplace-v3");
//     const { data: directListing, isLoading: LoadingDirectListing } = useValidDirectListings(marketplace, {
//         // tokenContract: NFT_COLLECTION_ADDRESS,
//         tokenId: nft.metadata.id,
//     });

//     // Use the useCancelDirectListing hook to get the cancelDirectListing function
//     const { mutateAsync: cancelDirectListing, isLoading: isCanceling, error: cancelError } = useCancelDirectListing(marketplace);

//     // Function to handle the cancel listing action
//     const haha = nft.metadata.uri
//     console.log(haha)


//     const isOwner = address === nft.owner;


//     const handleCancelListing = async () => {
//         if (directListing && directListing[0]) {
//             try {
//                 await cancelDirectListing(directListing[0].id);
//                 // Handle success, e.g., show a success message
//             } catch (error) {
//                 // Handle error, e.g., show an error message
//             }
//         }
//     };

//     return (
//         <Flex direction={"column"} backgroundColor={"#EEE"} justifyContent={"center"} padding={"2.5"} borderRadius={"6px"}>
//             <Box borderRadius={"4px"} overflow={"hidden"}>
//                 <ThirdwebNftMedia metadata={nft.metadata} height={"100%"} width={"100%"} />
//             </Box>
//             <Text fontWeight={"small"} color={"darkgray"}>Token ID #{nft.metadata.id}</Text>
//             <Text fontWeight={"bold"}>{nft.metadata.name}</Text>
//             <Box>
//                 {loadingMarketplace || LoadingDirectListing ? (
//                     <Skeleton></Skeleton>
//                 ) : directListing && directListing[0] ? (
//                     <Box>
//                         <Flex direction={"column"}>
//                             <Text fontSize={"small"}>Price</Text>
//                             <Text fontSize={"small"}>{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</Text>
//                         </Flex>
//                     </Box>
//                 ) : (
//                     <Box>
//                         <Flex direction={"column"}>
//                             <Text fontSize={"small"}>Price</Text>
//                             <Text fontSize={"small"}>Not Listed </Text>
//                         </Flex>
//                     </Box>
//                 )}
//             </Box>
//             {/* Add the Cancel Listing button */}
//             {showCancelButton && directListing && directListing[0] && isOwner && (
//                 <Web3Button
//                     contractAddress={DIGIMART_ADDRESS}
//                     action={handleCancelListing}
                    
                   
//                 >
//                     DeList
//                 </Web3Button>
//             )}
//         </Flex>
//     );
// }