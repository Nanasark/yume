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
    <div className=" flex items-center justify-center sellerSectionGradient w-full h-[203px] rounded-2xl ">
      <div className=" flex flex-col gap-4 p-3 w-full h-[200px] sellerGlass rounded-lg">
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
