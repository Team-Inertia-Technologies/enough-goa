export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ── Supabase DB shape ──────────────────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      guests: {
        Row: GuestRow;
        Insert: GuestInsert;
        Update: GuestUpdate;
      };
      message_batches: {
        Row: MessageBatchRow;
        Insert: MessageBatchInsert;
        Update: MessageBatchUpdate;
      };
      messages: {
        Row: MessageRow;
        Insert: MessageInsert;
        Update: MessageUpdate;
      };
      events: {
        Row: EventRow;
        Insert: EventInsert;
        Update: EventUpdate;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// ── Guest ──────────────────────────────────────────────────────────────────────

export interface GuestRow {
  id: string;
  name: string;
  mobile: string;      // WhatsApp/phone number
  taluka: string;
  village: string | null;
  email: string | null;
  created_at: string;
}

export type GuestInsert = Omit<GuestRow, 'id' | 'created_at'>;
export type GuestUpdate = Partial<GuestInsert>;

// Friendly alias used throughout the app
export type Guest = GuestRow;

// ── Message Batch ──────────────────────────────────────────────────────────────

export type BatchStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';

export interface MessageBatchRow {
  id: string;
  title: string;       // shown as "Messages" column in UI
  body: string;
  media_url: string | null;
  status: BatchStatus;
  sender: string | null;
  recipient_count: number;
  sent_count: number;
  failed_count: number;
  scheduled_at: string | null;
  created_at: string;
  updated_at: string;
}

export type MessageBatchInsert = Omit<MessageBatchRow, 'id' | 'created_at' | 'updated_at'>;
export type MessageBatchUpdate = Partial<MessageBatchInsert>;

export type MessageBatch = MessageBatchRow;

// ── Message (individual delivery record) ──────────────────────────────────────

export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface MessageRow {
  id: string;
  batch_id: string;
  guest_id: string;
  status: MessageStatus;
  error: string | null;
  sent_at: string | null;
  created_at: string;
}

export type MessageInsert = Omit<MessageRow, 'id' | 'created_at'>;
export type MessageUpdate = Partial<MessageInsert>;

export type Message = MessageRow;

// ── Event ──────────────────────────────────────────────────────────────────────

export interface EventRow {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  event_date: string;
  created_at: string;
}

export type EventInsert = Omit<EventRow, 'id' | 'created_at'>;
export type EventUpdate = Partial<EventInsert>;

export type AppEvent = EventRow;

// ── Guest with joined names ────────────────────────────────────────────────────

export interface GuestWithNames {
  id: string;
  addressable_name: string;
  given_name: string | null;
  whatsapp_number: string | null;
  email: string | null;
  taluka_id: string | null;
  village_id: string | null;
  created_at: string;
  taluka_name: string | null;
  village_name: string | null;
}

// ── Taluka / Village row ───────────────────────────────────────────────────────

export interface TalukaVillageRow {
  id: string;
  village_name: string;
  taluka_id: string | null;
  taluka_name: string | null;
}

// ── App user detail (public.users — for listing) ──────────────────────────────

export interface AppUserDetail {
  id: string;
  username: string;
  email: string;
  full_name: string | null;
  role: string;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
}

// ── MessageBatch (actual DB shape used in app) ────────────────────────────────

export interface MessageBatch {
  id: string;
  template_id: string | null;
  batch_name: string;
  total_recipients: number;
  sent_count: number;
  failed_count: number;
  status: string;
  sent_by: string | null;
  created_at: string;
}

// ── Dashboard stats (computed, not a table) ────────────────────────────────────

export interface DashboardStats {
  totalGuests: number;
  totalBatches: number;
  messagesSent: number;
  talukaCounts: Record<string, number>;
}
