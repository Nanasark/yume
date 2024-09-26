// "use client";

// import { MediaRenderer, toEther, useContractEvents } from "@/app/thirdweb";
// import { useReadContract, useActiveAccount } from "@/app/thirdweb";
// import { auctioncontract, registryContract } from "@/app/contract";
// import AuctionTimer from "@/components/auctionTimer";
// import BidButton from "@/components/buttoncomponents/Bid";
// import { client } from "@/app/client";
// // import EndAuction from "@/components/EndAuction";
// import SignInButton from "@/components/buttoncomponents/SignInButton";
// import GetHash from "@/components/GetHash";
// // import DownloadButton from "@/pages/DownloadButton";
// // import ThirdwebDownloader from "@/components/download";
// import FileDownload from "@/components/download";
// import EndAuction from "@/components/EndAuction";
// import DownloadAuction from "@/components/DownloadAuction";

// export default function AuctionPage({ params }: { params: { id: bigint } }) {
//   const account = useActiveAccount();
//   const address = account ? account?.address : "";

//   const { data: auction, isLoading: isAuctionLoading } = useReadContract({
//     contract: auctioncontract,
//     method: "getAuctionById",
//     params: [params.id],
//   });

//   const { data: GetHash, isLoading: isHashLoading } = useReadContract({
//     contract: auctioncontract,
//     method: "getAuctionHash",
//     params: [address, params.id],
//   });

//   const { data: registry, isLoading: isRegistryLoading } = useReadContract({
//     contract: registryContract,
//     method: "getUserDetails",
//     params: [auction?.seller as `0x${string}`],
//   });

//   const { data: checkBidder, isLoading: isCheckBidderLoading } =
//     useReadContract({
//       contract: registryContract,
//       method: "getUserDetails",
//       params: [address as `0x${string}`],
//     });

//   const AuctionId = auction ? auction?.id : BigInt(10000000000000000);

//   const { data: auctionDetails, isLoading: isAuctionDetails } = useReadContract(
//     {
//       contract: auctioncontract,
//       method: "auctionDetails",
//       params: [AuctionId],
//     }
//   );

//   const { data: bids, isLoading: isBidsLoading } = useReadContract({
//     contract: auctioncontract,
//     method: "getBids",
//     params: [params.id],
//   });

//   // Assuming endTime is a Unix timestamp
//   const endTimeBigInt = auction?.endTime; // assuming auction.endTime is a bigint
//   const endTimeDate = new Date(Number(endTimeBigInt) * 1000); // Assuming endTime is a Unix timestamp
//   const endTimeString = endTimeDate.toUTCString();

//   return (
//     <div className="flex items-center p-10 justify-center text-white bg-[#181934] h-auto">
//       {isAuctionLoading
//         ? "loading Auction Info..."
//         : auction && (
//             <div className="flex justify-between flex-col border-[3px] rounded-xl border-b-teal-900 border-t-gray-900 border-r-cyan-950 border-l-fuchsia-900 bg-[#1F2045] p-5 w-[1500px] h-[900px] ">
//               {/* MAIN TOP DIV */}
//               <div className="flex justify-between">
//                 {/* first section on left-top */}
//                 <div className=" flex flex-col gap-5">
//                   {" "}
//                   <div className="w-[500px] h-[500px]">
//                     <MediaRenderer
//                       client={client}
//                       className="relative border-amber-800 rounded-lg border-[2px] w-full h-full object-cover"
//                       src={`ipfs://${auction.coverimage}`}
//                       style={{ objectFit: "cover" }}
//                     />
//                   </div>
//                   <div>
//                     {" "}
//                     <AuctionTimer
//                       TimeBoxClass="flex gap-2 items-center justify-center bg-slate-900 w-[200px] h-[40px] rounded-lg"
//                       dayClass=""
//                       div1class=""
//                       hourClass=""
//                       minuteClass=""
//                       secondsClass=""
//                       endTime={auction.endTime}
//                     />
//                   </div>
//                 </div>
//                 {/* section section on right-top */}
//                 <div className="flex bg-black flex-col gap-5">
//                   {" "}
//                   <div>
//                     {checkBidder?.userAddress == address && (
//                       <div className="mt-10">
//                         <BidButton
//                           id={auction.id}
//                           owner={auction.seller}
//                           price={auction.startPrice}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* MAIN BOTTOM DIV */}
//               <div className="flex items-center gap-3 justify-between">
//                 {/*  section on left-bottom */}
//                 <div className="flex gap-3">
//                   <div className="w-[250px] h-[250px] overflow-hidden">
//                     <MediaRenderer
//                       client={client}
//                       className="relative border-amber-800 rounded-lg border-[2px] w-full h-full object-cover"
//                       src={`ipfs://${auction.display1}`}
//                       style={{ objectFit: "cover" }}
//                     />
//                   </div>

