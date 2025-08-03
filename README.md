# 🗓️ Eventify – Tier-Based Event Access with Clerk & Supabase

## ✅ Implemented Features

- Clerk authentication (Google, email/password)
- Supabase backend with `events` table
- Enum-based `tier` column (`free`, `silver`, `gold`, `platinum`)
- Row-Level Security (RLS) enabled on `events` table
- RLS policy filters events based on user tier from Clerk JWT
- JWT template in Clerk named `supabase`
- `tier`, `email`, and `user_id` injected into Clerk JWT
- Default tier assigned as `free` via `publicMetadata`
- Frontend fetches events with tier-respecting Supabase client using JWT token
- No separate user table required in Supabase
