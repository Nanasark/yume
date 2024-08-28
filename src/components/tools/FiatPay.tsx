import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";

import { useActiveAccount } from "thirdweb/react";
import { Input } from "postcss";
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
    <div>
      <div>
        {!clientSecret ? (
          <div>
            <label htmlFor="tokenAmount">Enter token amount:</label>
            <input
              id="tokenAmount"
              type="number"
              value={buyingToken}
              onChange={handleChange}
            />
            <p>Buying Token Amount: {buyingToken}</p>

            <p>Pay ${dollarAmount.toFixed(2)} dollars</p>
            <button onClick={onClick} disabled={!account}>
              Buy Token With Credit Card
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
    <>
      <PaymentElement />
      <button onClick={onClick} disabled={isComplete || isLoading || !elements}>
        {" "}
        {isComplete ? "Payment Complete" : isLoading ? "Loading..." : "Pay Now"}
      </button>
    </>
  );
};
