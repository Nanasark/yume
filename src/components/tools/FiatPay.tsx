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
      body: JSON.stringify({ buyerWalletAddress: address }),
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
          <button>Buy Token With Credit Card</button>
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
  const [isLoading, setIsLoadind] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  return (
    <>
      <PaymentElement />
      <button disabled={isCompleted || isLoading || !elements}>
        {" "}
        {isCompleted ? "Payment Complete" : isLoading ? "Loading..." : "Pay"}
      </button>
    </>
  );
};
