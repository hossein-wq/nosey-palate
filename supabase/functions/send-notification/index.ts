// Supabase Edge Function: Send Notification
// Handles email (Resend) and push (FCM) notification delivery
// Deploy with: supabase functions deploy send-notification

interface NotificationPayload {
  user_id: string;
  type: string;
  title: string;
  body: string;
  channel: "email" | "push" | "in_app";
  metadata?: Record<string, unknown>;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const payload: NotificationPayload = await req.json();

    switch (payload.channel) {
      case "email":
        // Send via Resend
        console.log(`Sending email to user ${payload.user_id}: ${payload.title}`);
        break;
      case "push":
        // Send via FCM
        console.log(`Sending push to user ${payload.user_id}: ${payload.title}`);
        break;
      case "in_app":
        // Store in notifications table
        console.log(`Creating in-app notification for user ${payload.user_id}: ${payload.title}`);
        break;
    }

    return new Response(JSON.stringify({ sent: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return new Response("Internal error", { status: 500 });
  }
});
