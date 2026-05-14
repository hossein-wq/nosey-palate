export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          avatar_url: string | null;
          bio: string | null;
          city: string | null;
          country: string | null;
          role: "member" | "admin" | "super_admin";
          wine_preferences: Json;
          is_public: boolean;
          onboarded_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          avatar_url?: string | null;
          bio?: string | null;
          city?: string | null;
          country?: string | null;
          role?: "member" | "admin" | "super_admin";
          wine_preferences?: Json;
          is_public?: boolean;
          onboarded_at?: string | null;
        };
        Update: {
          id?: string;
          display_name?: string;
          avatar_url?: string | null;
          bio?: string | null;
          city?: string | null;
          country?: string | null;
          role?: "member" | "admin" | "super_admin";
          wine_preferences?: Json;
          is_public?: boolean;
          onboarded_at?: string | null;
        };
        Relationships: [];
      };
      membership_plans: {
        Row: {
          id: string;
          stripe_product_id: string;
          stripe_price_id_monthly: string | null;
          stripe_price_id_annual: string | null;
          name: string;
          slug: string;
          description: string | null;
          price_monthly: number;
          price_annual: number | null;
          capabilities: Json;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          stripe_product_id: string;
          stripe_price_id_monthly?: string | null;
          stripe_price_id_annual?: string | null;
          name: string;
          slug: string;
          description?: string | null;
          price_monthly: number;
          price_annual?: number | null;
          capabilities?: Json;
          sort_order?: number;
          is_active?: boolean;
        };
        Update: {
          stripe_product_id?: string;
          stripe_price_id_monthly?: string | null;
          stripe_price_id_annual?: string | null;
          name?: string;
          slug?: string;
          description?: string | null;
          price_monthly?: number;
          price_annual?: number | null;
          capabilities?: Json;
          sort_order?: number;
          is_active?: boolean;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan_id: string;
          stripe_subscription_id: string | null;
          stripe_customer_id: string;
          status: "active" | "past_due" | "canceled" | "incomplete" | "trialing" | "paused";
          current_period_start: string | null;
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          plan_id: string;
          stripe_subscription_id?: string | null;
          stripe_customer_id: string;
          status: "active" | "past_due" | "canceled" | "incomplete" | "trialing" | "paused";
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
        };
        Update: {
          user_id?: string;
          plan_id?: string;
          stripe_subscription_id?: string | null;
          stripe_customer_id?: string;
          status?: "active" | "past_due" | "canceled" | "incomplete" | "trialing" | "paused";
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
        };
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          long_description: string | null;
          event_type: "tasting" | "dinner" | "journey" | "experience";
          cover_image: string | null;
          gallery: Json;
          venue_name: string | null;
          venue_address: string | null;
          venue_city: string | null;
          venue_coordinates: Json | null;
          starts_at: string;
          ends_at: string | null;
          capacity: number | null;
          min_plan_slug: string | null;
          required_capabilities: string[];
          price_cents: number;
          is_published: boolean;
          is_featured: boolean;
          host_id: string | null;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          slug: string;
          description?: string | null;
          long_description?: string | null;
          event_type: "tasting" | "dinner" | "journey" | "experience";
          cover_image?: string | null;
          gallery?: Json;
          venue_name?: string | null;
          venue_address?: string | null;
          venue_city?: string | null;
          venue_coordinates?: Json | null;
          starts_at: string;
          ends_at?: string | null;
          capacity?: number | null;
          min_plan_slug?: string | null;
          required_capabilities?: string[];
          price_cents?: number;
          is_published?: boolean;
          is_featured?: boolean;
          host_id?: string | null;
          tags?: string[];
        };
        Update: {
          title?: string;
          slug?: string;
          description?: string | null;
          long_description?: string | null;
          event_type?: "tasting" | "dinner" | "journey" | "experience";
          cover_image?: string | null;
          gallery?: Json;
          venue_name?: string | null;
          venue_address?: string | null;
          venue_city?: string | null;
          venue_coordinates?: Json | null;
          starts_at?: string;
          ends_at?: string | null;
          capacity?: number | null;
          min_plan_slug?: string | null;
          required_capabilities?: string[];
          price_cents?: number;
          is_published?: boolean;
          is_featured?: boolean;
          host_id?: string | null;
          tags?: string[];
        };
        Relationships: [];
      };
      rsvps: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          status: "confirmed" | "waitlisted" | "cancelled" | "checked_in" | "no_show";
          guest_name: string | null;
          guest_email: string | null;
          qr_code: string | null;
          checked_in_at: string | null;
          waitlist_position: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          event_id: string;
          user_id: string;
          status: "confirmed" | "waitlisted" | "cancelled" | "checked_in" | "no_show";
          guest_name?: string | null;
          guest_email?: string | null;
          qr_code?: string | null;
          checked_in_at?: string | null;
          waitlist_position?: number | null;
          notes?: string | null;
        };
        Update: {
          event_id?: string;
          user_id?: string;
          status?: "confirmed" | "waitlisted" | "cancelled" | "checked_in" | "no_show";
          guest_name?: string | null;
          guest_email?: string | null;
          qr_code?: string | null;
          checked_in_at?: string | null;
          waitlist_position?: number | null;
          notes?: string | null;
        };
        Relationships: [];
      };
      tasting_notes: {
        Row: {
          id: string;
          user_id: string;
          event_id: string | null;
          wine_name: string;
          vintage: number | null;
          region: string | null;
          rating: number | null;
          nose: string | null;
          palate: string | null;
          finish: string | null;
          notes: string | null;
          is_public: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          event_id?: string | null;
          wine_name: string;
          vintage?: number | null;
          region?: string | null;
          rating?: number | null;
          nose?: string | null;
          palate?: string | null;
          finish?: string | null;
          notes?: string | null;
          is_public?: boolean;
        };
        Update: {
          user_id?: string;
          event_id?: string | null;
          wine_name?: string;
          vintage?: number | null;
          region?: string | null;
          rating?: number | null;
          nose?: string | null;
          palate?: string | null;
          finish?: string | null;
          notes?: string | null;
          is_public?: boolean;
        };
        Relationships: [];
      };
      loyalty_ledger: {
        Row: {
          id: string;
          user_id: string;
          points: number;
          reason: string;
          event_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          user_id: string;
          points: number;
          reason: string;
          event_id?: string | null;
          metadata?: Json;
        };
        Update: {
          user_id?: string;
          points?: number;
          reason?: string;
          event_id?: string | null;
          metadata?: Json;
        };
        Relationships: [];
      };
      invitations: {
        Row: {
          id: string;
          inviter_id: string;
          event_id: string | null;
          email: string;
          name: string | null;
          token: string;
          status: "pending" | "accepted" | "expired";
          expires_at: string;
          created_at: string;
        };
        Insert: {
          inviter_id: string;
          event_id?: string | null;
          email: string;
          name?: string | null;
          token: string;
          status?: "pending" | "accepted" | "expired";
          expires_at: string;
        };
        Update: {
          inviter_id?: string;
          event_id?: string | null;
          email?: string;
          name?: string | null;
          token?: string;
          status?: "pending" | "accepted" | "expired";
          expires_at?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          body: string | null;
          metadata: Json;
          is_read: boolean;
          channel: "in_app" | "email" | "push";
          sent_at: string;
        };
        Insert: {
          user_id: string;
          type: string;
          title: string;
          body?: string | null;
          metadata?: Json;
          is_read?: boolean;
          channel: "in_app" | "email" | "push";
        };
        Update: {
          user_id?: string;
          type?: string;
          title?: string;
          body?: string | null;
          metadata?: Json;
          is_read?: boolean;
          channel?: "in_app" | "email" | "push";
        };
        Relationships: [];
      };
      journal_articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          cover_image: string | null;
          author_id: string | null;
          category: string | null;
          tags: string[];
          is_published: boolean;
          published_at: string | null;
          created_at: string;
        };
        Insert: {
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          cover_image?: string | null;
          author_id?: string | null;
          category?: string | null;
          tags?: string[];
          is_published?: boolean;
          published_at?: string | null;
        };
        Update: {
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          cover_image?: string | null;
          author_id?: string | null;
          category?: string | null;
          tags?: string[];
          is_published?: boolean;
          published_at?: string | null;
        };
        Relationships: [];
      };
      reactions: {
        Row: {
          id: string;
          user_id: string;
          target_type: "tasting_note" | "event" | "article";
          target_id: string;
          reaction_type: "cheers" | "love" | "insightful";
          created_at: string;
        };
        Insert: {
          user_id: string;
          target_type: "tasting_note" | "event" | "article";
          target_id: string;
          reaction_type: "cheers" | "love" | "insightful";
        };
        Update: {
          user_id?: string;
          target_type?: "tasting_note" | "event" | "article";
          target_id?: string;
          reaction_type?: "cheers" | "love" | "insightful";
        };
        Relationships: [];
      };
      knowledge_base: {
        Row: {
          id: string;
          title: string;
          content: string;
          category: "faq" | "membership" | "events" | "wine" | "policy";
          metadata: Json;
          created_at: string;
        };
        Insert: {
          title: string;
          content: string;
          category: "faq" | "membership" | "events" | "wine" | "policy";
          metadata?: Json;
        };
        Update: {
          title?: string;
          content?: string;
          category?: "faq" | "membership" | "events" | "wine" | "policy";
          metadata?: Json;
        };
        Relationships: [];
      };
    };
    Views: {
      member_loyalty: {
        Row: {
          user_id: string;
          total_points: number;
          loyalty_tier: "explorer" | "connoisseur" | "collector" | "grand_cru";
        };
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
