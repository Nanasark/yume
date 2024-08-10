import { auctioncontract } from "@/app/contract";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { prepareContractCall, toWei } from "thirdweb";
import { PreparedTransaction } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { inter } from "@/helpers/fonts";
import {
  ConnectButton,
  useActiveAccount,
  useSendTransaction,
} from "thirdweb/react";
import { client } from "@/app/client";
import { amoy } from "@/app/chain";
import AuctionModal from "@/modals/AuctionModal";
import { useOpenAuction } from "@/helpers/AuctionContext";
import { Roboto, Goblin_One } from "next/font/google";
import { ErrorHandler, ErrorAlert } from "@/components/error/error";
import SuccessHandler from "@/components/success/success";
import toast from "react-hot-toast";

type AuctionInput = {
  name: string;
  description: string;
  startPrice: bigint;
  days: bigint; // Use string to handle datetime-local input
};

export default function ListAuction() {
  const { isOpenAuction, setIsOpenAuction } = useOpenAuction();
  const account = useActiveAccount();
  const {
    mutate: sendTransaction,
    isPending,
    isError,
    isSuccess,
    error: errror,
  } = useSendTransaction();

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

  const handleListAuction = async (data: AuctionInput) => {
    try {
      const toastId1 = toast.loading("Listing, wait a minute...");
      const filehash = await uploadFileToIPFS(selectedFile);

      // Dismiss the first toast and show the second one
      toast.dismiss(toastId1);
      const toastId2 = toast.loading("Listing, wait a minute...");
      const coverhash = await uploadFileToIPFS(selectedCover);

      // Dismiss the second toast and show the third one
      toast.dismiss(toastId2);
      const toastId3 = toast.loading("Listing ...");
      const display1hash = await uploadFileToIPFS(selectedDisplay1);

      // Dismiss the third toast and show the fourth one
      toast.dismiss(toastId3);
      const toastId4 = toast.loading("Listing ...");
      const display2hash = await uploadFileToIPFS(selectedDisplay2);

      // Dismiss the fourth toast and show the fifth one
      toast.dismiss(toastId4);
      const toastId5 = toast.loading("Listing ...");
      const display3hash = await uploadFileToIPFS(selectedDisplay3);

      // Dismiss the fifth toast and show the final toast
      toast.dismiss(toastId5);
      const toastId6 = toast.loading("Transaction begun ...");

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

      // Convert to Unix timestamp in seconds

      const transaction = (await prepareContractCall({
        contract: auctioncontract,
        method: "createAuction",
        params: [
          data.name,
          data.description,
          toWei(`${data.startPrice}`),
          BigInt(data.days),
          filehash,
          coverhash,
          display1hash,
          display2hash,
          display3hash,
        ],
      })) as PreparedTransaction;

      toast.dismiss(toastId6);
      await sendTransaction(transaction);
    } catch (error) {
      ErrorAlert(error);
      ErrorHandler(error);
    }
  };

  const { register: listAuction, handleSubmit: handleListAuctionSubmit } =
    useForm<AuctionInput>();
  const onSubmit: SubmitHandler<AuctionInput> = (data) => console.log(data);

  const handleAuctionSubmission = async () => {
    await handleListAuctionSubmit(handleListAuction)();
  };

  return (
    <div
      className={`${inter.className} h-full font-thin flex flex-col items-center drop-shadow-lg justify-center p-2 lg:p-14 w-full bg-[#1F2045] rounded-xl`}
    >
      {" "}
      <form
        onSubmit={handleListAuctionSubmit(onSubmit)}
        className="relative flex flex-col space-y-10 items-center text-white  w-full "
      >
        <div className="flex w-full items-start flex-col gap-2">
          <label>Name</label>
          <div className="borderGradient flex  w-full p-[1px] h-[42px] rounded-[11px] justify-center items-center">
            <input
              className=" w-full pl-5 rounded-[10px] h-[40px] bg-[#1F2045] "
              {...listAuction("name", { required: true })}
            />
          </div>
        </div>

        <div className=" flex  w-full items-start flex-col gap-2">
          {" "}
          <label>Description</label>
          <div className="borderGradient flex  w-full p-[1px] h-[117px] rounded-[11px] justify-center items-center">
            <textarea
              className=" pl-5 rounded-[10px] w-full h-[115px] bg-[#1F2045]"
              // placeholder="description"

              {...listAuction("description", { required: true })}
            />
          </div>
        </div>
        <div className="flex w-full items-start flex-col gap-2">
          <label>Start Price (in ARYM)</label>
          <div className="borderGradient flex  w-full p-[1px] h-[42px] rounded-[11px] justify-center items-center">
            <input
              type="number"
              className="text-black w-full p-2 items-center h-[40px] rounded-[10px]  bg-[#1F2045] "
              {...listAuction("startPrice", { required: true, min: 0.0001 })}
            />
          </div>
        </div>
        <div className="flex w-full items-start flex-col gap-2">
          <label>Duration in Days </label>
          <div className="borderGradient flex w-full p-[1px] h-[42px] rounded-[11px] justify-center items-center">
            <input
              type="number"
              className="w-full  p-2 items-center h-[40px] bg-[#1F2045]  rounded-[10px] "
              placeholder=""
              {...listAuction("days", { required: true, max: 120 })}
            />
          </div>
        </div>

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
          Success="Listed for Auction successfully!"
          Error={`${errror?.name
            .replace(/contract:\s*[\S]+/g, "")
            .replace(/chainId:\s*\d+/g, "")
            .trim()}`}
        />

        {account ? (
          <input
            type="submit"
            value="List Auction"
            className=" cursor-pointer rounded-lg border-radius-[2px] w-[120px] bg-indigo-700 text-black"
            onClick={() => handleAuctionSubmission()}
            onLoad={() => {
              return "Loading";
            }}
          />
        ) : (
          <ConnectButton client={client} chain={amoy} />
        )}
      </form>
    </div>
  );
}
