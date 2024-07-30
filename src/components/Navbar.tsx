"use client";

import { ConnectButton, useActiveAccount } from "thirdweb/react";
import Link from "next/link";
import SignInButton from "./buttoncomponents/SignInButton";
import { inter } from "@/helpers/fonts";
import { inknut_antiqua } from "@/helpers/fonts";
import { useState } from "react";
import { registryContract } from "@/app/contract";
import { readContract } from "thirdweb";

export default function Navbar() {
  const [active, setActive] = useState(1);

  const account = useActiveAccount();

  const address = account?.address ? account.address : "";
  const registered = readContract({
    contract: registryContract,
    method: "checkRegistered",
    params: [address],
  });
  const addresses = ["0x1559572a045F8ec085FbAc8A80B399D23Ecfd01a", "", ""];
  const hover =
    "hover:border-b-indigo-900 hover:drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] hover:opacity-90 hover:border-b-2 ";

  return (
    <div
      className={`${inter.className} flex w-full h-[70px] items-center text-center pr-10 p-5 justify-between space-x-5 bg-[#181934] text-white fixed z-50 drop-shadow-[0_35px_35px_rgba(0,0,0,0.45)]`}
    >
      <div
        className={`${inknut_antiqua.className} relative font-black text-white text-[40px]`}
      >
        <h1>ARTYUME</h1>
      </div>
      <div className="flex gap-5">
        <div onClick={() => setActive(1)}>
          {" "}
          <Link href={"/"}>
            {" "}
            <div
              className={`${hover} ${
                active == 1 ? "opacity-100" : "opacity-70"
              } relative`}
            >
              <p className="">Home</p>
            </div>
          </Link>
        </div>
        <div onClick={() => setActive(2)}>
          <Link href={"/Buy"}>
            {" "}
            <div
              className={`${hover} ${
                active == 2 ? "opacity-100" : "opacity-70"
              } relative`}
            >
              <p className="">Direct-Buys</p>
            </div>
          </Link>
        </div>
        <div onClick={() => setActive(3)}>
          {" "}
          <Link href={"/Auction"}>
            {" "}
            <div
              className={`${hover} ${
                active == 3 ? "opacity-100" : "opacity-70"
              } relative`}
            >
              <p className="">Auctions</p>
            </div>
          </Link>
        </div>
        <div onClick={() => setActive(4)}>
          <Link href={"/Sell"}>
            {" "}
            <div
              className={`${hover} ${
                active == 4 ? "opacity-100" : "opacity-70"
              } relative`}
            >
              <p className="">Sell</p>
            </div>
          </Link>
        </div>
        <div onClick={() => setActive(5)}>
          <Link href={"/Tools"}>
            {" "}
            <div
              className={`${hover} ${
                active == 5 ? "opacity-100" : "opacity-70"
              } relative`}
            >
              <p className="">Tools</p>
            </div>
          </Link>
        </div>

        <div>
          {account && (
            <div className="flex space-x-9">
              <div className=" flex space-x-9">
                <Link href={"/Register"}>
                  {" "}
                  <div className={`${hover} relative`}>
                    <p className="">KYC</p>
                  </div>
                </Link>

                <Link href={"/Profile"}>
                  {" "}
                  <div className={`${hover} relative`}>
                    <p className="">Profile</p>
                  </div>
                </Link>
              </div>

              <div>
                {" "}
                {account.address.slice(0, 5)}...{account.address.slice(6, 9)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative ">
        <div className="relative  ">
          <SignInButton />
        </div>
      </div>
    </div>
  );
}

// {
//   address ? (
//     <div>
//       {addresses.map((theAddress, index) => {
//         if (theAddress === address) {
//           return (
//             <div key={index}>
//               <Link href={"/AdminPanel"}>
//                 {" "}
//                 <div className={`${hover} relative`}>
//                   <p className="">Admin</p>
//                 </div>
//               </Link>
//             </div>
//           );
//         }

//         return null;
//       })}
//     </div>
//   ) : (
//     <div className="relative h-[30px] bottom-3 ">
//       <SignInButton />
//     </div>
//   );
// }
