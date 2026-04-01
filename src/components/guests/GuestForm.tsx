import { useState, FormEvent } from 'react';
import type { Guest, GuestInsert } from '../../types/database';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface GuestFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: GuestInsert) => Promise<void>;
  initial?: Guest;
}

const EMPTY: GuestInsert = {
  name: '',
  phone: '',
  taluka: '',
  village: '',
  invited: false,
  attended: false,
  notes: '',
};

export function GuestForm({ open, onClose, onSubmit, initial }: GuestFormProps) {
  const [form, setForm] = useState<GuestInsert>(initial ? { ...initial } : EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function set<K extends keyof GuestInsert>(key: K, value: GuestInsert[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save guest');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={initial ? 'Edit Guest' : 'Add Guest'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Name" value={form.name} onChange={(e) => set('name', e.target.value)} required />
        <Input label="Phone" value={form.phone} onChange={(e) => set('phone', e.target.value)} required />
        <Input label="Taluka" value={form.taluka} onChange={(e) => set('taluka', e.target.value)} required />
        <Input label="Village" value={form.village ?? ''} onChange={(e) => set('village', e.target.value)} />
        <Input label="Notes" value={form.notes ?? ''} onChange={(e) => set('notes', e.target.value)} />

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.invited}
              onChange={(e) => set('invited', e.target.checked)}
              className="accent-emerald-600"
            />
            Invited
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.attended}
              onChange={(e) => set('attended', e.target.checked)}
              className="accent-emerald-600"
            />
            Attended
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {initial ? 'Save changes' : 'Add guest'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