//                   <div className="w-[250px] h-[250px] overflow-hidden">
//                     <MediaRenderer
//                       client={client}
//                       className="relative border-amber-800 rounded-lg border-[2px] w-full h-full object-cover"
//                       src={`ipfs://${auction.display2}`}
//                       style={{ objectFit: "cover" }}
//                     />
//                   </div>

//                   <div className="w-[250px] h-[250px] overflow-hidden">
//                     <MediaRenderer
//                       client={client}
//                       className="relative border-amber-800 rounded-lg border-[2px] w-full h-full object-cover"
//                       src={`ipfs://${auction.display3}`}
//                       style={{ objectFit: "cover" }}
//                     />
//                   </div>
//                 </div>
//                 {/*  section on right-bottom */}
//                 <div className="w-[500px] h-[400px] items-center p-10 bg-neutral-800">
//                   <h1>Bids and Amounts</h1>
//                   {isBidsLoading
//                     ? "loading Bids"
//                     : bids && (
//                         <>
//                           {" "}
//                           <table className="w-[400px] text-black rounded-md bg-gradient-to-r from-purple-700 to-blue-700 border border-purple-900 shadow-lg">
//                             <thead className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
//                               <tr>
//                                 <th className="p-2 border-r-2 border-red-700">
//                                   Bidder
//                                 </th>
//                                 <th className="p-2 border-l-2 border-red-700">
//                                   Amount
//                                 </th>
//                               </tr>
//                             </thead>
//                             <tbody className="bg-white">
//                               <tr className="border-b-2 border-purple-900">
//                                 {bids[0].map((bidder, index) => (
//                                   <td
//                                     key={index}
//                                     className="p-2 border-r-2 border-purple-900"
//                                   >
//                                     {bidder.slice(0, 5)}...{bidder.slice(-8)}
//                                   </td>
//                                 ))}
//                                 {bids[1].map((amount) => (
//                                   <td className="p-2">
//                                     {toEther(amount)} ARYM
//                                   </td>
//                                 ))}
//                               </tr>
//                               {/* <tr className="border-b-2 border-purple-900">
//                                 <td className="p-2 border-r-2 border-purple-900">
//                                   bbbbbbbbbbbbbbbbbbbbbbbbbbbb
//                                 </td>
//                                 <td className="p-2">456</td>
//                               </tr> */}
//                             </tbody>
//                           </table>
//                         </>
//                       )}
//                 </div>

//                 <EndAuction
//                   endTime={auction.endTime}
//                   id={auction.id}
//                   seller={auction.seller}
//                 />
//               </div>
//             </div>
//           )}
//     </div>
//   );
// }

// // {
// //   bids[0].map((bidder) => (
// //     <td>
// //       {bidder.slice(0, 5)}...{bidder.slice(-8)}
// //     </td>
// //   ));
// // }

// //  {
// //    bids[1].map((amount) => <td>{toEther(amount)} FASDSADDSADASDA</td>);
// //  }

