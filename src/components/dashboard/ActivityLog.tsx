interface ActivityItem {
  id: string;
  description: string;
  timestamp: string;
  type?: 'guest' | 'message' | 'event' | 'system';
}

interface ActivityLogProps {
  items: ActivityItem[];
}

const typeColors: Record<string, string> = {
  guest: 'bg-blue-400',
  message: 'bg-emerald-400',
  event: 'bg-purple-400',
  system: 'bg-gray-400',
};

export function ActivityLog({ items }: ActivityLogProps) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-400 py-4 text-center">No recent activity.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-3">
          <span
            className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${typeColors[item.type ?? 'system']}`}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800 truncate">{item.description}</p>
            <p className="text-xs text-gray-400">{item.timestamp}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
