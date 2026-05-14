import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { DEMO_EVENTS } from "@/lib/demo-events";
import type { EventSummary } from "@/types/events";
import { EventsListing } from "./events-listing";

export const metadata: Metadata = {
  title: "Events",
  description: "Browse upcoming curated wine tastings, private dinners, and exclusive wine journeys hosted by The Nosey Palate worldwide.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events — The Nosey Palate",
    description: "Curated tastings, private dinners, and wine journeys for discerning palates.",
  },
};

async function getEvents(): Promise<EventSummary[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("id, title, slug, event_type, cover_image, venue_name, venue_city, starts_at, capacity, is_featured, price_cents, description")
      .eq("is_published", true)
      .gte("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEMO_EVENTS as EventSummary[];
    }
    return data as EventSummary[];
  } catch {
    return DEMO_EVENTS as EventSummary[];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-32 md:px-10">
      <EventsListing events={events} />
    </div>
  );
}
