import { TransactionError } from "@thirdweb-dev/react";

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
    alert(`Transaction Error: ${error.message}`);

    if (error.cause) {
      console.error("Transaction Cause Details:", error.cause);
    }

    if (error.reason) {
      console.error("Reason:", error.reason);
    }
  } else if (error instanceof Error) {
    alert(`Unexpected Error: ${error.message}`);
    console.error("Unexpected Error:", error.message);
  } else {
    alert("Unknown Error occurred");
    console.error("Unknown Error:", error);
  }
}
