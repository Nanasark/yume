"use client";
import { useActiveAccount } from "@/app/thirdweb";

export default function AdminPanel() {
  const account = useActiveAccount();

  const address = account?.address;
  const addresses = ["0x1559578A80B399D23Ecfd01a", "", ""];
  return (
    <div className="flex justify-center h-[600px] bg-green-800">
      {addresses.map((theAddress, index) => {
        if (theAddress === address) {
          return <div key={index}>Show admin Panel</div>;
        }

        return null;
      })}
    </div>
  );
}
