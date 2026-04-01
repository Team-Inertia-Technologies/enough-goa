import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props}
        id={inputId}
        className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition
          focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
          ${error ? 'border-red-400' : 'border-gray-300'}
          disabled:bg-gray-50 disabled:cursor-not-allowed ${className}`}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