"use client";

import { MediaRenderer, toEther, useContractEvents } from "@/app/thirdweb";
import { useReadContract, useActiveAccount } from "@/app/thirdweb";
import { auctioncontract, registryContract } from "@/app/contract";
import AuctionTimer from "@/components/auctionTimer";
import BidButton from "@/components/buttoncomponents/Bid";
import { client } from "@/app/client";
// import EndAuction from "@/components/EndAuction";
import SignInButton from "@/components/buttoncomponents/SignInButton";
// import DownloadButton from "@/pages/DownloadButton";
// import ThirdwebDownloader from "@/components/download";
import FileDownload from "@/components/download";
// import EndAuction from "@/components/EndAuction";
import ImageHolder from "@/modals/ImageChange";
import PleaseRegister from "@/components/pleaseRegister";
import SellerSection from "@/components/AuctionDetail";
import AuctionDownload from "@/components/AuctionDownload";
import Card from "@/components/cards/Card";

export default function AuctionPage({ params }: { params: { id: bigint } }) {
  const account = useActiveAccount();
  const address = account ? account?.address : "";

  const { data: auction, isLoading: isAuctionLoading } = useReadContract({
    contract: auctioncontract,
    method: "getAuctionById",
    params: [params.id],
  });

  const { data: GetHash, isLoading: isHashLoading } = useReadContract({
    contract: auctioncontract,
    method: "getAuctionHash",
    params: [address, params.id],
  });
  const AuctionId = auction ? auction?.id : BigInt(10000000000000000);
  const { data: registry, isLoading: isRegistryLoading } = useReadContract({
    contract: registryContract,
    method: "getUserDetails",
    params: [auction?.seller as `0x${string}`],
  });

  const { data: bidIncrement } = useReadContract({
    contract: auctioncontract,
    method: "getBidIncrement",
    params: [AuctionId],
  });

  const { data: auctionDetail, isLoading: isLoadingAuctionDetail } =
    useReadContract({
      contract: auctioncontract,
      method: "getAuctionDetail",
      params: [AuctionId],
    });

  const { data: bids, isLoading: isBidsLoading } = useReadContract({
    contract: auctioncontract,
    method: "getBids",
    params: [params.id],
  });

  // Assuming endTime is a Unix timestamp
  const endTimeBigInt = auction?.endTime; // assuming auction.endTime is a bigint
  const endTimeDate = new Date(Number(endTimeBigInt) * 1000); // Assuming endTime is a Unix timestamp
  const endTimeString = endTimeDate.toUTCString();

  return (
    <div className="flex w-screen md:w-full  items-center p-2 pt-10 md:p-5 justify-center text-white bg-[#181934] h-auto">
      {isAuctionLoading
        ? "loading Auction Info..."
        : auction && (
            <div className="flex w-full justify-between md:top-5 relative flex-col rounded-xl gap-10 bg-[#0e131d]  p-5  ">
              {/* MAIN TOP DIV bg-[#1F2045] */}
              <div className="flex w-full flex-col  md:flex-row gap-10 justify-between ">
                {/* first section on left-top */}
                <div className=" md:w-1/2 flex flex-col gap-3 ">
                  {" "}
                  <div className=" md:w-10/12 md:h-[460px]">
                    <ImageHolder
                      cover={auction.coverimage}
                      display1={auction.display1}
                      display2={auction.display2}
                      display3={auction.display3}
                    />
                  </div>
                </div>
                {/* section section on right-top */}
                <div className="flex  w-full md:w-1/2 flex-col gap-5 p-t-5">
                  {" "}
                  <div className=" rounded-md flex flex-col gap-5  w-full h-full  ">
                    {/* {checkBidder?.userAddress == address ? (
                      <div className="mt-10">
                        <BidButtons
                          id={auction.id}
                          owner={auction.seller}
                          price={auction.startPrice}
                        />
                      </div>
                    ) : (
                      <PleaseRegister />
                    )} */}
                    <div className="w-full">
                      {registry && (
                        <SellerSection
                          image={registry.profileImage}
                          auctionName={auction.AuctionName}
                          auctionId={auction.id}
                          userName={registry.userName}
                        />
                      )}
                    </div>
                    <div className=" md:w-3/8 md:h-3/8 flex gap-5 w-full rounded-lg h-[100px] items-center  ">
                      {" "}
                      <div className="w-1/2 h-full rounded-[11px] flex items-center  justify-center borderGradient p-[1px] text-[#55567a] ">
                        <AuctionTimer
                          TimeBoxClass="flex gap-2 items-center justify-center  w-full h-[40px] rounded-lg"
                          dayClass=""
                          div1class="w-full h-full items-center flex justify-center bg-[#0e131d] rounded-[10px]"
                          hourClass=""
                          minuteClass=""
                          secondsClass=""
                          endTime={auction.endTime}
                        />
                      </div>
                      <div className="w-1/2 h-full rounded-[11px] p-[1px] flex items-center justify-center text-[#55567a] borderGradient">
                        <div className="w-full h-full bg-[#0e131d] rounded-[10px] flex flex-col items-center justify-center">
                          <h1>Last Price</h1>
                          {auctionDetail && bidIncrement && (
                            <p>
                              {toEther(
                                auctionDetail.currentPrice + bidIncrement
                              ).toString()}{" "}
                              ARYM
                            </p>
                          )}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="w-full ">
                      <BidButton
                        id={auction.id}
                        owner={auction.seller}
                        price={auction.startPrice}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* MAIN BOTTOM DIV */}
              <div className="flex flex-col md:flex-row items-center gap-10 justify-between">
                {/*  section on left-bottom */}

                <Card className="flex flex-col h-[203px] lg:h-[400px]">
                 
                  <AuctionDownload
                    AuctionName={auction.AuctionName}
                    auctionId={auction.id}
                  />
                </Card>
                {/*  section on right-bottom */}
                <div className="w-full h-[400px] items-center flex justify-center p-[1px] text-[#55567a] borderGradient  rounded-[11px]">
                  <div className="w-full h-full bg-[#0e131d] items-center rounded-[10px]">
                    <h1 className=" relative left-2 text-[1rem] font-bold">
                      Bids and Amounts
                    </h1>
                    {isBidsLoading
                      ? "loading Bids"
                      : bids && (
                          <>
                            {" "}
                            <table className="w-full text-black rounded-md   shadow-lg">
                              <thead className=" text-[#31325f]">
                                <tr>
                                  <th className="p-2 border-r-2 border-purple-700">
                                    Bidder
                                  </th>
                                  <th className="p-2 border-l-2 border-blue-700">
                                    Amount
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-[#0e131d]">
                                {bids[0].toReversed().map((bidder, index) => (
                                  <tr
                                    key={index}
                                    className="border-b-2 border-purple-900"
                                  >
                                    <td className="p-2 border-r-2 border-purple-900">
                                      {bidder.slice(0, 5)}...{bidder.slice(-8)}
                                    </td>
                                    <td className="p-2 border-l-2 border-purple-900">
                                      {toEther(bids[1].toReversed()[index])}{" "}
                                      ARYM
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </>
                        )}
                  </div>
                </div>

                {/* <EndAuction
                  endTime={auction.endTime}
                  id={auction.id}
                  seller={auction.seller}
                /> */}
              </div>
            </div>
          )}
    </div>
  );
}

// {
//   bids[0].map((bidder) => (
//     <td>
//       {bidder.slice(0, 5)}...{bidder.slice(-8)}
//     </td>
//   ));
// }

//  {
//    bids[1].map((amount) => <td>{toEther(amount)} FASDSADDSADASDA</td>);
//  }
