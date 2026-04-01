import { Calendar } from 'lucide-react';
import type { AppEvent } from '../../types/database';

interface EventsListProps {
  events: AppEvent[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function EventsList({ events }: EventsListProps) {
  if (events.length === 0) {
    return <p className="text-sm text-gray-400 py-4 text-center">No upcoming events.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {events.map((event) => (
        <li key={event.id} className="flex items-start gap-3">
          <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
            <Calendar size={16} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{event.title}</p>
            <p className="text-xs text-gray-500">
              {formatDate(event.event_date)}
              {event.location && ` · ${event.location}`}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
