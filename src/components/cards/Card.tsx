import React, { ReactNode } from "react";

interface CardProps {
  className?: string;
  innerClassName?: string;

  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ className, innerClassName, children }) => {
  return (
    <div
      className={`${className} rounded-[11px] flex items-center justify-center borderGradient p-[1px] text-[#181934]  w-full`}
    >
      <div
        className={`${innerClassName} flex w-full h-full text-[#55567a] bg-[#0e131d] rounded-[10px]`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
