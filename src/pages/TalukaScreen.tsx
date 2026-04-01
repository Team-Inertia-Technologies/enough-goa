import { useState, useMemo } from 'react';
import { useGuests } from '../hooks/useGuests';
import { GuestTable } from '../components/guests/GuestTable';
import { GuestForm } from '../components/guests/GuestForm';
import { TalukaFilter } from '../components/guests/TalukaFilter';
import type { Guest, GuestInsert } from '../types/database';

export function TalukaScreen() {
  const [selectedTaluka, setSelectedTaluka] = useState('');
  const { guests, loading, addGuest, updateGuest, deleteGuest } = useGuests();

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Guest | undefined>();

  const talukas = useMemo(
    () => [...new Set(guests.map((g) => g.taluka).filter(Boolean))].sort(),
    [guests]
  );

  const filtered = selectedTaluka
    ? guests.filter((g) => g.taluka === selectedTaluka)
    : guests;

  function openAdd() {
    setEditTarget(undefined);
    setFormOpen(true);
  }

  function openEdit(guest: Guest) {
    setEditTarget(guest);
    setFormOpen(true);
  }

  async function handleSubmit(data: GuestInsert) {
    if (editTarget) {
      await updateGuest(editTarget.id, data);
    } else {
      await addGuest(data);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold text-gray-900">Guests by Taluka</h1>

      <TalukaFilter talukas={talukas} selected={selectedTaluka} onChange={setSelectedTaluka} />

      <GuestTable
        guests={filtered}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={deleteGuest}
      />

      <GuestForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initial={editTarget}
      />
    </div>
  );
}
