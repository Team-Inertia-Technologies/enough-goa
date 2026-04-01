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
  mobile: '',
  taluka: '',
  village: '',
  email: '',
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
        <Input label="Mobile" value={form.mobile} onChange={(e) => set('mobile', e.target.value)} required />
        <Input label="Taluka" value={form.taluka} onChange={(e) => set('taluka', e.target.value)} required />
        <Input label="Village" value={form.village ?? ''} onChange={(e) => set('village', e.target.value)} />
        <Input label="Email" type="email" value={form.email ?? ''} onChange={(e) => set('email', e.target.value)} />

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
