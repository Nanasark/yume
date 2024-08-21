import { MediaRenderer } from "thirdweb/react";
import { client } from "@/app/client";

type SellerSection = {
  image: string;
  firstName?: string;
  secondName?: string;
  userName?: string;
  profileLink: string;
};

export default function SellerSection({
  image,
  firstName,
  secondName,
  userName,
  profileLink,
}: SellerSection) {
  return (
    <div className=" flex items-center justify-center borderGradient  text-[#181934] p-[1px] w-full h-[203px] rounded-[11px] ">
      <div className=" flex flex-col gap-4 p-3 w-full h-full bg-[#F9FBFF]  rounded-[10px]">
        <div className=" flex gap-3">
          <div className="relative flex-initial rounded-full overflow-hidden">
            <MediaRenderer
              client={client}
              className="relative rounded-full"
              src={`ipfs://${image}`}
              height="55px"
              width="55px"
            />
          </div>
          <div>
            <p>{userName}</p>
          </div>
        </div>

        <div className="ml-10">
          <p>Social Link: {profileLink}</p>
        </div>
      </div>
    </div>
  );
}
