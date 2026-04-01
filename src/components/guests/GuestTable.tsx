import { useState } from 'react';
import { Edit, Trash2, UserPlus } from 'lucide-react';
import type { Guest } from '../../types/database';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';

interface GuestTableProps {
  guests: Guest[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (guest: Guest) => void;
  onDelete: (id: string) => void;
}

export function GuestTable({ guests, loading, onAdd, onEdit, onDelete }: GuestTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h2 className="font-semibold text-gray-800">Guests</h2>
        <Button size="sm" onClick={onAdd}>
          <UserPlus size={15} />
          Add Guest
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : guests.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-400">No guests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Taluka</th>
                <th className="px-5 py-3">Village</th>
                <th className="px-5 py-3">Invited</th>
                <th className="px-5 py-3">Attended</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {guests.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3 font-medium text-gray-800">{guest.name}</td>
                  <td className="px-5 py-3 text-gray-600">{guest.phone}</td>
                  <td className="px-5 py-3 text-gray-600">{guest.taluka}</td>
                  <td className="px-5 py-3 text-gray-600">{guest.village ?? '—'}</td>
                  <td className="px-5 py-3">
                    <StatusBadge active={guest.invited} />
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge active={guest.attended} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(guest)}
                        className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(guest.id)}
                        disabled={deletingId === guest.id}
                        className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                      >
                        {deletingId === guest.id ? <Spinner size="sm" /> : <Trash2 size={15} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
        ${active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}
    >
      {active ? 'Yes' : 'No'}
    </span>
  );
}
