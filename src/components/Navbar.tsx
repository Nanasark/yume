"use client";

import { useActiveAccount } from "thirdweb/react";
import Link from "next/link";
import SignInButton from "./buttoncomponents/SignInButton";
import { inter } from "@/helpers/fonts";
import { inknut_antiqua } from "@/helpers/fonts";
import { useState } from "react";
import { HiBars2 } from "react-icons/hi2";
import { MdClose } from "react-icons/md";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const account = useActiveAccount();
  const address = account?.address || "";

  const hover =
    "hover:border-b-indigo-900 hover:drop-shadow-md hover:opacity-90 border-b-2 border-transparent transition-all duration-300";

  const menuItems = [
    { name: "Home", path: "/", id: "home" },
    { name: "Direct-Buys", path: "/Buy", id: "buy" },
    { name: "Auctions", path: "/Auction", id: "auction" },
    { name: "Sell", path: "/Sell", id: "sell" },
    { name: "Tools", path: "/Tools", id: "tools" },
  ];

  return (
    <nav
      className={`${inter.className} bg-[#181934] text-white fixed w-screen md:w-full h-[70px] z-[1000] drop-shadow-[0_35px_35px_rgba(0,0,0,0.45)]`}
    >
      <div className="flex items-center justify-between h-full px-5 lg:px-10">
        <div
          className={`${inknut_antiqua.className} font-black text-white text-[40px]`}
        >
          <h1>ARTYUME</h1>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <MdClose className="w-8 h-8" />
          ) : (
            <HiBars2 className="w-8 h-8" />
          )}
        </button>
        <div className="hidden lg:flex items-center justify-center flex-1 space-x-5">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActive(item.id)}
              className="cursor-pointer"
            >
              <Link href={item.path}>
                <div
                  className={`${hover} ${
                    active === item.id ? "opacity-100" : "opacity-70"
                  } relative`}
                >
                  <p>{item.name}</p>
                </div>
              </Link>
            </div>
          ))}
          {account && (
            <div className="flex items-center space-x-9">
              <Link href={"/Register"}>
                <div className={`${hover} relative`}>
                  <p className="">KYC</p>
                </div>
              </Link>

              <Link href={"/Profile"}>
                <div className={`${hover} relative`}>
                  <p className="">Profile</p>
                </div>
              </Link>
              <div>
                {address.slice(0, 5)}...{address.slice(-4)}
              </div>
            </div>
          )}
        </div>
        <div className="hidden lg:block">
          <SignInButton />
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden flex flex-col bg-[#181934] px-5 pb-5 space-y-3">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setIsOpen(false);
              }}
              className="cursor-pointer"
            >
              <Link href={item.path}>
                <div
                  className={`${hover} ${
                    active === item.id ? "opacity-100" : "opacity-70"
                  } relative`}
                >
                  <p>{item.name}</p>
                </div>
              </Link>
            </div>
          ))}
          {account && (
            <div className="flex flex-col space-y-3">
              <Link href={"/Register"}>
                <div className={`${hover} relative`}>
                  <p className="">KYC</p>
                </div>
              </Link>
              <Link href={"/Profile"}>
                <div className={`${hover} relative`}>
                  <p className="">Profile</p>
                </div>
              </Link>
              <div>
                {address.slice(0, 5)}...{address.slice(-4)}
              </div>
            </div>
          )}
          <div>
            <SignInButton />
          </div>
        </div>
      )}
    </nav>
  );
}
