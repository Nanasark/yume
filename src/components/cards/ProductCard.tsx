import { MediaRenderer, useReadContract } from "@/app/thirdweb";
import { client } from "@/app/client";
import { toEther } from "@/app/thirdweb";
import { registryContract } from "@/app/contract";
import { poppins, aleo } from "@/helpers/fonts";

interface ProductCardInterface {
  name: string;
  tag: string;
  cover: string;
  price: bigint;
  stock: bigint;
  isMaticPayment: boolean;
  id: bigint;
  seller: string;
}

export default function ProductCard({
  name,
  tag,
  price,
  isMaticPayment,
  stock,
  cover,
  id,
  seller,
}: ProductCardInterface) {
  const SellerString = String(seller);
  console.log(seller);

  const { data: registry, isLoading: isRegistryLoading } = useReadContract({
    contract: registryContract,
    method: "getUserDetails",
    params: [seller as `0x${string}`],
  });

  let payment;
  if (isMaticPayment == true) {
    payment = "Matic";
  }
  if (isMaticPayment == false) {
    payment = "ARYM Token";
  }
  let ActualTag;
  if (tag == "TwoD") {
    ActualTag = "2D";
  }
  if (tag == "ThreeD") {
    ActualTag = "3D";
  }
  console.log(id);
  return (
    <div className="flex items-center justify-center borderGradient rounded-[20px] w-[282px] h-[422px]">
      <div className="flex flex-col items-center justify-center gap-3  w-[280px] h-[420px] p-4 bg-[#1F2045] rounded-[20px] shadow-lg">
        <div className="flex gap-4 h-[60px] mr-[80px] items-center">
          <div className="relative flex-initial rounded-full overflow-hidden">
            <MediaRenderer
              client={client}
              className="relative rounded-full"
              src={`ipfs://${registry?.profileImage}`}
              height="35px"
              width="35px"
            />
          </div>
          <div className="text-[14px] text-[#E1EBEE]">
            <p className="font-semibold">
              {registry?.firstName} {registry?.secondName}
            </p>
            <p className="text-sm text-[#C0C0C0]">{registry?.email}</p>
          </div>
        </div>
        <div className="w-[230px] h-[230px] overflow-hidden rounded-lg">
          <MediaRenderer
            client={client}
            className="relative rounded-lg  w-full h-full object-cover"
            src={`ipfs://${cover}`}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex text-[14px] justify-between w-full ">
          <div className=" w-2/3">
            <div>
              <p
                className={`${aleo.className} text-[16px] text-white font-bold`}
              >
                {name}
              </p>
            </div>
            <div
              className={`${aleo.className} text-white flex gap-1 relative top-5 text-[16px]`}
            >
              <p>InStock: {stock.toString()}</p>
            </div>
          </div>

          <div className="space-y-2 items-center text-center">
            <p className="text-white font-extralight">
              price:
              <br />{" "}
              <span className="font-semibold">
                {toEther(price).toString()} {payment}
              </span>
            </p>

            <div className="flex font-light w-[110px] h-[40px] text-center justify-center items-center rounded-[5px]  text-white cursor-pointer hover:bg-[#F0F0F0] transition  buttonGradient">
              <p className={`${poppins.className} text-[15px] font-extralight`}>
                Buy Item
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
