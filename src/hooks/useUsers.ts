import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { AppUserDetail } from '../types/database';

interface UseUsersReturn {
  users: AppUserDetail[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<AppUserDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('id, username, email, full_name, role, is_active, last_login, created_at')
        .order('created_at', { ascending: false });
      if (fetchError) throw fetchError;
      setUsers((data as AppUserDetail[]) ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
}
