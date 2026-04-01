import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: string;
  subtitle?: string;
}

export function StatCard({ title, value, icon, color = 'bg-emerald-50 text-emerald-700', subtitle }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm flex items-start gap-4">
      <div className={`rounded-lg p-2.5 ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
