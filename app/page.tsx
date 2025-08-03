'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useSupabaseWithAuth } from './lib/useSupabaseWithAuth';
import { supabasePublic } from './lib/supabasePublicClient';
import Header from './components/Header';
import EventCard from './components/EventCard';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  description?: string;
  event_date?: string;
  image_url?: string;
  tier?: 'Free' | 'Silver' | 'Gold' | 'Platinum';
}

export default function HomePage() {
  const authSupabase = useSupabaseWithAuth(); // for signed-in
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const supabase = isSignedIn ? authSupabase : supabasePublic;

      if (!supabase) return;

      const query = supabase.from('events').select('*').order('event_date', { ascending: false });

      // If not logged in, only fetch Free tier events
      const { data, error } = isSignedIn
        ? await query
        : await query.eq('tier', 'free');

      if (error) {
        console.error('Error fetching events:', error.message);
      } else {
        setEvents(data || []);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [authSupabase, isSignedIn]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="px-6 sm:px-10 py-10">
        <div className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Unlock More Events</h3>
              <p className="text-muted-foreground">
                Upgrade your tier to access premium content and exclusive events.
              </p>
            </div>
            <button className="bg-black hover:bg-black/90 text-white px-4 py-2 rounded">
                  Upgrade Tier
                </button>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>

        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
