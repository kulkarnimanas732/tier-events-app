'use client';

import Image from 'next/image';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  description?: string;
  event_date?: string;
  image_url?: string;
  tier?: 'Free' | 'Silver' | 'Gold' | 'Platinum';
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { title, description, event_date, image_url, tier } = event;

  const formattedDate = event_date
    ? format(new Date(event_date), 'MMMM dd, yyyy \'at\' hh:mm a')
    : '';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
      <div className="relative w-full h-48">
        {image_url ? (
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
            No Image
          </div>
        )}
        {tier && (
          <span className="absolute top-3 right-3 bg-white text-gray-700 text-xs font-medium px-3 py-1 rounded-full border shadow-sm">
            {tier}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {event_date && (
          <p className="text-sm text-gray-600 mt-1">📅 {formattedDate}</p>
        )}
        {description && (
          <p className="text-sm text-gray-700 mt-2">{description}</p>
        )}
        <button className="mt-4 bg-gray-900 text-white text-sm font-medium py-2 rounded-md hover:bg-gray-800 transition">
          Register Now
        </button>
      </div>
    </div>
  );
}
