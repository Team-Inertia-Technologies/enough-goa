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
        supabase.from('guests').select('id, taluka'),
        supabase.from('message_batches').select('id, sent_count, status'),
        supabase
          .from('events')
          .select('*')
          .order('event_date', { ascending: true })
          .limit(5),
      ]);

      if (guestsRes.error) throw guestsRes.error;
      if (batchesRes.error) throw batchesRes.error;
      // events table is optional — ignore its error

      const guests = (guestsRes.data ?? []) as { id: string; taluka: string }[];
      const batches = (batchesRes.data ?? []) as { id: string; sent_count: number; status: string }[];

      const talukaCounts: Record<string, number> = {};
      for (const g of guests) {
        if (g.taluka) talukaCounts[g.taluka] = (talukaCounts[g.taluka] ?? 0) + 1;
      }

      setStats({
        totalGuests: guests.length,
        totalBatches: batches.length,
        messagesSent: batches.reduce((sum, b) => sum + (b.sent_count ?? 0), 0),
        talukaCounts,
      });

      setRecentEvents((eventsRes.data ?? []) as AppEvent[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      setStats({ totalGuests: 0, totalBatches: 0, messagesSent: 0, talukaCounts: {} });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, recentEvents, loading, error, refetch: fetchStats };
}
