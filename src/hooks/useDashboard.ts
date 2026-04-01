import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { DashboardStats, AppEvent } from '../types/database';

interface UseDashboardReturn {
  stats: DashboardStats | null;
  recentEvents: AppEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const DEFAULT_STATS: DashboardStats = {
  totalGuests: 0,
  invitedGuests: 0,
  attendedGuests: 0,
  totalBatches: 0,
  messagesSent: 0,
  talukaCounts: {},
};

export function useDashboard(): UseDashboardReturn {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentEvents, setRecentEvents] = useState<AppEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchStats() {
    setLoading(true);
    setError(null);
    try {
      const [guestsRes, batchesRes, eventsRes] = await Promise.all([
        supabase.from('guests').select('id, invited, attended, taluka'),
        supabase.from('message_batches').select('id, sent_count, status'),
        supabase
          .from('events')
          .select('*')
          .order('event_date', { ascending: true })
          .limit(5),
      ]);

      if (guestsRes.error) throw guestsRes.error;
      if (batchesRes.error) throw batchesRes.error;
      if (eventsRes.error) throw eventsRes.error;

      const guests = guestsRes.data ?? [];
      const batches = batchesRes.data ?? [];

      const talukaCounts: Record<string, number> = {};
      for (const g of guests) {
        if (g.taluka) talukaCounts[g.taluka] = (talukaCounts[g.taluka] ?? 0) + 1;
      }

      setStats({
        totalGuests: guests.length,
        invitedGuests: guests.filter((g) => g.invited).length,
        attendedGuests: guests.filter((g) => g.attended).length,
        totalBatches: batches.length,
        messagesSent: batches.reduce((sum, b) => sum + (b.sent_count ?? 0), 0),
        talukaCounts,
      });

      setRecentEvents(eventsRes.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      setStats(DEFAULT_STATS);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, recentEvents, loading, error, refetch: fetchStats };
}
