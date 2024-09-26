import { useReadContract } from "thirdweb/react";
import { contract } from "@/app/contract";
import { useActiveAccount } from "thirdweb/react";
import FileDownload from "./download";

type Product = {
  productId: bigint;
  productName: string;
};

export default function GetHash({ productId, productName }: Product) {
  const account = useActiveAccount();
  const address = account ? account.address : "";

  const { data: showHash, isLoading } = useReadContract({
    contract,
    method: "getProductHash",
    params: [productId, address as `0x${string}` ],
  });
  console.log("showHash", showHash);
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
     
      {showHash ? (
        <FileDownload uri={`ipfs://${showHash}`} name={productName} />
      ) : (
        <p>Not purchased. Buy to download</p>
      )}
    </div>
  );
}
