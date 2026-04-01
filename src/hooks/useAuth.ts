import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { AppUser } from '../types/database';

interface AuthState {
  user: AppUser | null;
  loading: boolean;
}

interface AuthActions {
  signIn: (login: string, password: string) => Promise<void>;
  signOut: () => void;
}

const SESSION_KEY = 'enough_goa_user';

export function useAuth(): AuthState & AuthActions {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) setUser(JSON.parse(stored) as AppUser);
    } catch {
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Calls the authenticate_user RPC.
   * Password is verified server-side via pgcrypto — hash never sent to browser.
   */
  async function signIn(login: string, password: string): Promise<void> {
    const { data, error } = await supabase.rpc('authenticate_user', {
      p_login: login.trim(),
      p_password: password,
    });

    if (error) throw new Error(error.message);

    const rows = data as AppUser[] | null;
    if (!rows || rows.length === 0) {
      throw new Error('Invalid username/email or password');
    }

    const authedUser = rows[0];
    localStorage.setItem(SESSION_KEY, JSON.stringify(authedUser));
    setUser(authedUser);
  }

  function signOut(): void {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return { user, loading, signIn, signOut };
}
