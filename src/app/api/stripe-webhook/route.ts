import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { amoy } from "@/app/chain";
import { toWei } from "thirdweb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

const {
  WEBHOOK_SECRET_KEY,
  ENGINE_URL,
  ENGINE_ACCESS_TOKEN,
  NEXT_PUBLIC_BUYARYMWITHFIAT_CONTRACT_ADDRESS,
  BACKEND_WALLET_ADDRESS,
  CHAIN_ID,
} = process.env;

export async function POST(req: NextRequest) {
  if (!WEBHOOK_SECRET_KEY) {
    throw 'Did you forget to add ".env.local" file';
  }

  const body = await req.text();

  const sig = headers().get("stripe-signature") as string;

  if (!sig) {
    throw "No Signature provided";
  }

  const event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET_KEY);
  switch (event.type) {
    case "charge.succeeded":
      await handleChargeSucceeded(event.data.object as Stripe.Charge);
      break;
  }

  return NextResponse.json({ message: "success" });
}

const handleChargeSucceeded = async (charge: Stripe.Charge) => {
  if (
    !ENGINE_URL ||
    !ENGINE_ACCESS_TOKEN ||
    !NEXT_PUBLIC_BUYARYMWITHFIAT_CONTRACT_ADDRESS ||
    !BACKEND_WALLET_ADDRESS
  ) {
    throw "server misconfigured check your env file";
  }
  const { buyerWalletAddress, dollarAmount } = charge.metadata;

  if (!buyerWalletAddress) {
    throw "no user connected, Sign In";
  }

  const pricePerToken = 0.01;
  const amount = Math.floor(parseFloat(dollarAmount) / pricePerToken);
  const sendingAmount = toWei(`${amount}`);

  console.log(amount);
  try {
    const tx = await fetch(
      `${ENGINE_URL}/contract/${amoy.id}/${NEXT_PUBLIC_BUYARYMWITHFIAT_CONTRACT_ADDRESS}/write`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ENGINE_ACCESS_TOKEN}`,
          "x-backend-wallet-address": BACKEND_WALLET_ADDRESS,
        },
        body: JSON.stringify({
          functionName: "send",
          args: [`${buyerWalletAddress}`, sendingAmount.toString()],
        }),
      }
    );

    console.log("contract:", NEXT_PUBLIC_BUYARYMWITHFIAT_CONTRACT_ADDRESS);
    if (!tx.ok) {
      throw "purchase failed";
    }
  } catch (error) {
    console.log(error);
  }
};
