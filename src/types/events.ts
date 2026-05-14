export type EventType = "tasting" | "dinner" | "journey" | "experience";
export type RSVPStatus = "confirmed" | "waitlisted" | "cancelled" | "checked_in" | "no_show";

export interface EventSummary {
  id: string;
  title: string;
  slug: string;
  event_type: EventType;
  cover_image: string | null;
  venue_name: string | null;
  venue_city: string | null;
  starts_at: string;
  ends_at?: string | null;
  capacity: number | null;
  is_featured: boolean;
  rsvp_count?: number;
  price_cents?: number;
  description?: string | null;
  long_description?: string | null;
  venue_address?: string | null;
  host_id?: string | null;
  tags?: string[];
  gallery?: unknown;
}

export interface EventDetail extends EventSummary {
  long_description: string | null;
  venue_address: string | null;
  ends_at: string | null;
  price_cents: number;
  host_id: string | null;
  gallery: unknown;
  tags: string[];
  min_plan_slug: string | null;
  required_capabilities: string[];
  host?: {
    display_name: string;
    avatar_url: string | null;
    bio: string | null;
  } | null;
}

export interface RSVPRecord {
  id: string;
  event_id: string;
  user_id: string;
  status: RSVPStatus;
  guest_name: string | null;
  guest_email: string | null;
  qr_code: string | null;
  checked_in_at: string | null;
  waitlist_position: number | null;
  notes: string | null;
  created_at: string;
  event?: EventSummary;
}

export interface EventWithRSVP extends EventSummary {
  rsvp_status?: RSVPStatus | null;
  rsvp_id?: string | null;
}
