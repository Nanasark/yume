"use client";
import { contract } from "@/app/contract";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { prepareContractCall, toWei } from "thirdweb";
import { PreparedTransaction } from "thirdweb";
import {
  ConnectButton,
  useActiveAccount,
  useSendTransaction,
} from "thirdweb/react";
import { client } from "@/app/client";
import { amoy } from "@/app/chain";
import AuctionModal from "../modals/AuctionModal";
import { useOpenAuction } from "@/helpers/AuctionContext";
import { inter } from "@/helpers/fonts";
enum TagEnum {
  ThreeD = "ThreeD",
  TwoD = "TwoD",
  Illustration = "Illustration",
  Abstract = "Abstract",
  Photography = "Photography",
  Pixel = "Pixel",
}

type ProductInput = {
  name: string;
  tag: TagEnum;
  description: string;
  price: string;
  stock: bigint;
  isMaticPayment: boolean;
};
export default function ListBuy() {
  const { isOpenAuction, setIsOpenAuction } = useOpenAuction();
  const account = useActiveAccount();
  const { mutate: sendTransaction, isPending } = useSendTransaction();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const [selectedDisplay1, setselectedDisplay1] = useState<File | null>(null);
  const [selectedDisplay2, setselectedDisplay2] = useState<File | null>(null);
  const [selectedDisplay3, setselectedDisplay3] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [display1PreviewUrl, setDisplay1PreviewUrl] = useState<string | null>(
    null
  );
  const [display2PreviewUrl, setDisplay2PreviewUrl] = useState<string | null>(
    null
  );
  const [display3PreviewUrl, setDisplay3PreviewUrl] = useState<string | null>(
    null
  );

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFileToIPFS = async (file: File | null) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/pinata/pinata", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      return result?.data?.IpfsHash;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleListBuy = async (data: ProductInput) => {
    try {
      const filehash = await uploadFileToIPFS(selectedFile);
      const coverhash = await uploadFileToIPFS(selectedCover);
      const display1hash = await uploadFileToIPFS(selectedDisplay1);
      const display2hash = await uploadFileToIPFS(selectedDisplay2);
      const display3hash = await uploadFileToIPFS(selectedDisplay3);

      console.log("filehash:", filehash);
      console.log("coverhash:", coverhash);
      console.log("display1hash:", display1hash);
      console.log("display2hash:", display2hash);
      console.log("display3hash:", display3hash);

      if (
        !filehash ||
        !coverhash ||
        !display1hash ||
        !display2hash ||
        !display3hash
      ) {
        console.error("Error: Some IPFS hashes are missing.");
        return;
      }

      const transaction = (await prepareContractCall({
        contract: contract,
        method: "addProduct",
        params: [
          coverhash,
          data.name,
          toWei(`${data.price}`),
          data.isMaticPayment,
          data.tag,
          data.description,
          display1hash,
          display2hash,
          display3hash,
          BigInt(data.stock),
          filehash,
        ],
      })) as PreparedTransaction;

      await sendTransaction(transaction);
    } catch (error) {
      console.error("Failed to List Product:", error);
    }
  };

  const {
    register: listBuy,
    control,
    handleSubmit: handleListBuySubmit,
  } = useForm<ProductInput>();
  const onSubmit: SubmitHandler<ProductInput> = (data) => console.log(data);

  const handleListSubmission = async () => {
    await handleListBuySubmit(handleListBuy)();
  };

  return (
    <div
      className={`${inter.className} font-thin flex flex-col items-center drop-shadow-lg justify-center p-14 w-[800px] bg-[#1F2045] rounded-xl`}
    >
      <form
        onSubmit={handleListBuySubmit(onSubmit)}
        className=" relative flex flex-col  space-y-10  text-white  w-full "
      >
        <div className="w-full flex justify-between ">
          <div className="">
            {" "}
            <label>Product Name</label>
            <div className="borderGradient flex  w-[402px] h-[37px] rounded-[11px] justify-center items-center">
              <input
                className="pl-5 text-white w-[400px] bg-[#1F2045] h-[35px] rounded-[10px]"
                type="text"
                {...listBuy("name", { required: true })}
              />
            </div>
          </div>
          <div>
            <label>Price</label>
            <div className="borderGradient flex  w-[202px] h-[37px] rounded-[11px] justify-center items-center">
              <input
                className=" flex items-center justify-center w-[200px] pl-2 rounded-[10px] h-[35px] bg-[#1F2045] "
                {...listBuy("price", { required: true, min: 0.0001 })}
                placeholder="0"
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex  flex-col gap-2">
          {" "}
          <label>Description</label>
          <div className="borderGradient flex  w-full h-[117px] rounded-[11px] justify-center items-center">
            <textarea
              className=" pl-5 rounded-[10px] w-[684px] h-[115px] bg-[#1F2045]"
              // placeholder="description"

              {...listBuy("description", { required: true })}
            />
          </div>
        </div>

        <div className="w-full flex gap-5">
          <div className=" flex flex-col gap-2">
            <label>Category</label>
            <div className="borderGradient flex  w-[352px] h-[37px] rounded-[11px] justify-center items-center">
              <select
                className="w-[350px] bg-[#1F2045] h-[35px] rounded-[10px]"
                {...listBuy("tag", { required: true })}
              >
                <option value="">Select Tag</option>
                <option value="TwoD">2D</option>
                <option value="TreeD">3D</option>
                <option value="Illustration">Illustration</option>
                <option value="Abstract"> Abstract</option>
                <option value="Photography">Photography</option>
                <option value="Pixel">Pixel</option>
                <option value="other">other</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label>Stock amount</label>
            <div className="borderGradient flex  w-[302px] h-[37px] rounded-[11px] justify-center items-center">
              {" "}
              <input
                className=" pl-2 w-[300px] h-[35px] rounded-[10px] bg-[#1F2045]"
                placeholder="0"
                type="number"
                {...listBuy("stock", { required: true, max: 100 })}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between gap-5">
          <div>
            {" "}
            <label>Payment Option</label>
            <div>
              {" "}
              <Controller
                name="isMaticPayment"
                control={control}
                render={({ field }) => (
                  <div className="flex space-x-5">
                    <input
                      type="radio"
                      value="true"
                      checked={field.value === true}
                      onChange={() => field.onChange(true)}
                    />
                    <span> Matic</span>

                    <input
                      className="appearance-none"
                      type="radio"
                      value="false"
                      checked={field.value === false}
                      onChange={() => field.onChange(false)}
                    />
                    <span>ARYM Token</span>
                  </div>
                )}
              />
            </div>
          </div>
          <div>
            {" "}
            <button
              className="bg-purple-900 rounded-xl w-[250px] h-[50px] ring ring-red-600 text-[16px] font-semibold"
              onClick={() => setIsOpenAuction(true)}
            >
              {" "}
              Upload Files
            </button>
            <div
              className={`${
                isOpenAuction ? "visible" : "hidden"
              } flex flex-col justify-center gap-10 absolute left-2/5 bottom-1/4 right-1/4 top-1/4 z-10 items-center h-5/6 w-4/6 bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100`}
            >
              <button
                className="rounded-lg w-[80px] h-[40px] bg-violet-900 ring ring-gray-800"
                onClick={() => setIsOpenAuction(false)}
              >
                Done
              </button>
              <AuctionModal
                coverPreviewUrl={coverPreviewUrl}
                display1PreviewUrl={display1PreviewUrl}
                display2PreviewUrl={display2PreviewUrl}
                display3PreviewUrl={display3PreviewUrl}
                setDisplay2PreviewUrl={setDisplay2PreviewUrl}
                handleFileChange={handleFileChange}
                setselectedDisplay2={setselectedDisplay2}
                setselectedDisplay3={setselectedDisplay3}
                setselectedDisplay1={setselectedDisplay1}
                selectedFile={selectedFile}
                setCoverPreviewUrl={setCoverPreviewUrl}
                setSelectedCover={setSelectedCover}
                setDisplay3PreviewUrl={setDisplay3PreviewUrl}
                setDisplay1PreviewUrl={setDisplay1PreviewUrl}
                setPreviewUrl={setPreviewUrl}
                setSelectedFile={setSelectedFile}
              />
            </div>
          </div>
        </div>

        <div>
          {account ? (
            <input
              type="submit"
              value="List Product"
              className="rounded-lg border-radius-[2px] w-[120px] bg-indigo-700 text-black "
              onClick={() => handleListSubmission()}
              onLoad={() => {
                return "Loading";
              }}
            />
          ) : (
            <ConnectButton client={client} chain={amoy} />
          )}
        </div>
      </form>
    </div>
  );
}
