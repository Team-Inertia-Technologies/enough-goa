import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { GuestInsert, GuestUpdate, GuestWithNames } from '../types/database';

const GUEST_SELECT = '*, talukas!taluka_id(name), villages!village_id(name)';

function mapGuest(row: any): GuestWithNames {
  return {
    ...row,
    taluka_name: (row.talukas as { name: string } | null)?.name ?? null,
    village_name: (row.villages as { name: string } | null)?.name ?? null,
  };
}

interface UseGuestsReturn {
  guests: GuestWithNames[];
  loading: boolean;
  error: string | null;
  addGuest: (data: GuestInsert) => Promise<GuestWithNames>;
  updateGuest: (id: string, data: GuestUpdate) => Promise<GuestWithNames>;
  deleteGuest: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useGuests(): UseGuestsReturn {
  const [guests, setGuests] = useState<GuestWithNames[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('guests')
        .select(GUEST_SELECT)
        .order('created_at', { ascending: false });
      if (fetchError) throw fetchError;
      setGuests((data ?? []).map(mapGuest));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch guests');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchGuests(); }, [fetchGuests]);

  async function addGuest(data: GuestInsert): Promise<GuestWithNames> {
    const { data: inserted, error } = await supabase.from('guests').insert(data).select(GUEST_SELECT).single();
    if (error) throw error;
    const guest = mapGuest(inserted);
    setGuests(prev => [guest, ...prev]);
    return guest;
  }

  async function updateGuest(id: string, data: GuestUpdate): Promise<GuestWithNames> {
    const { data: updated, error } = await supabase.from('guests').update(data).eq('id', id).select(GUEST_SELECT).single();
    if (error) throw error;
    const guest = mapGuest(updated);
    setGuests(prev => prev.map(g => g.id === id ? guest : g));
    return guest;
  }

  async function deleteGuest(id: string): Promise<void> {
    const { error } = await supabase.from('guests').delete().eq('id', id);
    if (error) throw error;
    setGuests(prev => prev.filter(g => g.id !== id));
  }

  return { guests, loading, error, addGuest, updateGuest, deleteGuest, refetch: fetchGuests };
}
