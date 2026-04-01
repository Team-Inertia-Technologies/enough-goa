import { Trash2 } from 'lucide-react';
import type { MessageBatch } from '../../types/database';
import { Spinner } from '../ui/Spinner';

interface BatchListProps {
  batches: MessageBatch[];
  loading: boolean;
  onDelete: (id: string) => void;
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  scheduled: 'bg-blue-100 text-blue-700',
  sending: 'bg-yellow-100 text-yellow-700',
  sent: 'bg-emerald-100 text-emerald-700',
  failed: 'bg-red-100 text-red-700',
};

export function BatchList({ batches, loading, onDelete }: BatchListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  if (batches.length === 0) {
    return <p className="py-8 text-center text-sm text-gray-400">No message batches yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {batches.map((batch) => (
        <li key={batch.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-semibold text-gray-800 truncate">{batch.title}</p>
              <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[batch.status]}`}>
                {batch.status}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {batch.sent_count} sent · {batch.failed_count} failed · {batch.recipient_count} total
            </p>
          </div>
          <button
            onClick={() => onDelete(batch.id)}
            className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={15} />
          </button>
        </li>
      ))}
    </ul>
  );
}
