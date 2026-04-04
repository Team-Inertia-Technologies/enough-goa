import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { DashboardStat } from '../types/database';

interface UseDashboardReturn {
  stats: DashboardStat | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
  const [stats, setStats] = useState<DashboardStat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchStats() {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('dashboard_stats')
        .select('messages_sent, people_onboard, active_tasks, upcoming_events')
        .order('stat_date', { ascending: false })
        .limit(1)
        .single();

      if (fetchError) throw fetchError;
      setStats(data as DashboardStat);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stats');
      setStats({ messages_sent: 0, people_onboard: 0, active_tasks: 0, upcoming_events: 0 });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchStats(); }, []);

  return { stats, loading, error, refetch: fetchStats };
}
