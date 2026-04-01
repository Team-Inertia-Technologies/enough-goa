import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { MessageBatch, MessageBatchInsert, MessageBatchUpdate } from '../types/database';

interface UseMessagesReturn {
  batches: MessageBatch[];
  loading: boolean;
  error: string | null;
  createBatch: (data: MessageBatchInsert) => Promise<MessageBatch>;
  updateBatch: (id: string, data: MessageBatchUpdate) => Promise<MessageBatch>;
  deleteBatch: (id: string) => Promise<void>;
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
      setBatches(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch batches');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  async function createBatch(data: MessageBatchInsert): Promise<MessageBatch> {
    const { data: created, error } = await supabase
      .from('message_batches')
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    setBatches((prev) => [created, ...prev]);
    return created;
  }

  async function updateBatch(id: string, data: MessageBatchUpdate): Promise<MessageBatch> {
    const { data: updated, error } = await supabase
      .from('message_batches')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    setBatches((prev) => prev.map((b) => (b.id === id ? updated : b)));
    return updated;
  }

  async function deleteBatch(id: string): Promise<void> {
    const { error } = await supabase.from('message_batches').delete().eq('id', id);
    if (error) throw error;
    setBatches((prev) => prev.filter((b) => b.id !== id));
  }

  return {
    batches,
    loading,
    error,
    createBatch,
    updateBatch,
    deleteBatch,
    refetch: fetchBatches,
  };
}
