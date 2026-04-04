import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { MessageBatch } from '../types/database';

interface UseMessagesReturn {
  batches: MessageBatch[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMessages(): UseMessagesReturn {
  const [batches, setBatches] = useState<MessageBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBatches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('message_batches')
        .select('*')
        .order('created_at', { ascending: false });
      if (fetchError) throw fetchError;
      setBatches((data as MessageBatch[]) ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch batches');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBatches(); }, [fetchBatches]);

  return { batches, loading, error, refetch: fetchBatches };
}
