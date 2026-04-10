/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { supabase } from './lib/supabase';
import { useAuth } from './hooks/useAuth';
import { useGuests } from './hooks/useGuests';
import { useUsers } from './hooks/useUsers';
import { useTalukas } from './hooks/useTalukas';
import { useDashboard } from './hooks/useDashboard';
import { useMessages } from './hooks/useMessages';
import {
  Eye,
  EyeOff,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Users,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Calendar,
  CheckSquare,
  BarChart3,
  UserPlus,
  QrCode,
  X,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Smile,
  Paperclip,
  Trash2,
  Video,
  Phone,
  CheckCircle2,
  ChevronLeft,
  RefreshCw,
  Edit,
  Send,
  MoreVertical,
  Settings,
  FileText,
  FileSpreadsheet,
  Printer,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

// --- Types ---
type Page = "dashboard" | "taluka" | "communication" | "users" | "guests";

// --- Mock Data ---
const rsvpData = [
  { name: "Mon", count: 40 },
  { name: "Tue", count: 30 },
  { name: "Wed", count: 45 },
  { name: "Thu", count: 25 },
  { name: "Fri", count: 55 },
  { name: "Sat", count: 70 },
  { name: "Sun", count: 60 },
];

const stats = [
  { label: "Messages Sent", value: "12,450", icon: MessageSquare, color: "bg-blue-100 text-blue-600" },
  { label: "People Onboard", value: "3,200", icon: UserPlus, color: "bg-green-100 text-green-600" },
  { label: "Active Tasks", value: "12", icon: CheckSquare, color: "bg-purple-100 text-purple-600" },
  { label: "Upcoming Events", value: "5", icon: Calendar, color: "bg-orange-100 text-orange-600" },
];

// --- Components ---

const Sidebar = ({ activePage, setActivePage, onLogout }: {
  activePage: Page;
  setActivePage: (page: Page) => void;
  onLogout: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "guests", label: "Guests", icon: Users },
    { id: "taluka", label: "Taluka/Village", icon: MapPin },
    { id: "communication", label: "Communication Hub", icon: MessageSquare },
    { id: "users", label: "Users", icon: Settings },
  ];

  // console.log('llll');
  

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ width: isHovered ? 256 : 80 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden whitespace-nowrap z-20"
    >
      <motion.div 
        layout
        className={`h-20 flex items-center overflow-hidden ${isHovered ? 'px-6' : 'px-0 justify-center'}`}
      >
        <AnimatePresence mode="wait">
          {isHovered ? (
            <motion.h1
              key="logo-full"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-2xl font-bold italic uppercase tracking-normal text-[#1B1A16]"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              ENOUGH IS ENOUGH
            </motion.h1>
          ) : (
            <motion.h1
              key="logo-short"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-2xl font-bold italic uppercase tracking-normal text-[#1B1A16]"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              EIE
            </motion.h1>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.nav 
        layout
        className={`flex-1 space-y-1 mt-4 ${isHovered ? 'px-4' : 'px-3'}`}
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id as Page)}
            className={`w-full flex items-center h-12 rounded-lg transition-colors overflow-hidden ${
              isHovered ? 'px-3' : 'justify-center'
            } ${
              activePage === item.id
                ? "bg-[#FFE400] text-[#1B1A16]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <motion.div layout className="flex-shrink-0 flex justify-center items-center w-6">
              <item.icon size={20} />
            </motion.div>
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 12 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </motion.nav>

      <motion.div 
        layout
        className={`p-4 border-t border-gray-200 ${isHovered ? 'px-4' : 'px-3'}`}
      >
        <button
          onClick={onLogout}
          className={`w-full flex items-center h-12 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors overflow-hidden ${
            isHovered ? 'px-3' : 'justify-center'
          }`}
        >
          <motion.div layout className="flex-shrink-0 flex justify-center items-center w-6">
            <LogOut size={20} />
          </motion.div>
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 12 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-medium whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </motion.div>
  );
};

const Header = ({ user }: { user: any }) => {
  const displayName = user?.full_name || user?.username || "User";
  const initials = displayName.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
  const roleLabel = user?.role === "admin" ? "Administrator" : user?.role === "moderator" ? "Moderator" : "User";
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8 sticky top-0 z-10">
      <div className="flex items-center space-x-6">
        <button className="relative text-gray-500 hover:text-gray-700">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-3 border-l pl-6 border-gray-200">
          <div className="text-right">
            <p className="text-sm font-bold">{displayName}</p>
            <p className="text-xs text-gray-500">{roleLabel}</p>
          </div>
          <div className="w-10 h-10 bg-[#1B1A16] rounded-full flex items-center justify-center text-white font-bold">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
};

const MessageBatchView = ({ message, onBack }: { message: any; onBack: () => void }) => {
  const [activeTab, setActiveTab]     = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [recipients, setRecipients]   = useState<any[]>([]);
  const [template, setTemplate]       = useState<any | null>(null);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [recRes, tmplRes] = await Promise.all([
        supabase
          .from('message_recipients')
          .select('*')
          .eq('batch_id', message.id)
          .order('created_at', { ascending: true }),
        message.template_id
          ? supabase.from('message_templates').select('*').eq('id', message.template_id).single()
          : Promise.resolve({ data: null }),
      ]);
      setRecipients(recRes.data ?? []);
      setTemplate((tmplRes as any).data ?? null);
      setLoading(false);
    }
    load();
  }, [message.id, message.template_id]);

  const statusLabel: Record<string, string> = {
    sent: 'Sent', failed: 'Failed', not_sent: 'Not Sent', partially_completed: 'Partial',
  };
  const statusStyle: Record<string, string> = {
    sent:     'bg-green-50 text-green-600',
    failed:   'bg-red-50 text-red-600',
    not_sent: 'bg-gray-100 text-gray-600',
  };

  const tabDefs = [
    { key: 'All',      label: 'All' },
    { key: 'sent',     label: 'Sent' },
    { key: 'failed',   label: 'Failed' },
    { key: 'not_sent', label: 'Not Sent' },
  ];

  const filteredRecipients = activeTab === 'All'
    ? recipients
    : recipients.filter(r => r.status === activeTab);

  const batchName   = message.template_name ?? message.batch_name ?? 'Untitled';
  const sentDate    = message.created_at ? new Date(message.created_at) : null;
  const previewText = template?.content ?? '—';

  return (
    <div className="p-8 space-y-6">
      {/* Back */}
      <button onClick={onBack} className="flex items-center text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
        <ChevronLeft size={18} className="mr-1" /> Back
      </button>

      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="space-y-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Batch</p>
          <h2 className="text-2xl font-bold text-[#1B1A16]">{batchName}</h2>
          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
            <span>Total: <strong>{message.total_recipients}</strong></span>
            <span>Sent: <strong className="text-green-600">{message.sent_count}</strong></span>
            <span>Failed: <strong className="text-red-600">{message.failed_count}</strong></span>
            {sentDate && <span>Date: <strong>{sentDate.toLocaleDateString('en-IN')}</strong></span>}
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
          message.status === 'completed' ? 'bg-green-100 text-green-700' :
          message.status === 'failed'    ? 'bg-red-100 text-red-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>{message.status}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Phone Preview */}
        <div className="w-full lg:w-[350px] flex-shrink-0">
          <div className="bg-[#1B1A16] rounded-[40px] p-3 shadow-2xl relative border-[6px] border-[#7C5275] h-[600px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1B1A16] rounded-b-2xl z-20 flex items-center justify-center">
              <div className="w-10 h-1 bg-gray-800 rounded-full"></div>
            </div>
            <div className="w-full h-full bg-[#E5DDD5] rounded-[30px] overflow-hidden relative flex flex-col">
              <div className="bg-[#075E54] p-4 pt-8 flex items-center justify-between text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Portal</p>
                    <p className="text-[10px] opacity-80">WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4"><Video size={18} /><Phone size={18} /></div>
              </div>
              <div className="flex-1 p-4 space-y-4 relative overflow-y-auto">
                {sentDate && (
                  <div className="bg-gray-400/30 text-center py-1 rounded text-[10px] font-medium text-gray-600 relative z-10">
                    {sentDate.toLocaleDateString('en-IN')}
                  </div>
                )}
                <div className="max-w-[85%] bg-white rounded-lg rounded-tl-none p-3 shadow-sm relative z-10">
                  {template?.media_url && (
                    <div className="mb-2 rounded overflow-hidden">
                      <img src={template.media_url} alt="media" className="w-full h-auto max-h-[150px] object-cover" />
                    </div>
                  )}
                  <div className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
                    {batchName && <p className="font-bold mb-1 uppercase">{batchName}</p>}
                    {previewText}
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-[9px] text-gray-400">
                      {sentDate ? sentDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Tabs + Table */}
        <div className="flex-1 space-y-6">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabDefs.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setSelectedIds([]); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#1B1A16] text-white shadow-md'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {tab.label}: {tab.key === 'All' ? recipients.length : recipients.filter(r => r.status === tab.key).length}
              </button>
            ))}
          </div>

          {/* Info Banner */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2">
            {[
              'Delivery is subject to the recipient being in a network/WiFi coverage area.',
              'Messages will be marked as "Failed" if the recipient\'s WhatsApp number is wrong.',
              'Sent time reflects when the message was dispatched from the portal.',
            ].map((tip, i) => (
              <div key={i} className="flex items-start space-x-2 text-[11px] text-gray-500">
                <div className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">i</div>
                <span>{tip}</span>
              </div>
            ))}
          </div>

          {/* Recipient Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 w-10">
                    <input type="checkbox" className="rounded border-gray-300 cursor-pointer"
                      checked={filteredRecipients.length > 0 && selectedIds.length === filteredRecipients.length}
                      onChange={() => setSelectedIds(selectedIds.length === filteredRecipients.length ? [] : filteredRecipients.map(r => r.id))}
                    />
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200 text-center">Addressable Name</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200 text-center">Given Name</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200 text-center">WhatsApp Number</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200 text-center">Status</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200 text-center">Sent At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400 italic">Loading…</td></tr>
                ) : filteredRecipients.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-500 italic">No recipients for "{activeTab}"</td></tr>
                ) : (
                  filteredRecipients.map((rec, idx) => (
                    <tr key={rec.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <input type="checkbox" className="rounded border-gray-300 cursor-pointer"
                          checked={selectedIds.includes(rec.id)}
                          onChange={() => setSelectedIds(prev => prev.includes(rec.id) ? prev.filter(x => x !== rec.id) : [...prev, rec.id])}
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{idx + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 border-l border-gray-200 text-center">{rec.addressable_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 border-l border-gray-200 text-center">{rec.given_name ?? '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 border-l border-gray-200 text-center">{rec.whatsapp_number}</td>
                      <td className="px-4 py-3 border-l border-gray-200 text-center">
                        <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${statusStyle[rec.status] ?? 'bg-gray-50 text-gray-500'}`}>
                          {statusLabel[rec.status] ?? rec.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 border-l border-gray-200 text-center">
                        {rec.sent_at ? new Date(rec.sent_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const TalukaListingContent = () => {
  const { rows: talukaRows, loading: talukasLoading } = useTalukas();
  const [searchTerm, setSearchTerm]       = useState("");
  const [talukaFilter, setTalukaFilter]   = useState("All");
  const [villageFilter, setVillageFilter] = useState("All");

  // Unique taluka names for the first dropdown
  const talukaOptions = ["All", ...Array.from(
    new Set(talukaRows.map(r => r.taluka_name ?? "").filter(Boolean))
  ).sort()];

  // Village options filtered by selected taluka
  const villageOptions = ["All", ...talukaRows
    .filter(r => talukaFilter === "All" || r.taluka_name === talukaFilter)
    .map(r => r.village_name)
    .filter(Boolean)
    .sort()
    .filter((v, i, arr) => arr.indexOf(v) === i)
  ];

  const filteredData = talukaRows.filter(item => {
    const talukaMatch  = talukaFilter  === "All" || item.taluka_name  === talukaFilter;
    const villageMatch = villageFilter === "All" || item.village_name === villageFilter;
    const searchMatch  =
      (item.taluka_name  ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.village_name.toLowerCase().includes(searchTerm.toLowerCase());
    return talukaMatch && villageMatch && searchMatch;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1A16]">Taluka & Villages</h2>
          <p className="text-sm text-gray-500">Manage your talukas and villages listing</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-[#1B1A16] text-white rounded-xl font-bold hover:bg-[#2d2c26] transition-all shadow-lg">
          <Plus size={20} />
          <span>Add New</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex flex-wrap gap-4 items-end">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search taluka or village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#FFE400] outline-none transition-all"
            />
          </div>
          {/* Taluka Dropdown */}
          <div className="space-y-1 min-w-[180px]">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Taluka</label>
            <select
              value={talukaFilter}
              onChange={(e) => { setTalukaFilter(e.target.value); setVillageFilter("All"); }}
              className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#FFE400] outline-none transition-all"
            >
              {talukaOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          {/* Village Dropdown */}
          <div className="space-y-1 min-w-[180px]">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Village</label>
            <select
              value={villageFilter}
              onChange={(e) => setVillageFilter(e.target.value)}
              className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#FFE400] outline-none transition-all"
            >
              {villageOptions.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Listing Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Taluka Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Village Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {talukasLoading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">Loading…</td></tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
                    No records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.taluka_name ?? '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.village_name}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-500">Showing {filteredData.length} of {talukaRows.length} entries</p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-xs font-medium text-gray-500 hover:bg-white transition-all">Previous</button>
            <button className="px-3 py-1 bg-[#1B1A16] text-white rounded-lg text-xs font-bold shadow-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-xs font-medium text-gray-500 hover:bg-white transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

function formatDate(ts: string | null | undefined): string {
  if (!ts) return '—';
  return new Date(ts).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

const UsersListingContent = () => {
  const { users, loading: usersLoading } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      (user.full_name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && user.is_active) ||
      (statusFilter === "Inactive" && !user.is_active);
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#1B1A16]">User Management</h2>
          <p className="text-sm text-gray-500">Manage system users and their access levels</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-[#1B1A16] text-white rounded-xl font-bold hover:bg-[#2d2c26] transition-all shadow-lg">
          <Plus size={20} />
          <span>Add New User</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, username or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#FFE400] outline-none transition-all"
            />
          </div>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#FFE400] outline-none bg-white transition-all"
          >
            <option value="All">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>

          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#FFE400] outline-none bg-white transition-all"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Listing Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User Info</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usersLoading ? (
                <tr><td colSpan={8} className="px-6 py-12 text-center text-gray-400 italic">Loading…</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500 italic">
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => {
                  const displayName = user.full_name || user.username;
                  const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
                  return (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs">
                            {initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{displayName}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.username}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                          user.role === "admin" ? "bg-purple-100 text-purple-700" :
                          user.role === "moderator" ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">{formatDate(user.created_at)}</td>
                      <td className="px-6 py-4 text-xs text-gray-500">{formatDate(user.last_login)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          user.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-500">Showing {filteredUsers.length} of {users.length} users</p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-xs font-medium text-gray-500 hover:bg-white transition-all">Previous</button>
            <button className="px-3 py-1 bg-[#1B1A16] text-white rounded-lg text-xs font-bold shadow-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-xs font-medium text-gray-500 hover:bg-white transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TalukaVillageContent = () => {
  const { guests, loading: guestsLoading } = useGuests();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Template Form State
  const [templateName, setTemplateName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  async function uploadMedia(file: File): Promise<string> {
    const ext = file.name.split('.').pop();
    const path = `whatsapp/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('media').upload(path, file, { upsert: true });
    if (error) throw new Error(`Media upload failed: ${error.message}`);
    const { data } = supabase.storage.from('media').getPublicUrl(path);
    return data.publicUrl;
  }

  function substituteFields(text: string, guest: typeof guests[0]): string {
    return text
      .replace(/\{addressable-name\}/g, guest.addressable_name)
      .replace(/\{given-name\}/g, guest.given_name ?? '')
      .replace(/\{rsvp-link\}/g, '[RSVP Link]')
      .replace(/\{arrival-details\}/g, '[Arrival Details]')
      .replace(/\{departure-details\}/g, '[Departure Details]')
      .replace(/\{hotel-details\}/g, '[Hotel Details]');
  }

  async function handleSend() {
    if (!messageText.trim()) {
      setSendError('Please enter a message before sending.');
      return;
    }
    setSending(true);
    setSendError(null);

    try {
      const currentUser = JSON.parse(localStorage.getItem('enough_goa_user') || 'null');
      const userId: string | null = currentUser?.id ?? null;

      // Upload media once if attached
      let mediaUrl: string | null = null;
      if (mediaFile) mediaUrl = await uploadMedia(mediaFile);

      const guestsToSend = guests.filter(g => selectedGuests.includes(g.id));
      const batchName = templateName.trim() || 'Untitled';

      // 1. Log template
      const { data: tmpl } = await supabase
        .from('message_templates')
        .insert({ name: batchName, content: messageText, media_url: mediaUrl, media_type: mediaFile?.type ?? null, created_by: userId })
        .select('id').single();

      // 2. Create batch
      const { data: batch } = await supabase
        .from('message_batches')
        .insert({ template_id: tmpl?.id ?? null, batch_name: batchName, total_recipients: guestsToSend.length, status: 'processing', sent_by: userId })
        .select('id').single();

      // 3. Send each guest and log recipient row
      const errors: string[] = [];
      let sentCount = 0, failedCount = 0;

      for (const guest of guestsToSend) {
        const phone = guest.whatsapp_number || guest.mobile;
        const body_text = substituteFields(messageText, guest);
        const fullMessage = templateName.trim()
          ? `*${templateName.trim().toUpperCase()}*\n\n${body_text}`
          : body_text;
        const payload: Record<string, string> = { phone, message: fullMessage };
        if (mediaUrl) { payload.media_url = mediaUrl; payload.media_type = mediaFile!.type; }

        const { data: result, error: fnError } = await supabase.functions.invoke('send-whatsapp', { body: payload });
        const success = !fnError && result?.ok;
        const errMsg = fnError?.message ?? (!result?.ok ? (result?.data?.message || result?.data?.raw || 'API error') : null);

        if (success) sentCount++; else { failedCount++; errors.push(`${guest.addressable_name}: ${errMsg}`); }

        await supabase.from('message_recipients').insert({
          batch_id: batch?.id ?? null,
          guest_id: guest.id,
          addressable_name: guest.addressable_name,
          given_name: guest.given_name ?? null,
          whatsapp_number: phone,
          message_content: fullMessage,
          media_url: mediaUrl,
          status: success ? 'sent' : 'failed',
          error_message: errMsg ?? null,
          sent_at: success ? new Date().toISOString() : null,
        });
      }

      // 4. Update batch with final counts
      if (batch?.id) {
        await supabase.from('message_batches').update({
          sent_count: sentCount,
          failed_count: failedCount,
          status: failedCount === guestsToSend.length ? 'failed' : sentCount === guestsToSend.length ? 'completed' : 'partially_completed',
        }).eq('id', batch.id);
      }

      if (errors.length > 0 && errors.length === guestsToSend.length) {
        setSendError(`All messages failed:\n${errors.join('\n')}`);
      } else {
        setShowCreateModal(false);
        setShowSuccessModal(true);
        setSelectedGuests([]);
        setTemplateName('');
        setMessageText('');
        setMediaFile(null);
        setMediaPreview(null);
      }
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setSending(false);
    }
  }

  const filteredGuests = guests.filter(guest =>
    (guest.addressable_name + " " + (guest.given_name ?? "")).toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.mobile.includes(searchTerm)
  );

  const handleSelectAll = () => {
    if (selectedGuests.length === filteredGuests.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(filteredGuests.map(g => g.id));
    }
  };

  const toggleGuest = (id: string) => {
    setSelectedGuests(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#1B1A16] text-white rounded-lg text-sm font-bold hover:bg-[#2d2c26] transition-colors shadow-md">
            <Plus size={18} />
            <span>Add Guests</span>
          </button>
          
          <button 
            onClick={() => setShowCreateModal(true)}
            disabled={selectedGuests.length === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md ${
              selectedGuests.length > 0 
                ? 'bg-[#1B1A16] text-white hover:bg-[#2d2c26]' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <MessageSquare size={18} />
            <span>Create Message</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search guests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FFE400] outline-none"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <span>Show</span>
          <select className="border-gray-200 rounded p-1 text-xs">
            <option>All</option>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>entries</span>
          <span className="ml-auto text-gray-400">Showing {filteredGuests.length} entries</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 cursor-pointer"
                    checked={filteredGuests.length > 0 && selectedGuests.length === filteredGuests.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-r border-gray-200">#</th>
                <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-r border-gray-200">Name</th>
                <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-r border-gray-200">Mobile Number</th>
                <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-r border-gray-200">Taluka</th>
                <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {guestsLoading ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400 italic">Loading guests…</td></tr>
              ) : filteredGuests.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500 italic">No guests found matching your search.</td></tr>
              ) : (
                filteredGuests.map((guest, idx) => (
                  <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 cursor-pointer"
                        checked={selectedGuests.includes(guest.id)}
                        onChange={() => toggleGuest(guest.id)}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-200">{idx + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                      {guest.addressable_name}{guest.given_name ? ` ${guest.given_name}` : ""}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-200">{guest.whatsapp_number || guest.mobile}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-200">{guest.taluka_name ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{guest.email ?? '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <span className="text-xs text-gray-500">Showing {filteredGuests.length} entries</span>
          <div className="flex items-center space-x-1">
            <button className="px-2 py-1 border border-gray-200 rounded text-xs text-gray-400 cursor-not-allowed">«</button>
            <button className="px-2 py-1 border border-gray-200 rounded text-xs text-gray-400 cursor-not-allowed">‹</button>
            <button className="px-3 py-1 bg-[#1B1A16] text-white rounded text-xs font-bold">1</button>
            <button className="px-2 py-1 border border-gray-200 rounded text-xs text-gray-400 cursor-not-allowed">›</button>
            <button className="px-2 py-1 border border-gray-200 rounded text-xs text-gray-400 cursor-not-allowed">»</button>
          </div>
        </div>
      </div>

      {/* Create Message Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setShowCreateModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10 bg-white/80"
              >
                <X size={24} className="text-gray-900" />
              </button>

              {/* Form Side */}
              <div className="flex-1 p-8 md:p-12 space-y-8 border-r border-gray-100 overflow-y-auto max-h-[90vh]">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#1B1A16]">Create New Template</h3>
                  <p className="text-sm text-gray-500 mt-1">Sending to {selectedGuests.length} selected guests</p>
                </div>

                <div className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Name</label>
                    <input 
                      type="text" 
                      placeholder="Wedding Invite"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FFE400] outline-none transition-all"
                    />
                  </div>

                  {/* Message Editor */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1 bg-gray-50 p-2 rounded-t-lg border border-gray-200 border-b-0">
                      <button className="p-2 hover:bg-gray-200 rounded transition-colors"><Bold size={16} /></button>
                      <button className="p-2 hover:bg-gray-200 rounded transition-colors"><Italic size={16} /></button>
                      <button className="p-2 hover:bg-gray-200 rounded transition-colors"><Strikethrough size={16} /></button>
                      <button className="p-2 hover:bg-gray-200 rounded transition-colors"><Code size={16} /></button>
                      <button className="p-2 hover:bg-gray-200 rounded transition-colors"><Smile size={16} /></button>
                    </div>
                    <textarea 
                      rows={6}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full px-4 py-3 rounded-b-lg border border-gray-200 focus:ring-2 focus:ring-[#FFE400] outline-none transition-all resize-none"
                      placeholder="Type your message here..."
                    />
                  </div>

                  {/* Select Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Select Field</label>
                    <select 
                      value={selectedField}
                      onChange={(e) => {
                        const field = e.target.value;
                        if (field && field !== "~ Select ~") {
                          setMessageText(prev => prev + ` {${field}}`);
                        }
                        setSelectedField("~ Select ~");
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FFE400] outline-none transition-all"
                    >
                      <option>~ Select ~</option>
                      <option value="addressable-name">Addressable Name</option>
                      <option value="given-name">Given Name</option>
                      <option value="rsvp-link">RSVP Link</option>
                      <option value="arrival-details">Arrival Details</option>
                      <option value="departure-details">Departure Details</option>
                      <option value="hotel-details">Hotel Details</option>
                    </select>
                  </div>

                  {/* Upload Media */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Upload Media File</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 flex items-center px-4 py-3 rounded-lg border border-gray-200 bg-white">
                        <input 
                          type="file" 
                          id="media-upload-taluka"
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setMediaFile(file);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setMediaPreview(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <label htmlFor="media-upload-taluka" className="cursor-pointer flex items-center space-x-2">
                          <span className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-medium">Choose File</span>
                          <span className="text-sm text-gray-500 truncate max-w-[200px]">
                            {mediaFile ? mediaFile.name : "No file chosen"}
                          </span>
                        </label>
                      </div>
                      {mediaFile && (
                        <button 
                          onClick={() => {
                            setMediaFile(null);
                            setMediaPreview(null);
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>

                  {sendError && (
                    <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 whitespace-pre-line">
                      {sendError}
                    </div>
                  )}

                  <div className="flex justify-center pt-4">
                    <button
                      onClick={handleSend}
                      disabled={sending || !messageText.trim()}
                      className={`px-12 py-3 rounded-lg font-bold transition-all shadow-lg uppercase tracking-wider ${
                        sending || !messageText.trim()
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-[#1B1A16] text-white hover:bg-[#2d2c26]'
                      }`}
                    >
                      {sending
                        ? `Sending to ${selectedGuests.length} guest${selectedGuests.length !== 1 ? 's' : ''}…`
                        : `Send to ${selectedGuests.length} Guest${selectedGuests.length !== 1 ? 's' : ''}`}
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Side */}
              <div className="w-full md:w-[400px] bg-gray-50 p-8 flex flex-col items-center justify-center">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 self-start">Preview</h4>
                
                {/* Phone Mockup */}
                <div className="w-[300px] h-[600px] bg-[#1B1A16] rounded-[40px] p-3 shadow-2xl relative border-[6px] border-[#7C5275]">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1B1A16] rounded-b-2xl z-20 flex items-center justify-center">
                    <div className="w-10 h-1 bg-gray-800 rounded-full"></div>
                  </div>

                  {/* Screen Content */}
                  <div className="w-full h-full bg-[#E5DDD5] rounded-[30px] overflow-hidden relative flex flex-col">
                    {/* WhatsApp Header */}
                    <div className="bg-[#075E54] p-4 pt-8 flex items-center justify-between text-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <Users size={20} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Sender</p>
                          <p className="text-[10px] opacity-80">919876543210</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Video size={18} />
                        <Phone size={18} />
                      </div>
                    </div>

                    {/* Chat Background Pattern (Mock) */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 relative">
                      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://picsum.photos/seed/whatsapp/400/800")' }}></div>
                      
                      {/* Message Bubble */}
                      <div className="max-w-[85%] bg-white rounded-lg rounded-tl-none p-2 shadow-sm relative z-10">
                        {mediaPreview && (
                          <div className="mb-2 rounded overflow-hidden border border-gray-100">
                            <img src={mediaPreview} alt="Preview" className="w-full h-auto max-h-[200px] object-cover" />
                          </div>
                        )}
                        <div className="text-xs text-gray-800 whitespace-pre-wrap break-words">
                          {templateName && <p className="font-bold mb-1 uppercase">{templateName}</p>}
                          {messageText || "Your message will appear here..."}
                        </div>
                        <div className="flex justify-end items-center space-x-1 mt-1">
                          <span className="text-[9px] text-gray-400">01:09 pm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6 border-t-8 border-[#FFE400]"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#1B1A16]">Message Sent!</h3>
                <p className="text-gray-500">Your message has been successfully broadcasted to the selected recipients.</p>
              </div>
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-[#1B1A16] text-white rounded-lg font-bold hover:bg-[#2d2c26] transition-all uppercase tracking-widest"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CommunicationHubContent = () => {
  const { guests } = useGuests();
  const { rows: talukaRows } = useTalukas();
  const { batches: messageBatches, loading: batchesLoading, refetch: refetchBatches } = useMessages();
  const [showQR, setShowQR] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [selectedTaluka, setSelectedTaluka] = useState("All");
  const [selectedVillage, setSelectedVillage] = useState("All");
  const [viewingMessage, setViewingMessage] = useState<any | null>(null);
  const [hubSending, setHubSending] = useState(false);
  const [hubSendError, setHubSendError] = useState<string | null>(null);

  // Template Form State
  const [templateName, setTemplateName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  async function uploadHubMedia(file: File): Promise<string> {
    const ext = file.name.split('.').pop();
    const path = `whatsapp/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('media').upload(path, file, { upsert: true });
    if (error) throw new Error(`Media upload failed: ${error.message}`);
    const { data } = supabase.storage.from('media').getPublicUrl(path);
    return data.publicUrl;
  }

  function substituteHubFields(text: string, guest: typeof guests[0]): string {
    return text
      .replace(/\{addressable-name\}/g, guest.addressable_name)
      .replace(/\{given-name\}/g, guest.given_name ?? '')
      .replace(/\{rsvp-link\}/g, '[RSVP Link]')
      .replace(/\{arrival-details\}/g, '[Arrival Details]')
      .replace(/\{departure-details\}/g, '[Departure Details]')
      .replace(/\{hotel-details\}/g, '[Hotel Details]');
  }

  async function handleHubSend() {
    if (!messageText.trim()) { setHubSendError('Please enter a message.'); return; }
    setHubSending(true);
    setHubSendError(null);
    try {
      const currentUser = JSON.parse(localStorage.getItem('enough_goa_user') || 'null');
      const userId: string | null = currentUser?.id ?? null;

      let mediaUrl: string | null = null;
      if (mediaFile) mediaUrl = await uploadHubMedia(mediaFile);

      const recipientGuests = guests.filter(g => selectedRecipients.includes(g.id));
      const batchName = templateName.trim() || 'Untitled';

      // 1. Log template
      const { data: tmpl } = await supabase
        .from('message_templates')
        .insert({ name: batchName, content: messageText, media_url: mediaUrl, media_type: mediaFile?.type ?? null, created_by: userId })
        .select('id').single();

      // 2. Create batch
      const { data: batch } = await supabase
        .from('message_batches')
        .insert({ template_id: tmpl?.id ?? null, batch_name: batchName, total_recipients: recipientGuests.length, status: 'processing', sent_by: userId })
        .select('id').single();

      // 3. Send each recipient and log
      const errors: string[] = [];
      let sentCount = 0, failedCount = 0;

      for (const guest of recipientGuests) {
        const phone = guest.whatsapp_number || guest.mobile;
        const body_text = substituteHubFields(messageText, guest);
        const fullMessage = templateName.trim()
          ? `*${templateName.trim().toUpperCase()}*\n\n${body_text}`
          : body_text;
        const payload: Record<string, string> = { phone, message: fullMessage };
        if (mediaUrl) { payload.media_url = mediaUrl; payload.media_type = mediaFile!.type; }

        const { data: result, error: fnError } = await supabase.functions.invoke('send-whatsapp', { body: payload });
        const success = !fnError && result?.ok;
        const errMsg = fnError?.message ?? (!result?.ok ? (result?.data?.message || result?.data?.raw || 'API error') : null);

        if (success) sentCount++; else { failedCount++; errors.push(`${guest.addressable_name}: ${errMsg}`); }

        await supabase.from('message_recipients').insert({
          batch_id: batch?.id ?? null,
          guest_id: guest.id,
          addressable_name: guest.addressable_name,
          given_name: guest.given_name ?? null,
          whatsapp_number: phone,
          message_content: fullMessage,
          media_url: mediaUrl,
          status: success ? 'sent' : 'failed',
          error_message: errMsg ?? null,
          sent_at: success ? new Date().toISOString() : null,
        });
      }

      // 4. Update batch counts
      if (batch?.id) {
        await supabase.from('message_batches').update({
          sent_count: sentCount,
          failed_count: failedCount,
          status: failedCount === recipientGuests.length ? 'failed' : sentCount === recipientGuests.length ? 'completed' : 'partially_completed',
        }).eq('id', batch.id);
      }

      if (errors.length > 0 && errors.length === recipientGuests.length) {
        setHubSendError(`All messages failed:\n${errors.join('\n')}`);
      } else {
        setShowCreateModal(false);
        setShowSuccessModal(true);
        setStep(1);
        setSelectedRecipients([]);
        setTemplateName('');
        setMessageText('');
        setMediaFile(null);
        setMediaPreview(null);
        await refetchBatches();
      }
    } catch (err) {
      setHubSendError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setHubSending(false);
    }
  }

  const [connectedInstance] = useState({ name: "Portal", mobile: "" });

  // Derive taluka/village lists from live guests
  const talukaPeopleRaw = guests.map(g => ({
    id: g.id,
    name: `${g.addressable_name}${g.given_name ? " " + g.given_name : ""}`,
    mobile: g.whatsapp_number || g.mobile,
    taluka: g.taluka_name ?? "",
    village: g.village_name ?? "",
  }));
  const talukaPeople = talukaPeopleRaw; // alias kept for below code compatibility


  const filteredPeople = talukaPeople.filter(person => {
    const talukaMatch = selectedTaluka === "All" || person.taluka === selectedTaluka;
    const villageMatch = selectedVillage === "All" || person.village === selectedVillage;
    return talukaMatch && villageMatch;
  });

  // Taluka & village lists from the master table (not derived from guests)
  const talukas = ["All", ...Array.from(
    new Set(talukaRows.map(r => r.taluka_name ?? "").filter(Boolean))
  ).sort()];
  const villages = ["All", ...talukaRows
    .filter(r => selectedTaluka === "All" || r.taluka_name === selectedTaluka)
    .map(r => r.village_name)
    .filter(Boolean)
    .sort()
    .filter((v, i, arr) => arr.indexOf(v) === i)
  ];

  const handleSelectAll = () => {
    const allFilteredIds = filteredPeople.map(p => p.id);
    const areAllSelected = allFilteredIds.length > 0 && allFilteredIds.every(id => selectedRecipients.includes(id));
    
    if (areAllSelected) {
      setSelectedRecipients(prev => prev.filter(id => !allFilteredIds.includes(id)));
    } else {
      setSelectedRecipients(prev => Array.from(new Set([...prev, ...allFilteredIds])));
    }
  };

  const toggleRecipient = (id: string) => {
    setSelectedRecipients(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  if (viewingMessage) {
    return <MessageBatchView message={viewingMessage} onBack={() => setViewingMessage(null)} />;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header & Actions */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Communication Hub</h2>
          <p className="text-gray-500 mt-1">Manage and track your message broadcasts.</p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Connected Instance</span>
              <span className="text-sm font-bold text-[#1B1A16]">{connectedInstance.name} ({connectedInstance.mobile})</span>
            </div>
            <button 
              onClick={() => setShowQR(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#1B1A16]"
              title="Connect Instance"
            >
              <QrCode size={20} />
            </button>
          </div>
          
          <button 
            onClick={() => {
              setStep(1);
              setShowCreateModal(true);
            }}
            className="flex items-center space-x-2 px-6 py-2 bg-[#1B1A16] text-white rounded-full text-sm font-bold hover:bg-[#2d2c26] transition-colors shadow-md"
          >
            <span>Create Message</span>
          </button>
        </div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative border-4 border-[#FFE400]"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#1B1A16]">Connect WhatsApp</h3>
                  <p className="text-sm text-gray-500">Scan this QR code with your mobile device to connect your instance.</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center aspect-square">
                  {/* Mock QR Code */}
                  <div className="w-full h-full bg-white p-4 rounded-lg shadow-inner flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-1 w-full h-full opacity-80">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-[#1B1A16]' : 'bg-transparent'}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <p className="text-xs text-gray-400">Waiting for connection...</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Template Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setShowCreateModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10 bg-white/80"
              >
                <X size={24} className="text-gray-900" />
              </button>

              {/* Form Side */}
              <div className="flex-1 p-8 md:p-12 space-y-8 border-r border-gray-100 overflow-y-auto max-h-[90vh]">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#1B1A16]">
                    {step === 1 ? "Create New Template" : "Select Recipients"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Step {step} of 2</p>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Name</label>
                        <input 
                          type="text" 
                          placeholder="Wedding Invite"
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FFE400] outline-none transition-all"
                        />
                      </div>

                      {/* Message Editor */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1 bg-gray-50 p-2 rounded-t-lg border border-gray-200 border-b-0">
                          <button className="p-2 hover:bg-gray-200 rounded transition-colors"><Bold size={16} /></button>
                          <button className="p-2 hover:bg-gray-200 rounded transition-colors"><Italic size={16} /></button>
                          <button className="p-2 hover:bg-gray-200 rounded transition-colors"><Strikethrough size={16} /></button>
                          <button className="p-2 hover:bg-gray-200 rounded transition-colors"><Code size={16} /></button>
                          <button className="p-2 hover:bg-gray-200 rounded transition-colors"><Smile size={16} /></button>
                        </div>
                        <textarea 
                          rows={6}
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className="w-full px-4 py-3 rounded-b-lg border border-gray-200 focus:ring-2 focus:ring-[#FFE400] outline-none transition-all resize-none"
                          placeholder="Type your message here..."
                        />
                      </div>

                      {/* Select Field */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Select Field</label>
                        <select 
                          value={selectedField}
                          onChange={(e) => {
                            const field = e.target.value;
                            if (field && field !== "~ Select ~") {
                              setMessageText(prev => prev + ` {${field}}`);
                            }
                            setSelectedField("~ Select ~");
                          }}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FFE400] outline-none transition-all"
                        >
                          <option>~ Select ~</option>
                          <option value="addressable-name">Addressable Name</option>
                          <option value="given-name">Given Name</option>
                          <option value="rsvp-link">RSVP Link</option>
                          <option value="arrival-details">Arrival Details</option>
                          <option value="departure-details">Departure Details</option>
                          <option value="hotel-details">Hotel Details</option>
                        </select>
                      </div>

                      {/* Upload Media */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Upload Media File</label>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 flex items-center px-4 py-3 rounded-lg border border-gray-200 bg-white">
                            <input 
                              type="file" 
                              id="media-upload"
                              className="hidden" 
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setMediaFile(file);
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setMediaPreview(reader.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                            <label htmlFor="media-upload" className="cursor-pointer flex items-center space-x-2">
                              <span className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-medium">Choose File</span>
                              <span className="text-sm text-gray-500 truncate max-w-[200px]">
                                {mediaFile ? mediaFile.name : "No file chosen"}
                              </span>
                            </label>
                          </div>
                          {mediaFile && (
                            <button 
                              onClick={() => {
                                setMediaFile(null);
                                setMediaPreview(null);
                              }}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-center pt-4">
                        <button 
                          onClick={() => setStep(2)}
                          className="px-12 py-3 bg-[#FFE400] text-[#1B1A16] rounded-lg font-bold hover:bg-[#e6ce00] transition-all shadow-lg uppercase tracking-wider"
                        >
                          Next
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-bold text-gray-700">Select Recipients</label>
                          <span className="text-xs text-gray-500">{selectedRecipients.length} selected</span>
                        </div>

                        {/* Filters */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Taluka</label>
                            <select 
                              value={selectedTaluka}
                              onChange={(e) => {
                                setSelectedTaluka(e.target.value);
                                setSelectedVillage("All");
                              }}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#FFE400] outline-none"
                            >
                              {talukas.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Village</label>
                            <select 
                              value={selectedVillage}
                              onChange={(e) => setSelectedVillage(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#FFE400] outline-none"
                            >
                              {villages.map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                          </div>
                        </div>

                        {/* Select All Option */}
                        <div 
                          onClick={handleSelectAll}
                          className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                            filteredPeople.length > 0 && filteredPeople.every(p => selectedRecipients.includes(p.id))
                              ? 'bg-[#1B1A16] border-[#1B1A16]' 
                              : 'border-gray-300 bg-white'
                          }`}>
                            {filteredPeople.length > 0 && filteredPeople.every(p => selectedRecipients.includes(p.id)) && <CheckCircle2 size={14} className="text-[#FFE400]" />}
                          </div>
                          <span className="text-sm font-bold text-[#1B1A16] truncate">Select All Filtered</span>
                        </div>
                        
                        <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 max-h-[300px] overflow-y-auto">
                          {filteredPeople.length > 0 ? (
                            filteredPeople.map((person) => (
                              <div 
                                key={person.id}
                                onClick={() => toggleRecipient(person.id)}
                                className={`flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                                  selectedRecipients.includes(person.id) ? 'bg-[#FFE400]/10' : 'hover:bg-white'
                                }`}
                              >
                                <div className="flex items-center space-x-4">
                                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                    selectedRecipients.includes(person.id) 
                                      ? 'bg-[#1B1A16] border-[#1B1A16]' 
                                      : 'border-gray-300 bg-white'
                                  }`}>
                                    {selectedRecipients.includes(person.id) && <CheckCircle2 size={14} className="text-[#FFE400]" />}
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-[#1B1A16]">{person.name}</p>
                                    <p className="text-xs text-gray-500">{person.mobile}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="px-2 py-1 bg-gray-200 rounded text-[10px] font-bold text-gray-600 uppercase block mb-1">
                                    {person.taluka}
                                  </span>
                                  <span className="text-[9px] text-gray-400 italic">{person.village}</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-8 text-center text-gray-500 text-sm">
                              No recipients found for the selected filters.
                            </div>
                          )}
                        </div>
                      </div>

                      {hubSendError && (
                        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 whitespace-pre-line">
                          {hubSendError}
                        </div>
                      )}
                      <div className="flex items-center justify-center space-x-4 pt-4">
                        <button
                          onClick={() => setStep(1)}
                          className="px-8 py-3 border-2 border-[#1B1A16] text-[#1B1A16] rounded-lg font-bold hover:bg-gray-50 transition-all uppercase tracking-wider"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleHubSend}
                          disabled={selectedRecipients.length === 0 || hubSending || !messageText.trim()}
                          className={`px-12 py-3 rounded-lg font-bold transition-all shadow-lg uppercase tracking-wider ${
                            selectedRecipients.length > 0 && !hubSending && messageText.trim()
                              ? 'bg-[#1B1A16] text-white hover:bg-[#2d2c26]'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {hubSending
                            ? `Sending to ${selectedRecipients.length}…`
                            : `Send to ${selectedRecipients.length} Guest${selectedRecipients.length !== 1 ? 's' : ''}`}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Preview Side */}
              <div className="w-full md:w-[400px] bg-gray-50 p-8 flex flex-col items-center justify-center">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 self-start">Preview</h4>
                
                {/* Phone Mockup */}
                <div className="w-[300px] h-[600px] bg-[#1B1A16] rounded-[40px] p-3 shadow-2xl relative border-[6px] border-[#7C5275]">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1B1A16] rounded-b-2xl z-20 flex items-center justify-center">
                    <div className="w-10 h-1 bg-gray-800 rounded-full"></div>
                  </div>

                  {/* Screen Content */}
                  <div className="w-full h-full bg-[#E5DDD5] rounded-[30px] overflow-hidden relative flex flex-col">
                    {/* WhatsApp Header */}
                    <div className="bg-[#075E54] p-4 pt-8 flex items-center justify-between text-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <Users size={20} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Sender</p>
                          <p className="text-[10px] opacity-80">919876543210</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Video size={18} />
                        <Phone size={18} />
                      </div>
                    </div>

                    {/* Chat Background Pattern (Mock) */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 relative">
                      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://picsum.photos/seed/whatsapp/400/800")' }}></div>
                      
                      {/* Message Bubble */}
                      <div className="max-w-[85%] bg-white rounded-lg rounded-tl-none p-2 shadow-sm relative z-10">
                        {mediaPreview && (
                          <div className="mb-2 rounded overflow-hidden border border-gray-100">
                            <img src={mediaPreview} alt="Preview" className="w-full h-auto max-h-[200px] object-cover" />
                          </div>
                        )}
                        <div className="text-xs text-gray-800 whitespace-pre-wrap break-words">
                          {templateName && <p className="font-bold mb-1 uppercase">{templateName}</p>}
                          {messageText || "Your message will appear here..."}
                        </div>
                        <div className="flex justify-end items-center space-x-1 mt-1">
                          <span className="text-[9px] text-gray-400">01:09 pm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6 border-t-8 border-[#FFE400]"
            >
              <div className="w-20 h-20 bg-[#FFE400]/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} className="text-[#1B1A16]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#1B1A16]">Success!</h3>
                <p className="text-gray-500">Message sent successfully to the selected recipients.</p>
              </div>
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-[#1B1A16] text-white rounded-lg font-bold hover:bg-[#2d2c26] transition-colors uppercase tracking-wider"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase">Sender's WhatsApp No.</label>
          <select className="w-full border-gray-200 rounded-lg text-sm p-2.5 focus:ring-[#FFE400] focus:border-[#FFE400]">
            <option>None selected</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase">Templates</label>
          <select className="w-full border-gray-200 rounded-lg text-sm p-2.5 focus:ring-[#FFE400] focus:border-[#FFE400]">
            <option>None selected</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase">From date</label>
          <input type="date" className="w-full border-gray-200 rounded-lg text-sm p-2.5 focus:ring-[#FFE400] focus:border-[#FFE400]" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase">To date</label>
          <input type="date" className="w-full border-gray-200 rounded-lg text-sm p-2.5 focus:ring-[#FFE400] focus:border-[#FFE400]" />
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-center space-x-2 text-xs text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-100">
        <Bell size={14} className="text-blue-500" />
        <span>Delivery is subject to the recipient being in a network/WiFi coverage area.</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Messages</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200">Sender</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200">Time</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200 text-center">Sent</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200 text-center">Delivered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {batchesLoading ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400 italic">Loading batches…</td></tr>
            ) : messageBatches.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500 italic">No message batches yet.</td></tr>
            ) : (
              messageBatches.map(batch => {
                const d = new Date(batch.created_at);
                return (
                  <tr key={batch.id} className="hover:bg-gray-50 transition-colors">
                    <td
                      className="px-6 py-4 text-sm font-bold text-gray-900 cursor-pointer hover:text-[#1B1A16] hover:underline"
                      onClick={() => setViewingMessage(batch)}
                    >
                      {(batch as any).template_name ?? batch.batch_name ?? batch.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 border-l border-gray-200">{batch.total_recipients}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 border-l border-gray-200">{d.toLocaleDateString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 border-l border-gray-200">{d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200 text-center font-medium">{batch.sent_count}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200 text-center font-medium">{batch.delivered_count}</td>
                  </tr>
                );
              })
            )}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-bold">
              <td colSpan={4} className="px-6 py-4 text-right text-sm text-gray-900">Total</td>
              <td className="px-6 py-4 text-sm text-gray-900 text-center border-l border-gray-200">{messageBatches.reduce((acc, b) => acc + b.sent_count, 0)}</td>
              <td className="px-6 py-4 text-sm text-gray-900 text-center border-l border-gray-200">{messageBatches.reduce((acc, b) => acc + b.delivered_count, 0)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

const DashboardContent = () => {
  const { data, loading } = useDashboard();

  const liveStats = [
    { label: "Messages Sent",   value: loading ? "…" : (data?.messagesSent  ?? 0).toLocaleString(), icon: MessageSquare, color: "bg-blue-100 text-blue-600" },
    { label: "People Onboard",  value: loading ? "…" : (data?.peopleOnboard ?? 0).toLocaleString(), icon: UserPlus,      color: "bg-green-100 text-green-600" },
    { label: "Active Tasks",    value: "12",   icon: CheckSquare, color: "bg-purple-100 text-purple-600" },
    { label: "Upcoming Events", value: "5",    icon: Calendar,    color: "bg-orange-100 text-orange-600" },
  ];

  const chartData = data?.chartData ?? [];

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {liveStats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Messages Sent — Last 7 Days chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center">
              <BarChart3 size={20} className="mr-2 text-[#FFE400]" />
              Messages Sent — Last 7 Days
            </h3>
          </div>
          <div className="h-[300px] w-full">
            {loading ? (
              <div className="flex items-center justify-center h-full text-gray-400 italic text-sm">Loading…</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [value, 'Messages Sent']}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {chartData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1B1A16' : '#FFE400'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center">
            <Bell size={20} className="mr-2 text-[#1B1A16]" />
            Recent Activity
          </h3>
          <div className="space-y-5 overflow-y-auto max-h-[280px]">
            {loading ? (
              <p className="text-sm text-gray-400 italic">Loading…</p>
            ) : (data?.activity ?? []).length === 0 ? (
              <p className="text-sm text-gray-400 italic">No recent activity.</p>
            ) : (
              (data?.activity ?? []).map((item) => (
                <div key={item.id} className="flex space-x-3">
                  <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${item.type === 'registration' ? 'bg-green-400' : 'bg-[#FFE400]'}`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 leading-snug">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.subtext}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const isLoggedIn = !!user;
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [activePage, setActivePage] = useState<Page>("dashboard");

  // Login Screen State
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [isResetSent, setIsResetSent] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      await signIn(username, password);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Invalid username or password");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleForgotPassword = (e: FormEvent) => {
    e.preventDefault();
    if (forgotEmail) setIsResetSent(true);
  };

  const handleLogout = () => signOut();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FFFAF2] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#FFE400] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FFFAF2] flex flex-col items-center justify-center p-4 font-sans text-[#141414]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[550px] bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-[#FFE400] relative"
          id="login-card"
        >
          <div className="p-8 md:p-12 flex flex-col items-center">
            <h1
              className="text-3xl md:text-4xl font-bold italic uppercase tracking-normal mb-6 text-[#1B1A16]"
              style={{ fontFamily: "'Anton', sans-serif" }}
              id="brand-logo"
            >
              ENOUGH IS ENOUGH
            </h1>

            <AnimatePresence mode="wait">
              {!isForgotPassword ? (
                <motion.div
                  key="login-view"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="w-full"
                >
                  <div className="text-center mb-8" id="login-heading">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Login To <span className="text-[#FFE400]">Your Account</span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                      Please login into your account by entering your username and password below.
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="w-full space-y-6" id="login-form">
                    <div className="space-y-2">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username or Email
                      </label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1B1A16] focus:border-transparent outline-none transition-all"
                        placeholder="Enter your username or email"
                        required
                        autoComplete="username"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1B1A16] focus:border-transparent outline-none transition-all pr-12"
                          placeholder="Enter your password"
                          required
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => setIsForgotPassword(true)}
                          className="text-xs text-[#1B1A16] hover:underline font-medium"
                        >
                          Forgot password? <span className="underline">Click here</span>
                        </button>
                      </div>
                    </div>

                    {loginError && (
                      <p className="text-sm text-red-600 text-center">{loginError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full bg-[#1B1A16] hover:bg-[#2d2c26] text-white font-bold py-4 rounded-md transition-all transform active:scale-[0.98] shadow-lg uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loginLoading ? "Signing in…" : "Login"}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="forgot-password-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Forgot <span className="text-[#FFE400]">Password?</span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                      {isResetSent 
                        ? "Check your email for instructions to reset your password." 
                        : "Enter your email address and we'll send you a link to reset your password."}
                    </p>
                  </div>

                  {!isResetSent ? (
                    <form onSubmit={handleForgotPassword} className="w-full space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="forgot-email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1B1A16] focus:border-transparent outline-none transition-all"
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#1B1A16] hover:bg-[#2d2c26] text-white font-bold py-4 rounded-md transition-all transform active:scale-[0.98] shadow-lg uppercase tracking-widest"
                      >
                        Send Reset Link
                      </button>
                    </form>
                  ) : (
                    <div className="bg-green-50 border border-green-100 p-6 rounded-xl text-center space-y-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 size={24} className="text-green-600" />
                      </div>
                      <p className="text-sm text-green-800 font-medium">
                        A password reset link has been sent to <strong>{forgotEmail}</strong>.
                      </p>
                    </div>
                  )}

                  <div className="mt-8 text-center">
                    <button
                      onClick={() => {
                        setIsForgotPassword(false);
                        setIsResetSent(false);
                        setForgotEmail("");
                      }}
                      className="flex items-center justify-center space-x-2 text-sm font-bold text-[#1B1A16] hover:underline mx-auto"
                    >
                      <ChevronLeft size={18} />
                      <span>Back to Login</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <a href="#" className="font-bold text-[#141414] hover:underline uppercase">
                Request Now
              </a>
            </div>
          </div>
        </motion.div>
        <footer className="mt-8 text-xs text-gray-400 font-medium">
          © 2026 Enough Is Enough
        </footer>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#FFFAF2] font-sans text-gray-900 overflow-hidden">
      {/* Sidebar (LHS) */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={handleLogout}
      />

      {/* Main Content (RHS) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activePage === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardContent />
              </motion.div>
            )}
            {activePage === "communication" && (
              <motion.div
                key="communication"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CommunicationHubContent />
              </motion.div>
            )}
            {activePage === "guests" && (
              <motion.div
                key="guests"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TalukaVillageContent />
              </motion.div>
            )}
            {activePage === "taluka" && (
              <motion.div
                key="taluka"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TalukaListingContent />
              </motion.div>
            )}
            {activePage === "users" && (
              <motion.div
                key="users"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <UsersListingContent />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
