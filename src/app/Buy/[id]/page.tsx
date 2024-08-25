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
import Card from "@/components/cards/Card";

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

  if (product) {
    console.log("seller:", product.seller);
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
    <div className="flex w-screen md:w-full  items-center p-2 pt-10 md:p-5 justify-center text-white bg-[#181934] h-auto">
      {product && (
        <div className="flex w-full justify-between md:top-5 relative flex-col rounded-xl gap-10  bg-[#1F2045] p-5">
          {/* MAIN TOP DIV */}
          <div className="flex w-full flex-col md:flex-row gap-10 justify-between">
            {/* first section on left-top */}
            <div className="md:w-1/2 flex flex-col gap-3">
              <div className="md:w-7/8 md:h-7/8">
                <ImageHolder
                  cover={product.cover}
                  display1={product.display1}
                  display2={product.display2}
                  display3={product.display3}
                />
              </div>
              <div className="bg-[#F9FBFF] text-[#181934] p-3 rounded-lg">
                <h1>Name: {product.name}</h1>
                <p>ID: {product.id.toString()}</p>
                <p>{product.description}</p>
                <p>
                  {price} {payment}
                </p>
              </div>
            </div>

            {/* section on right-top */}
            <div className="flex items-center justify-center w-full md:w-1/2 flex-col gap-5">
              <div className="w-full flex flex-col items-center justify-center">
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
          <div className="flex flex-col md:flex-row items-center gap-10 justify-between">
            {/*  section on left-bottom */}
            <Card className="h-[203px] lg:h-[400px]">
              <div className="flex flex-col items-center justify-center w-1/2 h-[250px] bg-gray-700 rounded-lg border-[2px] border-indigo-900">
                <GetHash productId={product.id} productName={product.name} />
              </div>
            </Card>

            {/*  section on right-bottom */}
            <div className="w-full h-[400px] items-center bg-[#F9FBFF] p-1 text-[#181934] rounded-[11px]">
              <h1 className="text-[1rem] font-bold">Product Details</h1>
              {/* Insert relevant content here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
