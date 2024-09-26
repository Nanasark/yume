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
import SellerSection from "@/components/AuctionDetail";
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
            </div>

            {/* section on right-top */}
            <div className="flex items-center justify-center w-full md:w-1/2 flex-col gap-5">
              <Card className="h-[203px] lg:h-[200px]">
                <div className="flex flex-col items-center justify-center w-1/2 h-[120px]">
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
                  <GetHash productId={product.id} productName={product.name} />
                </div>
              </Card>
              <div className="w-full">
                {registry && (
                  <SellerSection
                    image={registry.profileImage}
                    userName={registry.userName}
                    productName={product.name}
                    productId={product.id}
                  />
                )}
              </div>
            </div>
          </div>

          {/* MAIN BOTTOM DIV */}
        </div>
      )}
    </div>
  );
}
