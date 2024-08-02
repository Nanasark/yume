import { TransactionError } from "@thirdweb-dev/react";
import toast from "react-hot-toast";

export function ErrorHandler(error: any) {
  if (error instanceof TransactionError) {
    console.error("Transaction Error message:", error.message);
    if (error.cause) {
      console.error("Transaction Cause Details:", error.cause);
    }

    // Log the reason if available
    if (error.reason) {
      console.error("Reason:", error.reason);
    }
  } else {
    // Log unexpected errors
    console.error("Unexpected Error:", error);
  }
}

export function ErrorAlert(error: any): void {
  if (error instanceof TransactionError) {
    if (error.message) {
      `${error.message
        .replace(/contract:\s*[\S]+/g, "")
        .replace(/chainId:\s*\d+/g, "")
        .trim()}`;
    }
  } else if (error instanceof Error) {
    toast.error(
      `${error.message
        .replace(/contract:\s*[\S]+/g, "")
        .replace(/chainId:\s*\d+/g, "")
        .trim()}`,
      {
        id: "transaction",
        icon: "❌",
        duration: 5000,
      }
    );
  } else {
    alert("Unknown Error occurred");
    console.error("Unknown Error:", error);
  }
}
