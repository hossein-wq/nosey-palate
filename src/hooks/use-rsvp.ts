"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { generateQRToken } from "@/lib/utils";
import type { RSVPStatus } from "@/types/events";

interface RSVPState {
  id: string | null;
  status: RSVPStatus | null;
  qr_code: string | null;
  guest_name: string | null;
  waitlist_position: number | null;
}

export function useRsvp(eventId: string) {
  const [rsvp, setRsvp] = useState<RSVPState>({
    id: null,
    status: null,
    qr_code: null,
    guest_name: null,
    waitlist_position: null,
  });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRsvp = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("rsvps")
        .select("id, status, qr_code, guest_name, waitlist_position")
        .eq("event_id", eventId)
        .eq("user_id", user.id)
        .neq("status", "cancelled")
        .maybeSingle();

      if (data) {
        const row = data as unknown as {
          id: string;
          status: string;
          qr_code: string | null;
          guest_name: string | null;
          waitlist_position: number | null;
        };
        setRsvp({
          id: row.id,
          status: row.status as RSVPStatus,
          qr_code: row.qr_code,
          guest_name: row.guest_name,
          waitlist_position: row.waitlist_position,
        });
      }
    } catch {
      // No RSVP found or not authenticated
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchRsvp();
  }, [fetchRsvp]);

  const createRsvp = useCallback(async (guestName?: string) => {
    setActionLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please sign in to RSVP");

      const { data: eventRaw } = await supabase
        .from("events")
        .select("capacity")
        .eq("id", eventId)
        .single();

      const event = eventRaw as { capacity: number | null } | null;

      const { count } = await supabase
        .from("rsvps")
        .select("*", { count: "exact", head: true })
        .eq("event_id", eventId)
        .in("status", ["confirmed", "checked_in"]);

      const isFull = event?.capacity != null && (count ?? 0) >= event.capacity;

      const insertPayload = {
        event_id: eventId,
        user_id: user.id,
        status: (isFull ? "waitlisted" : "confirmed") as "waitlisted" | "confirmed",
        qr_code: isFull ? null : generateQRToken(),
        guest_name: guestName ?? null,
        waitlist_position: isFull ? (count ?? 0) - (event?.capacity ?? 0) + 1 : null,
      };

      const { data: newRsvpRaw, error: insertError } = await (supabase
        .from("rsvps") as ReturnType<typeof supabase.from>)
        .insert(insertPayload as never)
        .select("id, status, qr_code, guest_name, waitlist_position")
        .single();

      if (insertError) throw insertError;
      const newRsvp = newRsvpRaw as { id: string; status: string; qr_code: string | null; guest_name: string | null; waitlist_position: number | null } | null;
      if (newRsvp) {
        setRsvp({
          id: newRsvp.id,
          status: newRsvp.status as RSVPStatus,
          qr_code: newRsvp.qr_code,
          guest_name: newRsvp.guest_name,
          waitlist_position: newRsvp.waitlist_position,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to RSVP");
    } finally {
      setActionLoading(false);
    }
  }, [eventId]);

  const cancelRsvp = useCallback(async () => {
    if (!rsvp.id) return;
    setActionLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: updateError } = await (supabase
        .from("rsvps") as ReturnType<typeof supabase.from>)
        .update({ status: "cancelled" } as never)
        .eq("id", rsvp.id);

      if (updateError) throw updateError;
      setRsvp({ id: null, status: null, qr_code: null, guest_name: null, waitlist_position: null });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel RSVP");
    } finally {
      setActionLoading(false);
    }
  }, [rsvp.id]);

  return {
    rsvp,
    loading,
    actionLoading,
    error,
    createRsvp,
    cancelRsvp,
    refetch: fetchRsvp,
  };
}
