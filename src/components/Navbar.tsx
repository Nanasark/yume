"use client";

import { ConnectButton, useActiveAccount } from "thirdweb/react";
import Link from "next/link";
import SignInButton from "./buttoncomponents/SignInButton";
import { inter } from "@/helpers/fonts";
import { inknut_antiqua } from "@/helpers/fonts";

export default function Navbar() {
  const account = useActiveAccount();

  const address = account?.address;
  const addresses = ["0x1559572a045F8ec085FbAc8A80B399D23Ecfd01a", "", ""];
  const hover =
    "hover:border-b-indigo-900 hover:opacity-100 hover:border-b-2 opacity-80";

  return (
    <div
      className={`${inter.className} flex w-full h-[70px] items-center text-center pr-10 p-5 justify-between space-x-5 bg-[#181934] text-white fixed z-20 drop-shadow-[0_35px_35px_rgba(0,0,0,0.45)]`}
    >
      <div
        className={`${inknut_antiqua.className} relative font-black text-white text-[40px]`}
      >
        <h1>ARTYUME</h1>
      </div>
      <div className="flex gap-5">
        <Link href={"/"}>
          {" "}
          <div className={`${hover} relative`}>
            <p className="">Home</p>
          </div>
        </Link>

        <Link href={"/Register"}>
          {" "}
          <div className={`${hover} relative`}>
            <p className="">Register</p>
          </div>
        </Link>

        <Link href={"/Buy"}>
          {" "}
          <div className={`${hover} relative`}>
            <p className="">Direct-Buys</p>
          </div>
        </Link>

        <Link href={"/Auction"}>
          {" "}
          <div className={`${hover} relative`}>
            <p className="">Auctions</p>
          </div>
        </Link>

        <Link href={"/Sell"}>
          {" "}
          <div className={`${hover} relative`}>
            <p className="">Sell</p>
          </div>
        </Link>

        <Link href={"/Tools"}>
          {" "}
          <div className={`${hover} relative`}>
            <p className="">Tools</p>
          </div>
        </Link>
        <div>
          {account && (
            <div className="flex space-x-9">
              <div>
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
