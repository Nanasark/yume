import React, { ReactNode } from "react";

interface CardProps {
  className?: string;
  innerClassName?: string;

  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ className, innerClassName, children }) => {
  return (
    <div
      className={`${className} rounded-[11px] flex items-center justify-center bg-[#F9FBFF] p-5 text-[#181934] md:p-10 w-full`}
    >
      <div
        className={`${innerClassName} flex w-full h-full  sellerGlass rounded-[11px]`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
