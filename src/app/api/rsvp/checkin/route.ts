import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { qr_code } = await request.json();

    if (!qr_code) {
      return NextResponse.json({ error: "QR code is required" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    const { data, error } = await supabase
      .from("rsvps")
      .select("id, status")
      .eq("qr_code", qr_code)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Invalid QR code" }, { status: 404 });
    }

    if (data.status === "checked_in") {
      return NextResponse.json({ error: "Already checked in" }, { status: 400 });
    }

    if (data.status !== "confirmed") {
      return NextResponse.json({ error: "RSVP not confirmed" }, { status: 400 });
    }

    await supabase
      .from("rsvps")
      .update({ status: "checked_in", checked_in_at: new Date().toISOString() })
      .eq("id", data.id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
