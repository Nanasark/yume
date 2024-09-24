import { MediaRenderer } from "thirdweb/react";
import { client } from "@/app/client";
import { useState } from "react";
interface ImageChangeProps {
  cover: string;
  display1: string;
  display2: string;
  display3: string;
}

export default function ImageHolder({
  cover,
  display1,
  display2,
  display3,
}: ImageChangeProps) {
  const [photo, setPhoto] = useState(0);

  const imageShow =
    photo == 0
      ? cover
      : photo == 1
      ? display1
      : photo == 2
      ? display2
      : display3;
  return (
    <div className="w-full h-full flex gap-5">
      <div className="w-full h-6/8">
        <MediaRenderer
          client={client}
          className="relative rounded-lg  w-full h-full object-cover"
          src={`ipfs://${imageShow}`}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div
          className={`${
            photo == 0 ? "ring-2 rounded-lg ring-amber-600" : "ring-0"
          } w-[70px] h-[70px]`}
          onClick={() => setPhoto(0)}
        >
          {" "}
          <MediaRenderer
            client={client}
            className="relative rounded-lg  w-full h-full object-cover"
            src={`ipfs://${cover}`}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          className={`${
            photo == 1 ? "ring-2 rounded-lg ring-amber-600" : "ring-0"
          } w-[70px] h-[70px]`}
          onClick={() => setPhoto(1)}
        >
          {" "}
          <MediaRenderer
            client={client}
            className="relative rounded-lg  w-full h-full object-cover"
            src={`ipfs://${display1}`}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          className={` ${
            photo == 2 ? "ring-2 rounded-lg ring-amber-600" : "ring-0"
          } w-[70px] h-[70px]`}
          onClick={() => setPhoto(2)}
        >
          {" "}
          <MediaRenderer
            client={client}
            className="relative rounded-lg  w-full h-full object-cover"
            src={`ipfs://${display2}`}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          className={`${
            photo == 3 ? "ring-2 rounded-lg ring-amber-600" : "ring-0"
          } w-[70px] h-[70px]`}
          onClick={() => setPhoto(3)}
        >
          {" "}
          <MediaRenderer
            client={client}
            className="relative rounded-lg  w-full h-full object-cover"
            src={`ipfs://${display3}`}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
