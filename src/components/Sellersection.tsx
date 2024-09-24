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
    <div className="flex items-center justify-center text-[#D6D6D6] borderGradient w-full h-[203px] bg-transparent p-[1px] rounded-[11px] buttonHover">
      <div className="flex flex-col gap-4 p-3 w-full h-full bg-[#F9FBFF] rounded-[10px]">
        {/* User Info Section */}
        <div className="w-full h-[55px] bg-transparent flex items-center justify-center rounded-[11px] p-[1px] buttonHover">
          <div className="w-full h-full flex items-center justify-center rounded-[10px] border-[1px] border-[#262830] hover:border-[0px] hover:bg-[#1B1C22]">
            <div className="rounded-full p-[2px] border-[1px] border-[#262830] hover:border-[0px] hover:bg-[#1B1C22]">
              <MediaRenderer
                client={client}
                className="rounded-full"
                src={`ipfs://${image}`}
                height="55px"
                width="55px"
              />
            </div>
            <p className="ml-3">{userName}</p>
          </div>
        </div>

        {/* Profile Link Section */}
        <div className="w-full h-[55px] bg-transparent flex items-center justify-center rounded-[11px] p-[1px] buttonHover">
          <div className="w-full h-full flex items-center justify-center rounded-[10px] border-[1px] border-[#262830] hover:border-[0px] hover:bg-[#1B1C22]">
            <p>Social Link: {profileLink}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
