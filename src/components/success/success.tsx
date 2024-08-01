import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

interface SuccessType {
  isPending?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  Error?: string;
  Success?: string;
  Pending?: string;
}

export default function SuccessHandler({
  isPending,
  isSuccess,
  isError,
  Error,
  Success,
  Pending,
}: SuccessType) {
  useEffect(() => {
    if (isPending) {
      toast.loading(Pending || "Transaction is pending...", {
        id: "transaction",
      });
    } else {
      toast.dismiss("transaction");
    }

    if (isSuccess) {
      toast.success(Success || "Transaction completed successfully!", {
        id: "transaction",
        icon: "✅",
        duration: 5000,
      });
    }

    if (isError) {
      toast.error(Error || "Transaction failed. Please try again.", {
        id: "transaction",
        icon: "❌",
        duration: 5000,
      });
    }

    return () => {
      toast.dismiss("transaction");
    };
  }, [isPending, isSuccess, isError, Success, Error, Pending]);

  return null;
}
