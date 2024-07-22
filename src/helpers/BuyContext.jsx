"use client";
import React, { useContext, useState, createContext } from "react";

const BuyModalContext = createContext();

export const BuyModalProvider = ({ children }) => {
  const [isOpenBuy, setIsOpenBuy] = useState(false);
  return (
    <BuyModalContext.Provider value={{ isOpenBuy, setIsOpenBuy }}>
      {children}
    </BuyModalContext.Provider>
  );
};

export const useOpenBuy = () => useContext(BuyModalContext);
