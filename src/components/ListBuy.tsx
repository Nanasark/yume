// import { contract } from "@/app/contract";
// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import { prepareContractCall, toWei } from "thirdweb";
// import {
//   ConnectButton,
//   TransactionButton,
//   useActiveAccount,
//   useSendTransaction,
// } from "thirdweb/react";
// import { client } from "@/app/client";
// import { amoy } from "@/app/chain";

// enum TagEnum {
//   ThreeD = "ThreeD",
//   TwoD = "TwoD",
//   Illustration = "Illustration",
//   Abstract = "Abstract",
//   Photography = "Photography",
//   Pixel = "Pixel",
// }

// type ProductInput = {
//   name: string;
//   tag: TagEnum;
//   description: string;
//   price: string;
//   stock: bigint;
//   isMaticPayment: boolean;
// };
// export default function ListBuy() {
//   const account = useActiveAccount();
//   const { mutate: sendTransaction, isPending } = useSendTransaction();

//   const [display1, setDisplay1] = useState<string>("");
//   const [display2, setDisplay2] = useState<string>("");
//   const [display3, setDisplay3] = useState<string>("");
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [selectedCover, setSelectedCover] = useState<File | null>(null);
//   const [selectedDisplay1, setselectedDisplay1] = useState<File | null>(null);
//   const [selectedDisplay2, setselectedDisplay2] = useState<File | null>(null);
//   const [selectedDisplay3, setselectedDisplay3] = useState<File | null>(null);
//   const [hash, setFileHash] = useState<string>("");
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [coverPreviewurl, setCoverPreviewUrl] = useState<string | null>(null);
//   const [display1PreviewUrl, setDisplay1PreviewUrl] = useState<string | null>(
//     null
//   );
//   const [display2PreviewUrl, setDisplay2PreviewUrl] = useState<string | null>(
//     null
//   );
//   const [display3PreviewUrl, setDisplay3PreviewUrl] = useState<string | null>(
//     null
//   );
//   const [cover, setCover] = useState<string>("");

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const selectedFile = event.target.files[0];
//       setSelectedFile(selectedFile);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const result = reader.result as string;
//         setPreviewUrl(result);
//       };
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const selectedCover = event.target.files[0];
//       setSelectedCover(selectedCover);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const result = reader.result as string;
//         setCoverPreviewUrl(result);
//       };
//       reader.readAsDataURL(selectedCover);
//     }
//   };

//   const handleDisplay1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const selectedDisplay1 = event.target.files[0];
//       setselectedDisplay1(selectedDisplay1);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const result = reader.result as string;
//         setDisplay1PreviewUrl(result);
//       };
//       reader.readAsDataURL(selectedDisplay1);
//     }
//   };

//   const handleDisplay2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const selectedDisplay2 = event.target.files[0];
//       setselectedDisplay2(selectedDisplay2);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const result = reader.result as string;
//         setDisplay2PreviewUrl(result);
//       };
//       reader.readAsDataURL(selectedDisplay2);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (previewUrl) {
//         URL.revokeObjectURL(previewUrl);
//       }
//     };
//   }, [previewUrl]);

//   const handleDisplay3Change = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const selectedDisplay3 = event.target.files[0];
//       setselectedDisplay3(selectedDisplay3);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const result = reader.result as string;
//         setDisplay3PreviewUrl(result);
//       };
//       reader.readAsDataURL(selectedDisplay3);
//     }
//   };

