import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { TalukaVillageRow } from '../types/database';

interface UseTalukasReturn {
  rows: TalukaVillageRow[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTalukas(): UseTalukasReturn {
  const [rows, setRows] = useState<TalukaVillageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('villages')
        .select('id, name, taluka_id, talukas!taluka_id(name)')
        .order('name');
      if (fetchError) throw fetchError;
      const mapped: TalukaVillageRow[] = (data ?? []).map((row: any) => ({
        id: row.id as string,
        village_name: row.name as string,
        taluka_id: row.taluka_id as string | null,
        taluka_name: (row.talukas as { name: string } | null)?.name ?? null,
      }));
      setRows(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch talukas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRows(); }, [fetchRows]);

  return { rows, loading, error, refetch: fetchRows };
}
