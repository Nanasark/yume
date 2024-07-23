import { auctioncontract } from "@/app/contract";
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
import AuctionModal from "@/modals/AuctionModal";
import { useOpenAuction } from "@/helpers/AuctionContext";
import { Roboto, Goblin_One } from "next/font/google";
import { ErrorHandler, ErrorAlert } from "@/components/error/error";

type AuctionInput = {
  name: string;
  description: string;
  startPrice: bigint;
  days: bigint; // Use string to handle datetime-local input
};

export default function ListAuction() {
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

  const handleListAuction = async (data: AuctionInput) => {
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

      await sendTransaction(transaction);
    } catch (error) {
      ErrorHandler(error);
      ErrorAlert(error);
    }
  };

  const { register: listAuction, handleSubmit: handleListAuctionSubmit } =
    useForm<AuctionInput>();
  const onSubmit: SubmitHandler<AuctionInput> = (data) => console.log(data);

  const handleAuctionSubmission = async () => {
    await handleListAuctionSubmit(handleListAuction)();
  };

  return (
    <div className="flex flex-col items-center border-[2px] justify-center p-5 w-[800px] border-purple-800 rounded-xl">
      <form
        onSubmit={handleListAuctionSubmit(onSubmit)}
        className="flex mt-10 flex-col space-y-5 text-white items-center justify-center w-[600px]"
      >
        <label>Name:</label>
        <input
          className="text-black w-[350px] p-2 items-center h-[40px] ring ring-purple-900 bg-white rounded-lg "
          placeholder="name of product"
          {...listAuction("name", { required: true })}
        />

        <label>Description:</label>
        <input
          className="text-black w-[350px] p-2 items-center h-[40px] ring ring-purple-900 bg-white rounded-lg "
          placeholder="name of product"
          {...listAuction("description", { required: true })}
        />

        <label>Start Price (in ARYM)</label>
        <input
          type="number"
          className="text-black w-[350px] p-2 items-center h-[40px] ring ring-purple-900 bg-white rounded-lg "
          placeholder="start price"
          {...listAuction("startPrice", { required: true, min: 0.0001 })}
        />
        <label>Duration in Days </label>
        <input
          type="number"
          className="text-black w-[350px] p-2 items-center h-[40px] ring ring-purple-900 bg-white rounded-lg "
          placeholder="duration in Days"
          {...listAuction("days", { required: true, max: 120 })}
        />

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
