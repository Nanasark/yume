import { metadata } from "@/app/layout";
import { NextResponse } from "next/server";
import { Stripe } from "stripe";
const { STRIPE_SECRET_KEY } = process.env;

export async function POST(req: Request) {
  if (!STRIPE_SECRET_KEY) {
    throw "Stripe secret key not found";
  }
  const { buyerWalletAddress } = await req.json();
  //   const { amount } = await req.json();

  if (!buyerWalletAddress) {
    throw " buyer wallet address not found";
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
  });

  //   if (!amount) {
  //     throw " no amount given";
  //   }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 10_00,
    currency: "usd",
    description: " buying crypto with credit card",
    payment_method_types: ["card"],
    metadata: { buyerWalletAddress },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
