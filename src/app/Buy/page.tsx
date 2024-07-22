"use client";

import react, { useState } from "react";
import AllProductGrid from "@/components/grids/AllProductsGrid";
import ThreeD from "@/components/grids/3DGrid";
import TwoD from "@/components/grids/2DGrid";
import IllustrationGrid from "@/components/grids/IllustrationGrid";
import Abstract from "@/components/grids/AbstractGrid";
import Photography from "@/components/grids/PhotographyGrid";
import Pixel from "@/components/grids/PixelGrid";

export default function Buy() {
  const [tag, setTag] = useState(1);

  return (
    <div className="flex flex-col items-center justify-between p-5 bg-[#181934]">
      <div className="flex space-x-2 justify-center mt-5">
        <button
          onClick={() => setTag(1)}
          className=" text-center border-[1px] border-[#e8ec67] rounded-sm w-[100px] bg-[#B9A44C]"
        >
          All
        </button>
        <button
          onClick={() => setTag(2)}
          className=" text-center border-[1px] border-[#C1CC99] rounded-sm w-[100px] bg-[#8B9474]"
        >
          3D
        </button>
        <button
          onClick={() => setTag(3)}
          className=" text-center border-[1px] border-[#C1CC99] rounded-sm w-[100px] bg-[#8B9474]"
        >
          2d
        </button>

        <button
          onClick={() => setTag(4)}
          className=" text-center border-[1px] border-[#C1CC99] rounded-sm w-[100px] bg-[#8B9474]"
        >
          Illustrations
        </button>
        <button
          onClick={() => setTag(5)}
          className=" text-center border-[1px] border-[#C1CC99] rounded-sm w-[100px] bg-[#8B9474]"
        >
          Abstract
        </button>
        <button
          onClick={() => setTag(6)}
          className=" text-center border-[1px] border-[#C1CC99] rounded-sm w-[100px] bg-[#8B9474]"
        >
          Photography
        </button>
        <button
          onClick={() => setTag(7)}
          className=" text-center border-[1px] border-[#C1CC99] rounded-sm w-[100px] bg-[#8B9474]"
        >
          Pixel
        </button>
      </div>

      <div className=" ">
        {tag === 1 ? (
          <AllProductGrid />
        ) : tag === 2 ? (
          <ThreeD />
        ) : tag === 3 ? (
          <TwoD />
        ) : tag === 4 ? (
          <IllustrationGrid />
        ) : tag === 5 ? (
          <Abstract />
        ) : tag === 6 ? (
          <Photography />
        ) : tag === 7 ? (
          <Pixel />
        ) : (
          <div>New Tag Coming Next Week </div>
        )}
      </div>
    </div>
  );
}
