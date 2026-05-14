import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Ticket } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getDemoEvent, getDemoRelatedEvents, DEMO_EVENTS } from "@/lib/demo-events";
import { formatPrice } from "@/lib/utils";
import { Reveal, Eyebrow, GoldHairline } from "@/components/shared/primitives";
import { EventCard } from "@/components/shared/event-card";
import type { EventDetail } from "@/types/events";
import { notFound } from "next/navigation";

const TYPE_LABELS: Record<string, string> = {
  tasting: "Tasting",
  dinner: "Dinner",
  journey: "Journey",
  experience: "Experience",
};

async function getEvent(slug: string): Promise<EventDetail | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (data) return data as unknown as EventDetail;
  } catch {
    // fall through
  }
  return getDemoEvent(slug) ?? null;
}

async function getRelatedEvents(slug: string): Promise<EventDetail[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("events")
      .select("id, title, slug, event_type, cover_image, venue_name, venue_city, starts_at, capacity, is_featured, price_cents")
      .eq("is_published", true)
      .neq("slug", slug)
      .order("starts_at", { ascending: true })
      .limit(3);

    if (data && data.length > 0) return data as unknown as EventDetail[];
  } catch {
    // fall through
  }
  return getDemoRelatedEvents(slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  return {
    title: event ? `${event.title} — The Nosey Palate` : "Event — The Nosey Palate",
    description: event?.description ?? undefined,
  };
}

export async function generateStaticParams() {
  return DEMO_EVENTS.map((e) => ({ slug: e.slug }));
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    full: d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate().toString(),
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const relatedEvents = await getRelatedEvents(slug);
  const date = formatDate(event.starts_at);
  const endDate = event.ends_at ? formatDate(event.ends_at) : null;
  const spotsLeft = event.capacity != null && event.rsvp_count != null
    ? event.capacity - event.rsvp_count
    : null;

  return (
    <>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[480px] w-full overflow-hidden">
        <Image
          src={event.cover_image ?? "/images/event1.jpg"}
          alt={event.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-background/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-6 pb-12 md:px-10">
          <Reveal>
            <Link
              href="/events"
              className="mb-6 inline-flex items-center gap-2 text-sm text-ivory/50 transition hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              All Events
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-block rounded-full bg-gold/15 px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-gold backdrop-blur-sm">
              {TYPE_LABELS[event.event_type] ?? event.event_type}
            </span>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight text-ivory">
              {event.title}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ivory/60">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gold/60" />
                {date.full}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold/60" />
                {date.time}{endDate ? ` — ${endDate.time}` : ""}
              </span>
              {event.venue_name && (
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gold/60" />
                  {event.venue_name}, {event.venue_city}
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-12 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* Main content */}
          <div>
            <Reveal>
              <div className="prose-luxury">
                {event.description && (
                  <p className="text-lg leading-relaxed text-ivory/70">
                    {event.description}
                  </p>
                )}
                {event.long_description && (
                  <div className="mt-8 space-y-4">
                    {event.long_description.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="leading-relaxed text-ivory/60">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <Reveal delay={0.1}>
                <div className="mt-10 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gold/15 px-3 py-1 text-xs text-ivory/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Venue details */}
            <Reveal delay={0.15}>
              <GoldHairline className="mt-12" />
              <div className="mt-10">
                <Eyebrow>Venue</Eyebrow>
                <h3 className="mt-4 font-display text-2xl text-ivory">
                  {event.venue_name}
                </h3>
                <p className="mt-2 text-ivory/50">
                  {event.venue_address && `${event.venue_address}, `}
                  {event.venue_city}
                </p>
                <div className="mt-6 aspect-video overflow-hidden rounded-lg bg-espresso/50">
                  <div className="flex h-full items-center justify-center text-ivory/20">
                    <MapPin className="mr-2 h-5 w-5" />
                    Map coming soon
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Gallery placeholder */}
            <Reveal delay={0.2}>
              <div className="mt-16">
                <Eyebrow>Gallery</Eyebrow>
                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="aspect-square overflow-hidden rounded-lg bg-espresso/50"
                    >
                      <div className="flex h-full items-center justify-center text-xs text-ivory/20">
                        Photo {i}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.1}>
              <div className="glass-strong overflow-hidden rounded-xl">
                <div className="border-b border-gold/10 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center rounded-md bg-gold/10 px-4 py-3">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-gold">
                        {date.month}
                      </span>
                      <span className="font-display text-3xl leading-none text-ivory">
                        {date.day}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ivory">
                        {date.full}
                      </p>
                      <p className="mt-0.5 text-sm text-ivory/50">
                        {date.time}{endDate ? ` — ${endDate.time}` : ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  {event.venue_name && (
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/60" />
                      <div>
                        <p className="text-sm text-ivory">{event.venue_name}</p>
                        <p className="text-xs text-ivory/40">{event.venue_city}</p>
                      </div>
                    </div>
                  )}

                  {event.capacity != null && (
                    <div className="flex items-start gap-3">
                      <Users className="mt-0.5 h-4 w-4 shrink-0 text-gold/60" />
                      <div>
                        <p className="text-sm text-ivory">{event.capacity} guests</p>
                        {spotsLeft != null && (
                          <p className={`text-xs ${spotsLeft <= 3 ? "text-ember" : "text-ivory/40"}`}>
                            {spotsLeft <= 0 ? "Waitlist open" : `${spotsLeft} spots remaining`}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {event.price_cents != null && event.price_cents > 0 && (
                    <div className="flex items-start gap-3">
                      <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-gold/60" />
                      <div>
                        <p className="text-sm text-ivory">{formatPrice(event.price_cents)}</p>
                        <p className="text-xs text-ivory/40">per person</p>
                      </div>
                    </div>
                  )}

                  {/* Capacity bar */}
                  {spotsLeft != null && event.capacity != null && (
                    <div className="pt-2">
                      <div className="h-1.5 overflow-hidden rounded-full bg-ivory/10">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-gold/60 to-gold transition-all duration-700"
                          style={{ width: `${Math.min(100, ((event.rsvp_count ?? 0) / event.capacity) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-gold/10 p-6">
                  <Link
                    href="/login"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-medium text-espresso transition-all hover:bg-gold-soft"
                  >
                    Sign in to RSVP
                  </Link>
                  <p className="mt-3 text-center text-[11px] text-ivory/30">
                    Members only. Not a member?{" "}
                    <Link href="/membership" className="text-gold/60 hover:text-gold">
                      Join us
                    </Link>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Related events */}
        {relatedEvents.length > 0 && (
          <div className="mt-24">
            <GoldHairline />
            <Reveal>
              <div className="mt-12">
                <Eyebrow>More Events</Eyebrow>
                <h2 className="mt-4 font-display text-3xl text-ivory md:text-4xl">
                  Continue <span className="italic text-gold-soft">Exploring</span>
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedEvents.map((event, i) => (
                <EventCard
                  key={event.id}
                  event={event}
                  variant="marketing"
                  index={i}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
