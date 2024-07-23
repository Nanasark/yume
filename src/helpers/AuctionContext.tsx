// AuctionContext.tsx
"use client";
import React, { useContext, useState, createContext, ReactNode } from "react";

// Define the shape of the context
interface AuctionModalContextType {
  isOpenAuction: boolean;
  setIsOpenAuction: React.Dispatch<React.SetStateAction<boolean>>;
}

// Provide a default value that matches the context type
const defaultContextValue: AuctionModalContextType = {
  isOpenAuction: false,
  setIsOpenAuction: () => {}, // This is a no-op function
};

// Create the context with the default value
const AuctionModalContext = createContext<AuctionModalContextType>(defaultContextValue);

const AuctionModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpenAuction, setIsOpenAuction] = useState(false);
  
  return (
    <AuctionModalContext.Provider value={{ isOpenAuction, setIsOpenAuction }}>
      {children}
    </AuctionModalContext.Provider>
  );
};

export const useOpenAuction = () => useContext(AuctionModalContext);

export default AuctionModalProvider;
