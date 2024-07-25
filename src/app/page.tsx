import Image from "next/image";
import SignInButton from "@/components/buttoncomponents/SignInButton";

export default function Home() {
  return (
    <main className="pl-10 pr-10 flex min-h-screen flex-col bg-[#181934] items-center justify-between p-24">
      {/* Hero section */}
      <div className=" flex w-full gap-5">
        <div className="w-1/2 flex flex-col">
          <div>
            <Image
              src="/images/artm.png"
              className="w-[230px] h-[40px]"
              width={230}
              height={2}
              alt="face 1"
            />
          </div>
        </div>
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
    </main>
  );
}
