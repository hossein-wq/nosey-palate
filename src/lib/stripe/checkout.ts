"use server";

import { getStripe } from "./client";

export async function createCheckoutSession({
  userId,
  priceId,
  customerEmail,
}: {
  userId: string;
  priceId: string;
  customerEmail: string;
}) {
  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: customerEmail,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/membership?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/membership?canceled=true`,
    metadata: { user_id: userId },
  });

  return session;
}
