"use client";

import { MediaRenderer, toEther, useContractEvents } from "@/app/thirdweb";
import { useReadContract, useActiveAccount } from "@/app/thirdweb";
import { contract, registryContract } from "@/app/contract";
import { client } from "@/app/client";
import BuyButton from "@/components/buttoncomponents/BuyButton";
import SignInButton from "@/components/buttoncomponents/SignInButton";
import { ProductPurchasedEvent } from "@/app/events";
import GetHash from "@/components/GetHash";
// import DownloadButton from "@/pages/DownloadButton";
// import ThirdwebDownloader from "@/components/download";
import FileDownload from "@/components/download";
import PleaseRegister from "@/components/pleaseRegister";
import SellerSection from "@/components/Sellersection";
import ImageHolder from "@/modals/ImageChange";

export default function ProductPage({ params }: { params: { id: bigint } }) {
  const account = useActiveAccount();
  const address = account ? account?.address : "";

  const { data: product, isLoading } = useReadContract({
    contract: contract,
    method: "getProductById",
    params: [params.id],
  });

  const { data: registry, isLoading: isRegistryLoading } = useReadContract({
    contract: registryContract,
    method: "getUserDetails",
    params: [product?.seller as `0x${string}`],
  });

  let ProductId;
  if (product) {
    ProductId = product.id;
  }

  const { data: showHash, isLoading: isLoadingHash } = useReadContract({
    contract,
    method: "getProductHash",
    params: [ProductId!, address as `0x${string}`],
  });

  console.log("ke hash", showHash);
  const { data: contractEvents, refetch: refetchEvents } = useContractEvents({
    contract: contract,
    events: ProductPurchasedEvent,
  });

  console.log("events:", contractEvents);
  let price;
  if (product) {
    price = toEther(product.price);
  }

  let payment;
  if (product) {
    if (product.isMaticPayment == true) {
      payment = "Matic";
    }
    if (product.isMaticPayment == false) {
      payment = "ARYM Token";
    }
  }

  return (
    <div className="flex items-center p-10 justify-center text-white bg-[#181934] h-auto">
      {product && (
        <div className="flex justify-between flex-col border-[3px] rounded-xl border-b-teal-900 border-t-gray-900 border-r-cyan-950 border-l-fuchsia-900 bg-[#1F2045] p-5 w-[1500px] h-[1100px] ">
          {/* MAIN TOP DIV */}
          <div className="flex justify-between ">
            {/* first section on left-top */}
            <div className="  flex flex-col gap-3 ">
              {" "}
              <div className="">
                <ImageHolder
                  cover={product.cover}
                  display1={product.display1}
                  display2={product.display2}
                  display3={product.display3}
                />
              </div>
              <div className="bg-black">
                {" "}
                <h1> Name :{product.name}</h1>
                <p>ID {product.id.toString()}</p>
                <p>{product.description}</p>
                <p>
                  {" "}
                  {price} {payment}
                </p>
              </div>
            </div>
            {/* section section on right-top */}
            <div className="flex items-center justify-center w-[600px] flex-col gap-5">
              {" "}
              <div className="bg-sky-950 border-[2px] rounded-md flex flex-col border-slate-700 w-full h-full items-center justify-center">
                {account ? (
                  <BuyButton
                    id={product.id}
                    price={product.price}
                    isMaticPayment={product.isMaticPayment}
                    isListed={product.isListed}
                    owner={product.seller}
                  />
                ) : (
                  <SignInButton />
                )}
              </div>
              <div className="w-full">
                {registry && (
                  <SellerSection
                    image={registry.profileImage}
                    profileLink={registry.socialLink}
                    userName={registry.userName}
                  />
                )}
              </div>
            </div>
          </div>

          {/* MAIN BOTTOM DIV */}
          <div className="flex items-center gap-3 justify-between">
            {/*  section on left-bottom */}
            <div className="flex flex-col items-center justify-center w-1/2 h-[250px] bg-gray-700 rounded-lg border-[2px] border-indigo-900">
              <GetHash productId={product.id} productName={product.name} />
            </div>
            {/*  section on right-bottom */}
            <div className="w-[500px] h-[200px] items-center p-10 bg-neutral-800">
              {/* <h1>Noting here</h1> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
