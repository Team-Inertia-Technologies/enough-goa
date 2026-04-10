import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface ActivityItem {
  id: string;
  type: 'registration' | 'message';
  label: string;
  subtext: string;
  timestamp: string;
}

export interface ChartPoint {
  name: string;
  count: number;
}

export interface DashboardData {
  messagesSent: number;
  peopleOnboard: number;
  activity: ActivityItem[];
  chartData: ChartPoint[];
}

interface UseDashboardReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days  = Math.floor(hours / 24);
  if (days  > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (mins  > 0) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  return 'just now';
}

function dayLabel(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', { weekday: 'short' });
}

export function useDashboard(): UseDashboardReturn {
  const [data, setData]       = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [guestCountRes, sentSumRes, recentGuestsRes, recentBatchesRes, chartRes] =
        await Promise.all([
          // Total guests
          supabase.from('guests').select('id', { count: 'exact', head: true }),

          // Total messages sent (sum of sent_count across all batches)
          supabase.from('message_batches').select('sent_count'),

          // Last 8 guest registrations for activity feed
          supabase
            .from('guests')
            .select('id, addressable_name, given_name, created_at')
            .order('created_at', { ascending: false })
            .limit(8),

          // Last 8 message batches for activity feed
          supabase
            .from('message_batches')
            .select('id, batch_name, total_recipients, created_at')
            .order('created_at', { ascending: false })
            .limit(8),

          // Last 7 days of message batches for chart
          supabase
            .from('message_batches')
            .select('sent_count, created_at')
            .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
            .order('created_at', { ascending: true }),
        ]);

      // People onboard
      const peopleOnboard = guestCountRes.count ?? 0;

      // Messages sent
      const messagesSent = (sentSumRes.data ?? []).reduce(
        (acc: number, row: any) => acc + (row.sent_count ?? 0), 0
      );

      // Activity: merge guests + batches, sort by time, take top 10
      const guestItems: ActivityItem[] = (recentGuestsRes.data ?? []).map((g: any) => ({
        id: `g-${g.id}`,
        type: 'registration' as const,
        label: `New guest registered: ${g.addressable_name}${g.given_name ? ' ' + g.given_name : ''}`,
        subtext: timeAgo(g.created_at),
        timestamp: g.created_at,
      }));

      const batchItems: ActivityItem[] = (recentBatchesRes.data ?? []).map((b: any) => ({
        id: `b-${b.id}`,
        type: 'message' as const,
        label: `Message sent: ${b.batch_name ?? 'Untitled'} (${b.total_recipients} recipients)`,
        subtext: timeAgo(b.created_at),
        timestamp: b.created_at,
      }));

      const activity = [...guestItems, ...batchItems]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 10);

      // Chart: group by day label, sum sent_count
      const dayMap: Record<string, number> = {};
      (chartRes.data ?? []).forEach((row: any) => {
        const key = dayLabel(row.created_at);
        dayMap[key] = (dayMap[key] ?? 0) + (row.sent_count ?? 0);
      });

      // Build last-7-days array in order
      const chartData: ChartPoint[] = [];
      for (let i = 6; i >= 0; i--) {
        const d   = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const key = d.toLocaleDateString('en-IN', { weekday: 'short' });
        chartData.push({ name: key, count: dayMap[key] ?? 0 });
      }

      setData({ messagesSent, peopleOnboard, activity, chartData });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      setData({ messagesSent: 0, peopleOnboard: 0, activity: [], chartData: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return { data, loading, error, refetch: fetchAll };
}
