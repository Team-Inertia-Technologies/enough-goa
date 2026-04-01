interface TalukaFilterProps {
  talukas: string[];
  selected: string;
  onChange: (taluka: string) => void;
}

export function TalukaFilter({ talukas, selected, onChange }: TalukaFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('')}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors
          ${selected === '' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
      >
        All
      </button>
      {talukas.map((taluka) => (
        <button
          key={taluka}
          onClick={() => onChange(taluka)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors
            ${selected === taluka ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          {taluka}
        </button>
      ))}
    </div>
  );
}
