"use client";
import { registryContract } from "@/app/contract";
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
import { poppins } from "@/helpers/fonts";
import { ErrorAlert, ErrorHandler } from "@/components/error/error";

type RegitryInput = {
  firstName: string;
  secondName: string;
  email: string;
  userName: string;
  socialLink: string;
  Bio: string;
  profileImage: string; // Use string to handle datetime-local input
};

export default function Registry() {
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  const [selectedProfile, setSelectedProfile] = useState<File | null>(null);
  const [profilePreviewUrl, setProfilePreviewUrl] = useState<string | null>(
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

  const handleListAuction = async (data: RegitryInput) => {
    try {
      const profilehash = await uploadFileToIPFS(selectedProfile);

      console.log("filehash:", profilehash);

      if (!profilehash) {
        console.error("Error: Some IPFS hashes are missing.");
        return;
      }

      const transaction = (await prepareContractCall({
        contract: registryContract,
        method: "register",
        params: [
          data.firstName,
          data.secondName,
          data.userName,
          data.email,
          data.Bio,
          data.socialLink,
          profilehash,
        ],
      })) as PreparedTransaction;

      await sendTransaction(transaction);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const {
    register: listAuction,
    control,
    handleSubmit: handleListAuctionSubmit,
  } = useForm<RegitryInput>();
  const onSubmit: SubmitHandler<RegitryInput> = (data) => console.log(data);

  const handleAuctionSubmission = async () => {
    await handleListAuctionSubmit(handleListAuction)();
  };

  return (
    <div
      className={`${poppins.className} flex text-[16px] relative bg-slate-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-15 backdrop-saturate-100 backdrop-contrast-75 flex-col items-center h-full p-10  rounded-xl`}
    >
      <form
        onSubmit={handleListAuctionSubmit(onSubmit)}
        className="relative flex flex-col mt-10  gap-5 text-white  justify-center "
      >
        <div className="flex gap-5 items-center justify-center w-[350px] h-[80px]  ">
          <div className="relative">
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer">
              <div className="text-center">
                <p>Drag and Drop or </p>
                <p className="text-purple-700 cursor-pointer">select</p>
              </div>
              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                onChange={(e) =>
                  handleFileChange(e, setProfilePreviewUrl, setSelectedProfile)
                }
              />
            </div>
          </div>
          {profilePreviewUrl && (
            <Image
              className=" w-[100px] h-[100px] rounded-full"
              src={profilePreviewUrl}
              alt="Selected Image Preview"
              width={100}
              height={100}
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label> FirstName:</label>
            <div className="flex items-center justify-center w-[353px] h-[43px] rounded-xl bg-gradient-to-l from-purple-500 via-fuchsia-600 to-pink-700">
              <input
                className="text-black w-[350px] p-2 items-center h-[40px]  bg-white rounded-lg "
                placeholder="name of product"
                {...listAuction("firstName", { required: true })}
              />
            </div>

            <div className="flex flex-col">
              <label> Second Name:</label>
              <input
                className="text-black w-[350px] p-2 items-center h-[40px] ring ring-purple-900 bg-white rounded-lg "
                placeholder="name of product"
                {...listAuction("secondName", { required: true })}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label> Email:</label>
            <input
              className="text-black w-[350px] p-2 items-center h-[40px] ring ring-purple-900 bg-white rounded-lg "
              placeholder="name of product"
              {...listAuction("email", { required: true })}
              type="email"
            />
          </div>

          <div className="flex flex-col">
            <label> User Name:</label>
            <input
              className="text-black w-[350px] p-2 items-center h-[40px] ring ring-purple-900 bg-white rounded-lg "
              placeholder="name of product"
              {...listAuction("userName", { required: true })}
            />
          </div>

          <div className="flex flex-col">
            <label>Social Link</label>
            <input
              className="text-black w-[350px] p-2 items-center h-[40px] ring ring-purple-900 bg-white rounded-lg "
              placeholder="start price"
              {...listAuction("socialLink", { required: true, min: 0.0001 })}
            />
          </div>

          <div className="flex flex-col">
            <label>Bio:</label>
            <textarea
              className="text-black w-[350px] items-start p-2 h-[100px] ring ring-purple-900 bg-white rounded-lg "
              placeholder="name of product"
              {...listAuction("Bio", { required: true })}
            />
          </div>
        </div>

        <div className="flex  flex-col gap-5 w-[400px] items-center justify-center rounded-lg">
          {/* <div className="flex gap-5 items-center justify-center w-[350px] h-[80px]  ">
            <div className="relative">
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer">
                <div className="text-center">
                  <p>Drag and Drop or </p>
                  <p className="text-purple-700 cursor-pointer">select</p>
                </div>
                <input
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  type="file"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      setProfilePreviewUrl,
                      setSelectedProfile
                    )
                  }
                />
              </div>
            </div>
            {profilePreviewUrl && (
              <Image
                className=" w-[80px] h-[80px] rounded-full"
                src={profilePreviewUrl}
                alt="Selected Image Preview"
                width={100}
                height={100}
              />
            )}
          </div> */}

          <div>
            {account ? (
              <input
                type="submit"
                value="Register"
                className="rounded-lg hover:cursor-pointer w-[120px] bg-white h-[40px] text-black"
                onClick={() => handleAuctionSubmission()}
                onLoad={() => {
                  return "Loading";
                }}
              />
            ) : (
              <ConnectButton client={client} chain={amoy} />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}