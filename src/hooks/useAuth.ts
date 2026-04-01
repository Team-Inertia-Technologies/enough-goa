import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// ── Types ──────────────────────────────────────────────────────────────────────

export interface AppUser {
  id: string;
  username: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'moderator' | 'user';
}

interface AuthState {
  user: AppUser | null;
  loading: boolean;
}

interface AuthActions {
  signIn: (login: string, password: string) => Promise<void>;
  signOut: () => void;
}

const SESSION_KEY = 'enough_goa_user';

// ── Hook ───────────────────────────────────────────────────────────────────────

export function useAuth(): AuthState & AuthActions {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate session from localStorage on mount
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
   * Calls the `authenticate_user` Postgres RPC.
   * Password comparison happens entirely server-side via pgcrypto —
   * the hash is never sent to the browser.
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

  // Kept for API compatibility with the forgot-password flow in App.tsx
  // (actual email delivery requires an edge function — placeholder for now)
  async function resetPassword(_email: string): Promise<void> {
    // TODO: implement via Supabase Edge Function + password_reset_tokens table
    return Promise.resolve();
  }

  return { user, loading, signIn, signOut, resetPassword } as AuthState &
    AuthActions & { resetPassword: (e: string) => Promise<void> };
}
