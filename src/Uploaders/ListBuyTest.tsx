"use client";
import { contract, registryContract } from "@/app/contract";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { prepareContractCall, toWei } from "thirdweb";
import { PreparedTransaction } from "thirdweb";
import {
  ConnectButton,
  useActiveAccount,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";
import { client } from "@/app/client";
import { amoy } from "@/app/chain";
import AuctionModal from "../modals/AuctionModal";
import { useOpenAuction } from "@/helpers/AuctionContext";
import { inter } from "@/helpers/fonts";
import SuccessHandler from "@/components/success/success";
import toast from "react-hot-toast";
import { ErrorAlert, ErrorHandler } from "@/components/error/error";
import usePinataUpload from "@/helpers/usePinataUpload";
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

  const { uploadFile, uploadStatus, isUploading } = usePinataUpload();
  const account = useActiveAccount();
  const {
    mutate: sendTransaction,
    isPending,
    isError,
    isSuccess,
    error: errror,
  } = useSendTransaction();

  const { data: isRegistered } = useReadContract({
    contract: registryContract,
    method: "isRegistered",
    params: [account?.address as `0x${string}`],
  });

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

    try {
      const result = await uploadFile(file);

      return result?.IpfsHash;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  // const uploadFileToIPFS = async (file: File | null) => {
  //   if (!file) return null;

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const response = await fetch("/api/pinata/pinata", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const result = await response.json();
  //     return result?.data?.IpfsHash;
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     return null;
  //   }
  // };

  const handleListBuy = async (data: ProductInput) => {
    if (isRegistered) {
      try {
        const toastId1 = toast.loading("Listing, wait a minute...");
        const filehash = await uploadFileToIPFS(selectedFile);

        toast.dismiss(toastId1);
        const toastId2 = toast.loading("Listing, wait a minute...");
        const coverhash = await uploadFileToIPFS(selectedCover);

        toast.dismiss(toastId2);
        const toastId3 = toast.loading("Listing ...");
        const display1hash = await uploadFileToIPFS(selectedDisplay1);

        toast.dismiss(toastId3);
        const toastId4 = toast.loading("Listing ...");
        const display2hash = await uploadFileToIPFS(selectedDisplay2);

        toast.dismiss(toastId4);
        const toastId5 = toast.loading("Listing ...");
        const display3hash = await uploadFileToIPFS(selectedDisplay3);

        toast.dismiss(toastId5);
        if (
          !filehash ||
          !coverhash ||
          !display1hash ||
          !display2hash ||
          !display3hash
        ) {
          toast.error(
            "File Upload failed, please try again. contact support if it persists"
          );
          console.error("Error: Some files are missing.");
          return;
        }
        const toastId6 = toast.loading("Transaction begun ...");

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

        toast.dismiss(toastId6);
        await sendTransaction(transaction);
      } catch (error) {
        ErrorAlert(error);
        ErrorHandler(error);
      }
    } else {
      toast("User Not Registered, Please Complete KYC", {
        className: "text-center border-orange-700",
        icon: "⛔",
      });
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
      className={`${inter.className} h-full font-thin flex flex-col gap-5 items-center drop-shadow-lg justify-center p-2 lg:p-14 w-full bg-[#1F2045] rounded-xl`}
    >
      <h1 className="mt-[-5px] text-[16px] lg:text-[2rem] font-semibold">
        You are currently Listing for Direct Sale
      </h1>
      <form
        onSubmit={handleListBuySubmit(onSubmit)}
        className=" relative flex flex-col space-y-10 items-center text-white  w-full "
      >
        <div className="w-full flex md:flex-row flex-col gap-3 justify-between ">
          <div className="w-full">
            {" "}
            <label>Product Name</label>
            <div className="borderGradient flex  w-full h-[37px] p-[1px] rounded-[11px] justify-center items-center">
              <input
                className="pl-5 text-white w-full h-full bg-[#1F2045]  rounded-[10px]"
                type="text"
                {...listBuy("name", { required: true })}
              />
            </div>
          </div>
          <div className="w-full">
            <label>Price</label>
            <div className="borderGradient flex w-full h-[37px] p-[1px] rounded-[11px] justify-center items-center">
              <input
                className=" flex items-center justify-center w-full h-full pl-2 rounded-[10px] bg-[#1F2045] "
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
          <div className="borderGradient flex p-[1px] w-full h-[117px] rounded-[11px] justify-center items-center">
            <textarea
              className="pl-2 md:pl-5 rounded-[10px] w-full h-full bg-[#1F2045]"
              // placeholder="description"

              {...listBuy("description", { required: true })}
            />
          </div>
        </div>

        <div className="w-full flex md:flex-row flex-col gap-5">
          <div className=" flex flex-col md:w-1/2 w-full gap-2">
            <label>Category</label>
            <div className="borderGradient flex  w-full p-[1px] h-[37px] rounded-[11px] justify-center items-center">
              <select
                className=" bg-[#1F2045] h-full w-full rounded-[10px]"
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
          <div className="flex flex-col md:w-1/2 w-full gap-2">
            <label>Stock amount</label>
            <div className="borderGradient flex p-[1px]  w-full h-[37px] rounded-[11px] justify-center items-center">
              {" "}
              <input
                className=" pl-2 w-full h-full rounded-[10px] bg-[#1F2045]"
                placeholder="0"
                type="number"
                {...listBuy("stock", { required: true, max: 100 })}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between gap-5">
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
          </div>
          {/* <div className="z-30 w-full">
            {" "}
           
          </div> */}
        </div>

        <div
          className={`${
            isOpenAuction ? "visible" : "hidden"
          } flex flex-col justify-center w-full relative  gap-5 pt-5 md:absolute items-center bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100`}
        >
          <div>
            {" "}
            <button
              className="rounded-lg w-[80px] h-[40px] bg-violet-900 ring ring-gray-800"
              onClick={() => setIsOpenAuction(false)}
            >
              Done
            </button>
          </div>
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

        <SuccessHandler
          isPending={isPending}
          isSuccess={isSuccess}
          isError={isError}
          Pending="Transaction is in progress..."
          Success="Listed for Buy successfully!"
          Error={`${errror?.name
            .replace(/contract:\s*[\S]+/g, "")
            .replace(/chainId:\s*\d+/g, "")
            .trim()}`}
        />

        <div>
          {account ? (
            <button
              type="submit"
              className="buttonbg rounded-[10px] h-[47px] w-[148px]"
              onClick={() => handleListSubmission()}
              onLoad={() => {
                return "Loading";
              }}
            >
              {/* <input
                type="submit"
                value="List Product"
                className="buttonbg hover:cursor-auto rounded-[10px] h-[47px] w-[148px]"
                onClick={() => handleListSubmission()}
                onLoad={() => {
                  return "Loading";
                }}
              /> */}
              List Product
            </button>
          ) : (
            <ConnectButton client={client} chain={amoy} />
          )}
        </div>
      </form>
    </div>
  );
}
