// import {
//     useMintNFT,
//     useContract,
//     Web3Button,
//     useAddress,
//     useSDK
//   } from "@thirdweb-dev/react";
 

// export default function Mint() {
//     const address = useAddress()
//     const account = String(address)
//     console.log("the account is:", account)
//     const contractAddress ="0x40e4EE01aA014CC87668F683000F5880334dE1C8"
//     const { contract } = useContract(contractAddress);
//     const {
//     mutateAsync: mintNft,
//     isLoading,
//     error,
//   } = useMintNFT(contract);

//   const sdk = useSDK();

  
//   return (
//     <div>

//        { isLoading && (<div>loading minter </div>)}
      
//         <Web3Button
        
//         contractAddress={contractAddress}
//         action={() =>
//           mintNft({
            
//             metadata: {
//               name: "Sark",
//               description: "This is my NFT",
//               image: "ipfs://Qmb7MhgfXGNeDYXHpeG39e6oTMHfaoBbHkp3dKJXcfn4Ed", // Accepts any URL or File type
//             },
//             to:  "0x1559572a045F8ec085FbAc8A80B399D23Ecfd01a", // Use useAddress hook to get current wallet address
//           })
//         }
//       >
//         Mint NFT
//       </Web3Button>
//     </div>
    
//   );
// }
