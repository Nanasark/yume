"use client"
import React, { useContext, useState, createContext } from "react";

const AuctionModalContext = createContext();

 const AuctionModalProvider = ({ children }) => {
  const [isOpenAuction, setIsOpenAuction] = useState(false);
  return (

      <AuctionModalContext.Provider value={{ isOpenAuction, setIsOpenAuction }}>
        {children}
      </AuctionModalContext.Provider>


  );
};

export const useOpenAuction = () => useContext(AuctionModalContext);
export default AuctionModalProvider;