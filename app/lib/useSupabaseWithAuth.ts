'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export function useSupabaseWithAuth(): SupabaseClient | null {
  const { getToken, isSignedIn } = useAuth();
  const [client, setClient] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!isSignedIn) return;

      const token = await getToken({ template: 'supabase' });
      if (!token) return;

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      );

      setClient(supabase);
    };

    init();
  }, [getToken, isSignedIn]);

  return client;
}
