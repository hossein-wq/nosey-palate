// Supabase Edge Function: Stripe Sync
// Processes Stripe webhook events and syncs subscription data
// Deploy with: supabase functions deploy stripe-sync

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const { type, data } = body;

    console.log(`Processing Stripe event: ${type}`);

    // Route to appropriate handler
    switch (type) {
      case "checkout.session.completed":
        console.log("New subscription created:", data.object.id);
        break;
      case "customer.subscription.updated":
        console.log("Subscription updated:", data.object.id);
        break;
      case "customer.subscription.deleted":
        console.log("Subscription canceled:", data.object.id);
        break;
      default:
        console.log("Unhandled event type:", type);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Internal error", { status: 500 });
  }
});
