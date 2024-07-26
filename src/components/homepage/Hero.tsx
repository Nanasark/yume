import Image from "next/image";
import { inika, poppins } from "@/helpers/fonts";
export default function Hero() {
  return (
    <div className=" flex w-full gap-5">
      {/* Hero Left */}
      <div className="w-1/2 flex flex-col gap-5 relative top-10">
        <div>
          <Image
            src="/images/artm.png"
            className="w-[220px] h-[36px]"
            width={220}
            height={2}
            alt="face 1"
          />
        </div>

        <div className="w-4/5">
          <h1 className={`${inika.className} text-[40px] text-white `}>
            The Future of Art Auctions and Direct Buys
          </h1>
        </div>
        <div className="w-4/5">
          <p
            className={`${poppins.className} text-[18px] text-white text-wrap`}
          >
            Welcome to Artyume, where the future of art buying is here.
            Experience seamless decentralized auctions and direct purchases.
            Bid, buy, and instantly download your favorite pieces, all secured
            by blockchain technology.
          </p>
        </div>
      </div>
      {/* Hero Right */}
      <div className="flex  w-1/2 ">
        <div className="relative z-4  hover:pulse w-[280px] h-[450px] ">
          <Image
            src="/images/hp1.png"
            className="relative z-20 hover:pulse w-[258px] h-[438px] swing-hp1"
            width={258}
            height={438}
            alt="face 1"
          />
        </div>
        <div className="relative top-10 z-10 right-28">
          <Image
            src="/images/hp2.png"
            className="relative z-3 swing-hp2"
            width={215}
            height={312}
            alt="face 1"
          />
        </div>
        <div className="relative top-[75px] z-0 right-[190px]">
          <Image
            src="/images/hp3.png"
            className=" relative z-2 swing-hp3"
            width={167}
            height={255}
            alt="face 1"
          />
        </div>
      </div>
    </div>
  );
}
