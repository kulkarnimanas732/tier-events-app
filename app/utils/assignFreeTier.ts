import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function assignFreeTier(clerkId: string, email: string) {
  const { error } = await supabase.from('users').insert([
    {
      clerk_id: clerkId,
      email: email,
      tier: 'free',
    },
  ]);

  if (error) {
    console.error('Failed to assign user:', error.message);
  } else {
    console.log('User stored in Supabase');
  }
}
