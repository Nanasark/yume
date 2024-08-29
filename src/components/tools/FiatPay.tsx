import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";

import { useActiveAccount } from "thirdweb/react";
export default function FiatPay() {
  const account = useActiveAccount();
  const address = account ? account.address : "";
  const [clientSecret, setClientSecret] = useState<string>("");
  const [buyingToken, setBuyingToken] = useState<number>(0);
  const [dollarAmount, setDollarAmount] = useState<number>(0);

  const pricePerToken = 0.01;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = parseFloat(value);

    // Check if numberValue is a valid number before performing calculations
    if (!isNaN(numberValue)) {
      setBuyingToken(numberValue);
      const dollar = numberValue * pricePerToken;
      setDollarAmount(dollar);
    } else {
      // Handle invalid number input
      setBuyingToken(0);
      setDollarAmount(0);
    }
  };
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw "publishable key not working in env";
  }

  const stripe = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

  const onClick = async () => {
    const res = await fetch("api/stripe-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        buyerWalletAddress: address,
        dollarAmount: dollarAmount,
      }),
    });

    if (res.ok) {
      const json = await res.json();
      setClientSecret(json.clientSecret);
    }
  };

  return (
    <div
      className="w-full h-full flex p-5 lg:p-10 justify-center
    items-center bg-black border-[2px]  border-[#262830] shadow-xl rounded-[11px]"
    >
      <div className="w-full h-full flex justify-center items-center">
        {!clientSecret ? (
          <div className=" text-[#D6D6D6] gap-4 flex flex-col justify-center items-center w-[400px] h-[300px] bg-transparent ">
            <div className="flex flex-col border-[1px] border-[#262830]  rounded-[10px] w-full p-5 gap-2">
              <label htmlFor="tokenAmount">Enter token amount:</label>
              <div className=" text-[#D6D6D6] h-[47px]  bg-transparent flex items-center justify-center rounded-[11px] p-[1px] buttonHover">
                <input
                  id="tokenAmount"
                  type="number"
                  value={buyingToken}
                  className="flex pl-2 items-center justify-center gap-2 w-full bg-transparent rounded-[10px] border-[1px] border-[#262830]  hover:border-[0px] hover:bg-[#1B1C22] h-full"
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="w-full h-[60px] flex gap-2">
              <div className="flex items-center justify-center gap-2 w-full rounded-[10px] border-[1px] border-[#262830]  hover:border-[0px] hover:bg-[#1B1C22] h-full">
                {" "}
                <p> {buyingToken} Tokens</p>
              </div>
              <div className="flex items-center justify-center gap-2 w-full rounded-[10px] border-[1px] border-[#262830]  hover:border-[0px] hover:bg-[#1B1C22] h-full">
                <p>Pay ${dollarAmount.toFixed(2)} </p>
              </div>
            </div>

            <button
              onClick={onClick}
              disabled={!account}
              className="w-[200px] h-[50px] bg-blue-600 text-center text-white"
            >
              Pay With Credit Card
            </button>
          </div>
        ) : (
          <Elements
            options={{
              clientSecret: clientSecret,
              appearance: { theme: "night" },
            }}
            stripe={stripe}
          >
            <CreditCardForm />
          </Elements>
        )}{" "}
      </div>
    </div>
  );
}

const CreditCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const returnUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://artyume.vercel.app";

  const onClick = async () => {
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    try {
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },

        redirect: "if_required",
      });

      if (error) {
        throw error.message;
      }

      if (paymentIntent.status === "succeeded") {
        setIsComplete(true);
        alert("payment complete");
      }
    } catch (error) {
      alert("there was an error processing your payment.");
    }
  };
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <PaymentElement />
      <button
        onClick={onClick}
        disabled={isComplete || isLoading || !elements}
        className="w-[200px] h-[50px] rounded-sm bg-blue-600 text-center text-white"
      >
        {" "}
        {isComplete ? "Payment Complete" : isLoading ? "Loading..." : "Pay Now"}
      </button>
    </div>
  );
};
