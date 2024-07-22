"use client";

import { ConnectButton, useActiveAccount } from "thirdweb/react";
import Link from "next/link";
import SignInButton from "./buttoncomponents/SignInButton";

export default function Navbar() {
  const account = useActiveAccount();

  const address = account?.address;
  const addresses = ["0x1559572a045F8ec085FbAc8A80B399D23Ecfd01a", "", ""];

  return (
    <div className="flex w-full h-[50px] p-5 justify-center space-x-10 bg-white  ">
      <Link href={"/"}>
        {" "}
        <div className="relative text-blue-800">
          <p className="text-blue-800">Home</p>
        </div>
      </Link>

      <Link href={"/Register"}>
        {" "}
        <div className="relative text-blue-800">
          <p className="text-blue-800">Register</p>
        </div>
      </Link>

      <Link href={"/Buy"}>
        {" "}
        <div className="relative text-blue-800">
          <p className="text-blue-800">Direct-Buys</p>
        </div>
      </Link>

      <Link href={"/Auction"}>
        {" "}
        <div className="relative text-blue-800">
          <p className="text-blue-800">Auctions</p>
        </div>
      </Link>

      <Link href={"/Sell"}>
        {" "}
        <div className="relative text-blue-800">
          <p className="text-blue-800">Sell</p>
        </div>
      </Link>

      {account && (
        <div className="flex space-x-9 bg-black">
          <div>
            <Link href={"/Profile"}>
              {" "}
              <div className="relative text-blue-800">
                <p className="text-blue-800">Profile</p>
              </div>
            </Link>
          </div>

          <div>
            {" "}
            {account.address.slice(0, 5)}...{account.address.slice(6, 9)}
          </div>
        </div>
      )}
      {address ? (
        <div>
          {addresses.map((theAddress, index) => {
            if (theAddress === address) {
              return (
                <div key={index}>
                  <Link href={"/AdminPanel"}>
                    {" "}
                    <div className="relative text-blue-800">
                      <p className="text-blue-800">Admin</p>
                    </div>
                  </Link>
                </div>
              );
            }

            return null;
          })}
        </div>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
