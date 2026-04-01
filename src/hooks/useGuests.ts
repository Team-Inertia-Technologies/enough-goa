import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Guest, GuestInsert, GuestUpdate } from '../types/database';

interface UseGuestsReturn {
  guests: Guest[];
  loading: boolean;
  error: string | null;
  addGuest: (data: GuestInsert) => Promise<Guest>;
  updateGuest: (id: string, data: GuestUpdate) => Promise<Guest>;
  deleteGuest: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useGuests(talukaFilter?: string): UseGuestsReturn {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('guests').select('*').order('created_at', { ascending: false });
      if (talukaFilter) query = query.eq('taluka', talukaFilter);

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setGuests(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch guests');
    } finally {
      setLoading(false);
    }
  }, [talukaFilter]);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  async function addGuest(data: GuestInsert): Promise<Guest> {
    const { data: inserted, error } = await supabase
      .from('guests')
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    setGuests((prev) => [inserted, ...prev]);
    return inserted;
  }

  async function updateGuest(id: string, data: GuestUpdate): Promise<Guest> {
    const { data: updated, error } = await supabase
      .from('guests')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    setGuests((prev) => prev.map((g) => (g.id === id ? updated : g)));
    return updated;
  }

  async function deleteGuest(id: string): Promise<void> {
    const { error } = await supabase.from('guests').delete().eq('id', id);
    if (error) throw error;
    setGuests((prev) => prev.filter((g) => g.id !== id));
  }

  return {
    guests,
    loading,
    error,
    addGuest,
    updateGuest,
    deleteGuest,
    refetch: fetchGuests,
  };
}
