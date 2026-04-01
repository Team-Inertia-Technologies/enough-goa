// ── App user (public.users table) ─────────────────────────────────────────────

export interface AppUser {
  id: string;
  username: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'moderator' | 'user';
}

// ── Guest (public.guests table) ───────────────────────────────────────────────

export interface Guest {
  id: string;
  addressable_name: string;
  given_name: string | null;
  mobile: string;
  email: string | null;
  taluka_id: string | null;
  village_id: string | null;
  whatsapp_number: string | null;
  is_active: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type GuestInsert = Omit<Guest, 'id' | 'created_at' | 'updated_at'>;
export type GuestUpdate = Partial<GuestInsert>;

// ── Taluka / Village ──────────────────────────────────────────────────────────

export interface Taluka {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Village {
  id: string;
  taluka_id: string | null;
  name: string;
  description: string | null;
  created_at: string;
}

// ── Message Batch (public.message_batches) ────────────────────────────────────

export type BatchStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface MessageBatch {
  id: string;
  template_id: string | null;
  sender_instance_id: string | null;
  taluka_id: string | null;
  batch_name: string | null;
  total_recipients: number;
  sent_count: number;
  delivered_count: number;
  failed_count: number;
  status: BatchStatus;
  sent_by: string | null;
  sent_at: string;
  created_at: string;
}

// ── Dashboard stats (public.dashboard_stats) ──────────────────────────────────

export interface DashboardStat {
  messages_sent: number;
  people_onboard: number;
  active_tasks: number;
  upcoming_events: number;
}
