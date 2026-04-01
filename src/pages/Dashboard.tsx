import { Users, Send, Calendar, CheckSquare } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import { StatCard } from '../components/dashboard/StatCard';
import { ActivityLog } from '../components/dashboard/ActivityLog';
import { EventsList } from '../components/dashboard/EventsList';
import { Spinner } from '../components/ui/Spinner';

export function Dashboard() {
  const { stats, recentEvents, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-sm text-red-700">
        {error ?? 'Failed to load dashboard.'}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          title="Total Guests"
          value={stats.totalGuests}
          icon={<Users size={20} />}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Message Batches"
          value={stats.totalBatches}
          icon={<CheckSquare size={20} />}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Talukas Covered"
          value={Object.keys(stats.talukaCounts).length}
          icon={<CheckSquare size={20} />}
          color="bg-purple-50 text-purple-600"
        />
        <StatCard
          title="Messages Sent"
          value={stats.messagesSent}
          icon={<Send size={20} />}
          color="bg-yellow-50 text-yellow-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming events */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={16} className="text-emerald-600" />
            <h2 className="font-semibold text-gray-800">Upcoming Events</h2>
          </div>
          <EventsList events={recentEvents} />
        </div>

        {/* Activity placeholder — wire to real data when available */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ActivityLog items={[]} />
        </div>
      </div>
    </div>
  );
}