//   const handleFileSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
//     event?.preventDefault();
//     if (!selectedFile) return;

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     if (selectedFile) {
//       try {
//         const response = await fetch("/api/pinata/pinata", {
//           method: "POST",
//           body: formData,
//         });
//         const result = await response.json();
//         const hash = result?.data?.IpfsHash;
//         setFileHash(hash);
//         console.log(hash);
//       } catch (error) {
//         console.error(error);
//       }
//     } else {
//       console.log("file not selected");
//     }
//   };

//   const handleCoverSubmit = async (
//     event?: React.FormEvent<HTMLFormElement>
//   ) => {
//     event?.preventDefault();
//     if (!selectedCover) return;

//     const formData = new FormData();
//     formData.append("file", selectedCover);

//     try {
//       const response = await fetch("/api/pinata/pinata", {
//         method: "POST",
//         body: formData,
//       });
//       const result = await response.json();
//       const cover = result?.data?.IpfsHash;
//       setCover(cover);
//       console.log(cover);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDisplay1Submit = async (
//     event?: React.FormEvent<HTMLFormElement>
//   ) => {
//     event?.preventDefault();
//     if (!selectedDisplay1) return;

//     const formData = new FormData();
//     formData.append("file", selectedDisplay1);

//     try {
//       const response = await fetch("/api/pinata/pinata", {
//         method: "POST",
//         body: formData,
//       });
//       const result = await response.json();
//       const display1 = result?.data?.IpfsHash;
//       setDisplay1(display1);
//       console.log(display1);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDisplay2Submit = async (
//     event?: React.FormEvent<HTMLFormElement>
//   ) => {
//     event?.preventDefault();
//     if (!selectedDisplay2) return;

//     const formData = new FormData();
//     formData.append("file", selectedDisplay2);

//     try {
//       const response = await fetch("/api/pinata/pinata", {
//         method: "POST",
//         body: formData,
//       });
//       const result = await response.json();
//       const display2 = result?.data?.IpfsHash;
//       setDisplay2(display2);
//       console.log(display2);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDisplay3Submit = async (
//     event?: React.FormEvent<HTMLFormElement>
//   ) => {
//     event?.preventDefault();
//     if (!selectedDisplay3) return;

//     const formData = new FormData();
//     formData.append("file", selectedDisplay3);

//     try {
//       const response = await fetch("/api/pinata/pinata", {
//         method: "POST",
//         body: formData,
//       });
//       const result = await response.json();
//       const display3 = result?.data?.IpfsHash;
//       setDisplay3(display3);
//       console.log(display3);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleListBuy = async (data: ProductInput) => {
//     try {
//       await handleFileSubmit();
//       await handleCoverSubmit();
//       await handleDisplay1Submit();
//       await handleDisplay2Submit();
//       await handleDisplay3Submit();
//       const filehash = "ipfs://${hash}";
//       const coverhash = "ipfs://${cover}";
//       const display1hash = "ipfs://${display1}";
//       const display2hash = "ipfs://${display2}";
//       const display3hash = "ipfs://${display3}";
//       console.log("tag is", data.tag);
//       console.log("description", data.description);
//       console.log("name", data.name);
//       console.log("price:", `${data.price}`);
//       console.log("payment", data.isMaticPayment);
//       console.log(typeof data.isMaticPayment);
//       console.log("stock", data.stock);

//       const transaction = await prepareContractCall({
//         contract: contract,
//         method: "addProduct",
//         params: [
//           coverhash,
//           data.name,
//           toWei(`${data.price}`),
//           data.isMaticPayment,
//           data.tag,
//           data.description,
//           display1hash,
//           display2hash,
//           display3hash,
//           BigInt(data.stock),
//           filehash,
//         ],
//       });

//       await sendTransaction(transaction);
//     } catch (error) {
//       console.error("Failed to List Product:", error);
//     }
//   };

//   const previewsrc = previewUrl;
//   const coverpreviewsrc = coverPreviewurl;
//   const display1previewsrc = display1PreviewUrl;
//   const display2previewsrc = display2PreviewUrl;
//   const display3previewsrc = display3PreviewUrl;

//   const {
//     register: listBuy,
//     control,
//     handleSubmit: handleListBuySubmit,
//   } = useForm<ProductInput>();
//   const onSubmit: SubmitHandler<ProductInput> = (data) => console.log(data);

//   const handleListSubmission = async () => {
//     await handleListBuySubmit(handleListBuy)();
//   };

//   return (
//     <div className="flex flex-col  items-center justify-center ">
//       <form
//         onSubmit={handleListBuySubmit(onSubmit)}
//         className="flex flex-col space-y-5 text-black items-center justify-center w-[600px] bg-slate-400"
//       >
//         <input
//           className=" w-[350px] border-[2px] rounded-lg border-yellow-900"
//           placeholder="name of product"
//           {...listBuy("name", { required: true })}
//         />
//         <label>Tag Selection</label>
//         <select {...listBuy("tag", { required: true })}>
//           <option value="">Select Tag</option>
//           <option value="TwoD">2D</option>
//           <option value="TreeD">3D</option>
//           <option value="Illustration">Illustration</option>
//           <option value="Abstract"> Abstract</option>
//           <option value="Photography">Photography</option>
//           <option value="Pixel">Pixel</option>
//           <option value="other">other</option>
//         </select>
//         <textarea
//           className=" w-[350px] border-[2px] rounded-lg border-yellow-600"
//           placeholder="description"
//           {...listBuy("description", { required: true })}
//         />
//         <input
//           type="number"
//           className=" w-[350px] border-[2px] rounded-lg border-yellow-900"
//           placeholder="price"
//           {...listBuy("price", { required: true })}
//         />
//         <Controller
//           name="isMaticPayment"
//           control={control}
//           render={({ field }) => (
//             <>
//               <input
//                 type="radio"
//                 value="true"
//                 checked={field.value === true}
//                 onChange={() => field.onChange(true)}
//               />
//               <span> Matic</span>

//               <input
//                 type="radio"
//                 value="false"
//                 checked={field.value === false}
//                 onChange={() => field.onChange(false)}
//               />
//               <span>ARYM Token</span>
//             </>
//           )}
//         />

//         <input
//           className=" w-[350px] border-[2px] rounded-lg border-yellow-900"
//           placeholder="Stock"
//           type="number"
//           {...listBuy("stock", { required: true, max: 100 })}
//         />
//         <p>Upload File</p>
//         <input
//           className=" w-[350px] border-[2px] rounded-lg bg-lime-700 border-yellow-900"
//           type="file"
//           accept="image*/"
//           placeholder="Upload File"
//           onChange={handleFileChange}
//         />
//         {coverPreviewurl && (
//           <Image
//             src={`${coverpreviewsrc}`}
//             alt="Selected Image Preview"
//             width={200}
//             height={200}
//           />
//         )}
//         <input
//           className=" w-[350px] border-[2px] rounded-lg bg-lime-700 border-yellow-900"
//           type="file"
//           placeholder="Upload Cover"
//           onChange={handleCoverChange}
//         />
//         {display1PreviewUrl && (
//           <Image
//             src={`${display1previewsrc}`}
//             alt="Selected Image Preview"
//             width={200}
//             height={200}
//           />
//         )}
//         <input
//           className=" w-[350px] border-[2px] rounded-lg bg-lime-700 border-yellow-900"
//           type="file"
//           accept="image/*"
//           placeholder="Upload Image1"
//           onChange={handleDisplay1Change}
//         />
//         {display2PreviewUrl && (
//           <Image
//             src={`${display2previewsrc}`}
//             alt="Selected Image Preview"
//             width={200}
//             height={200}
//           />
//         )}
//         <input
//           className=" w-[350px] border-[2px] rounded-lg bg-lime-700 border-yellow-900"
//           type="file"
//           placeholder="Upload Image2"
//           onChange={handleDisplay2Change}
//         />
//         {display3PreviewUrl && (
//           <Image
//             src={`${display3previewsrc}`}
//             alt="Selected Image Preview"
//             width={200}
//             height={200}
//           />
//         )}
//         <input
//           className=" w-[350px] border-[2px] rounded-lg bg-lime-700 border-yellow-900"
//           type="file"
//           placeholder="Upload Image3"
//           onChange={handleDisplay3Change}
//         />
//         {account ? (
//           <input
//             type="submit"
//             value="List Product"
//             className="rounded-lg border-radius-[2px] w-[120px] bg-indigo-700 text-black "
//             onClick={() => handleListSubmission()}
//           />
//         ) : (
//           <ConnectButton client={client} chain={amoy} />
//         )}
//       </form>
//     </div>
//   );
// }

// {
//   /* <button
//         className="rounded-lg border-radius-[2px] w-[120px] bg-violet-800 text-black "
//         onClick={() => handleListSubmission()}
//       >
//         List Now
//       </button> */
// }
// // <TransactionButton
// //   transaction={(data: ProductInput) =>
// //     prepareContractCall({
// //       contract,
// //       method: "addProduct",
// //       params: [
// //         cover,
// //         data.name,
// //         toWei(data.price),
// //         data.isMaticPayment,
// //         data.tag,
// //         data.description,
// //         display1,
// //         display2,
// //         display3,
// //         data.stock,
// //         hash,
// //       ],
// //     })
// //   }
// //   onClick={() => handleListSubmission()}
// // >
// //   AddProduct
// // </TransactionButton>
// // <button
// //   className="rounded-lg border-radius-[2px] w-[120px] bg-yellow-400 text-black "
// //   onClick={() => handleFileSubmit()}
// // >  Test</button>
