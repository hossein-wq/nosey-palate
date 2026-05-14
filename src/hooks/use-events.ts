"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { DEMO_EVENTS, getDemoEvent } from "@/lib/demo-events";
import type { EventSummary, EventDetail, EventType } from "@/types/events";

interface UseEventsOptions {
  type?: EventType | "all";
  featured?: boolean;
}

export function useEvents(options: UseEventsOptions = {}) {
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      let query = supabase
        .from("events")
        .select("id, title, slug, event_type, cover_image, venue_name, venue_city, starts_at, capacity, is_featured, price_cents, description")
        .eq("is_published", true)
        .order("starts_at", { ascending: true });

      if (options.type && options.type !== "all") {
        query = query.eq("event_type", options.type);
      }
      if (options.featured) {
        query = query.eq("is_featured", true);
      }

      const { data, error: dbError } = await query;

      if (dbError) throw dbError;

      if (data && data.length > 0) {
        setEvents(data as EventSummary[]);
      } else {
        let demo = [...DEMO_EVENTS] as EventSummary[];
        if (options.type && options.type !== "all") {
          demo = demo.filter((e) => e.event_type === options.type);
        }
        if (options.featured) {
          demo = demo.filter((e) => e.is_featured);
        }
        setEvents(demo);
      }
    } catch {
      let demo = [...DEMO_EVENTS] as EventSummary[];
      if (options.type && options.type !== "all") {
        demo = demo.filter((e) => e.event_type === options.type);
      }
      if (options.featured) {
        demo = demo.filter((e) => e.is_featured);
      }
      setEvents(demo);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [options.type, options.featured]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
}

export function useEvent(idOrSlug: string) {
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      setError(null);
      try {
        const supabase = createClient();

        const { data, error: dbError } = await supabase
          .from("events")
          .select("*")
          .or(`slug.eq.${idOrSlug},id.eq.${idOrSlug}`)
          .single();

        if (dbError) throw dbError;
        if (data) {
          setEvent(data as unknown as EventDetail);
          return;
        }
      } catch {
        // fall through to demo
      }

      const demo = getDemoEvent(idOrSlug);
      if (demo) {
        setEvent(demo);
      } else {
        setError("Event not found");
      }
      setLoading(false);
    }

    fetchEvent().finally(() => setLoading(false));
  }, [idOrSlug]);

  return { event, loading, error };
}
