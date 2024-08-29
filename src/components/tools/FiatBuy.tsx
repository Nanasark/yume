import Link from "next/link";
import Image from "next/image";

export default function FiatBuy() {
  return (
    <div className="w-full h-full  gap-5 bg-transparent flex flex-col items-center justify-center pl-5 pr-5 pt-3 pb-3">
      <div className="w-full h-1/2 flex flex-col items-center justify-center text-white border-[2px] border-[#262830]  rounded-[10px]">
        <p>Purchase your Coins & Tokens with Fiat</p>
        <div className="flex gap-2">
          <Image
            src={"/images/credit-card.png"}
            alt="credit-card image"
            width={60}
            height={40}
          />
          <Image
            src={"/images/credit-card1.png"}
            alt="credit-card image"
            width={60}
            height={40}
          />
        </div>
      </div>
      <div className="w-full h-1/2 flex gap-5 pl-20 pr-20 ">
        <div className=" text-[#D6D6D6] w-1/2 h-1/2 bg-transparent flex items-center justify-center rounded-[11px] p-[1px] buttonHover">
          <Link href={`/Fiat`} className="w-full h-full">
            <button className="w-full rounded-[10px] border-[1px] border-[#262830]  hover:border-[0px] hover:bg-[#1B1C22] h-full ">
              Buy ARYM
            </button>
          </Link>
        </div>

        <div className=" text-[#D6D6D6] w-1/2 h-1/2 bg-transparent flex items-center justify-center rounded-[11px] p-[1px] buttonHover">
          <Link href={`/Fiat`} className="w-full h-full flex">
            <button
              disabled
              className="flex items-center justify-center gap-2 w-full rounded-[10px] border-[1px] border-[#262830]  hover:border-[0px] hover:bg-[#1B1C22] h-full"
            >
              <Image
                src={"/images/polygon.png"}
                alt="polygon image"
                height={22}
                width={22}
              />
              <p>Buy MATIC</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
