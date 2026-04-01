import { useState } from 'react';
import { Send } from 'lucide-react';
import type { ComposerDraft } from './MessageComposer';
import type { Guest } from '../../types/database';
import { Button } from '../ui/Button';

interface MessagePreviewProps {
  draft: ComposerDraft;
  guests: Guest[];
  onBack: () => void;
  onSend: (selectedIds: string[]) => Promise<void>;
}

export function MessagePreview({ draft, guests, onBack, onSend }: MessagePreviewProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set(guests.map((g) => g.id)));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function toggleAll() {
    if (selected.size === guests.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(guests.map((g) => g.id)));
    }
  }

  function toggleGuest(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function handleSend() {
    setError('');
    setLoading(true);
    try {
      await onSend([...selected]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Preview bubble */}
      <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-100">
        <p className="text-xs font-semibold text-emerald-700 mb-2">Message preview</p>
        {draft.mediaUrl && (
          <img src={draft.mediaUrl} alt="media" className="mb-2 max-h-40 rounded-lg object-cover" />
        )}
        <p className="text-sm text-gray-800 whitespace-pre-wrap">{draft.body}</p>
      </div>

      {/* Recipient selector */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-medium text-gray-700">
            Recipients ({selected.size} / {guests.length})
          </p>
          <button onClick={toggleAll} className="text-xs text-emerald-600 hover:underline">
            {selected.size === guests.length ? 'Deselect all' : 'Select all'}
          </button>
        </div>
        <ul className="max-h-60 overflow-y-auto divide-y divide-gray-50">
          {guests.map((g) => (
            <li key={g.id} className="flex items-center gap-3 px-4 py-2.5">
              <input
                type="checkbox"
                checked={selected.has(g.id)}
                onChange={() => toggleGuest(g.id)}
                className="accent-emerald-600"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">{g.name}</p>
                <p className="text-xs text-gray-500">{g.phone} · {g.taluka}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={handleSend} loading={loading} disabled={selected.size === 0}>
          <Send size={15} />
          Send to {selected.size} guests
        </Button>
      </div>
    </div>
  );
}
