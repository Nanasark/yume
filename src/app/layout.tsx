import type { Metadata } from "next";
import { Roboto, Rubik } from "next/font/google";
import "./globals.css";
import AuctionModalProvider from "@/helpers/AuctionContext";
import { Toaster } from "react-hot-toast";
import { BuyModalProvider } from "@/helpers/BuyContext";
import { ThirdwebProvider } from "@/app/thirdweb";
// import queryClient from "@/lib/react-query";
import Navbar from "../components/Navbar";
import { amoy } from "./chain";
import { Thirdwebconfig } from "../Strings/string";
// import { QueryClientProvider } from "@tanstack/react-query";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
const rubik = Rubik({ subsets: ["latin"], weight: "400" });
export const metadata: Metadata = {
  title: "ArtYume",
  description:
    "Auctions on the blockchain, where decentralization meets digitalization",
  keywords: [
    "dapp",
    "decentralized auction platform",
    "auctions on blockchain",
    "all file types",
    "`dapp for downloadable digital auctions`",
    "bid buy download",
  ],
};
// const activeChain = 80002;

// const smartWalletConfig = {
//   factoryAddress: Thirdwebconfig.factoryAddress,
//   gasless: true,
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <ThirdwebProvider>
          <AuctionModalProvider>
            <Navbar />
            <Toaster
              position="top-center"
              containerClassName="mt-[50px]"
              toastOptions={{
                className: "",
                style: {
                  border: "1px solid #631A86",
                  padding: "10px",
                  color: "#4C1036",
                },
              }}
            />
            <div className="relative  ">{children}</div>
          </AuctionModalProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
