/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
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
type Page = "dashboard" | "taluka" | "communication" | "users";

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
    { id: "taluka", label: "Taluka/Village", icon: MapPin },
    { id: "communication", label: "Communication Hub", icon: MessageSquare },
    { id: "users", label: "Users", icon: Users },
  ];

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

const Header = () => (
  <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8 sticky top-0 z-10">
    <div className="flex items-center space-x-6">
      <button className="relative text-gray-500 hover:text-gray-700">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div className="flex items-center space-x-3 border-l pl-6 border-gray-200">
        <div className="text-right">
          <p className="text-sm font-bold">Yogesh Chodankar</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
        <div className="w-10 h-10 bg-[#1B1A16] rounded-full flex items-center justify-center text-white font-bold">
          YC
        </div>
      </div>
    </div>
  </header>
);

const MessageBatchView = ({ message, onBack }: { message: any; onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedRecipients, setSelectedRecipients] = useState<number[]>([]);
  
  const batchRecipients = [
    { id: 1, addressableName: "Laxman", givenName: "Kubal", whatsapp: "917350807077", status: "Sent", delivered: "20/07/2024 10:30 AM" },
    { id: 2, addressableName: "Rahul", givenName: "Sharma", whatsapp: "919876543210", status: "Delivered", delivered: "20/07/2024 11:15 AM" },
    { id: 3, addressableName: "Priya", givenName: "Patel", whatsapp: "918765432109", status: "Failed", delivered: "-NA-" },
    { id: 4, addressableName: "Sneha", givenName: "Desai", whatsapp: "917654321098", status: "Not Sent", delivered: "-NA-" },
    { id: 5, addressableName: "Vikram", givenName: "Singh", whatsapp: "916543210987", status: "Deleted", delivered: "-NA-" },
    { id: 6, addressableName: "Anjali", givenName: "Nair", whatsapp: "915432109876", status: "Sent", delivered: "20/07/2024 02:00 PM" },
  ];

  const getStatusCount = (status: string) => {
    if (status === "All") return batchRecipients.length;
    return batchRecipients.filter(r => r.status === status).length;
  };

  const tabs = [
    { label: "Not Sent", count: getStatusCount("Not Sent"), color: "bg-gray-100 text-gray-600" },
    { label: "Sent", count: getStatusCount("Sent"), color: "bg-green-50 text-green-600" },
    { label: "Delivered", count: getStatusCount("Delivered"), color: "bg-blue-50 text-blue-600" },
    { label: "Failed", count: getStatusCount("Failed"), color: "bg-red-50 text-red-600" },
    { label: "Deleted", count: getStatusCount("Deleted"), color: "bg-red-50 text-red-600" },
    { label: "All", count: getStatusCount("All"), color: "bg-gray-800 text-white" },
  ];

  const filteredRecipients = activeTab === "All" 
    ? batchRecipients 
    : batchRecipients.filter(r => r.status === activeTab);

  const handleSelectAll = () => {
    if (selectedRecipients.length === filteredRecipients.length) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients(filteredRecipients.map(r => r.id));
    }
  };

  const toggleRecipient = (id: number) => {
    setSelectedRecipients(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Sent": return "bg-green-50 text-green-600";
      case "Delivered": return "bg-blue-50 text-blue-600";
      case "Failed": return "bg-red-50 text-red-600";
      case "Not Sent": return "bg-gray-100 text-gray-600";
      case "Deleted": return "bg-orange-50 text-orange-600";
      default: return "bg-gray-50 text-gray-500";
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ChevronLeft size={18} className="mr-1" />
        Back
      </button>

      {/* Header Section */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="space-y-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">From</p>
          <h2 className="text-2xl font-bold text-[#1B1A16]">{message.sender} (919049019382)</h2>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors">
            <Trash2 size={16} />
            <span>Delete Batch</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
            <RefreshCw size={16} />
            <span>Update Status</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Phone Preview */}
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
                    <p className="text-sm font-bold">{message.sender}</p>
                    <p className="text-[10px] opacity-80">919049019382</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Video size={18} />
                  <Phone size={18} />
                </div>
              </div>
              <div className="flex-1 p-4 space-y-4 relative">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://picsum.photos/seed/whatsapp/400/800")' }}></div>
                <div className="bg-gray-400/30 text-center py-1 rounded text-[10px] font-medium text-gray-600 relative z-10">20/07/2024</div>
                <div className="max-w-[85%] bg-white rounded-lg rounded-tl-none p-3 shadow-sm relative z-10">
                  <div className="text-xs text-gray-800 leading-relaxed">
                    Dear Laxman Kubal,<br/><br/>
                    My beloved Friend is finally getting married. We would love that you could grace us with your presence and blessings at the festivities. Click <span className="text-blue-500 underline cursor-pointer break-all">https://staging8.teaminertia.com/eventflow/microsite.php?source=46cb518f2478f732b91b2fd90e6ab09a&target=6f2f8c727059345512332c8903ef406e</span> to RSVP.<br/><br/>
                    Thank you.
                  </div>
                  <div className="flex justify-end items-center space-x-1 mt-1">
                    <span className="text-[9px] text-gray-400">12:00 am</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Status & Table */}
        <div className="flex-1 space-y-6">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => {
                  setActiveTab(tab.label);
                  setSelectedRecipients([]);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.label 
                    ? 'bg-[#1B1A16] text-white shadow-md' 
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {tab.label}: {tab.count}
              </button>
            ))}
          </div>

          {/* Info Banner */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2">
            <div className="flex items-start space-x-2 text-[11px] text-gray-500">
              <div className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">i</div>
              <span>Delivery is subject to the recipient being in a network/WiFi coverage area.</span>
            </div>
            <div className="flex items-start space-x-2 text-[11px] text-gray-500">
              <div className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">i</div>
              <span>Select "Delete Batch" if you wish to discontinue the process for the messages "NOT SENT".</span>
            </div>
            <div className="flex items-start space-x-2 text-[11px] text-gray-500">
              <div className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">i</div>
              <span>Messages will be marked as "Failed" if the recipient's WhatsApp number is wrong.</span>
            </div>
          </div>

          {/* Recipient Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 w-10">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 cursor-pointer"
                      checked={filteredRecipients.length > 0 && selectedRecipients.length === filteredRecipients.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200 text-center">Addressable Name</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200 text-center">Given Name</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200 text-center">WhatsApp Number</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200 text-center">Status</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-l border-gray-200 text-center">Delivered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRecipients.map((rec, index) => (
                  <tr key={rec.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 cursor-pointer"
                        checked={selectedRecipients.includes(rec.id)}
                        onChange={() => toggleRecipient(rec.id)}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 border-l border-gray-200 text-center">{rec.addressableName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 border-l border-gray-200 text-center">{rec.givenName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 border-l border-gray-200 text-center">{rec.whatsapp}</td>
                    <td className="px-4 py-3 border-l border-gray-200 text-center">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${getStatusStyle(rec.status)}`}>
                        {rec.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 border-l border-gray-200 text-center">{rec.delivered}</td>
                  </tr>
                ))}
                {filteredRecipients.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 italic">
                      No recipients found with status "{activeTab}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const talukaGuests = [
  { id: 1, name: "Janardan Keny", mobile: "+91997014069", taluka: "Bardez", email: "jaykeny15@gmail.com" },
  { id: 2, name: "Myron Pinto", mobile: "+91703031233", taluka: "Salcete", email: "pintomyron57@gmail.com" },
  { id: 3, name: "Abcd Efgh", mobile: "91987654321", taluka: "Bardez", email: "-NA-" },
  { id: 4, name: "Efgh Abcd", mobile: "91987654320", taluka: "Pernem", email: "-NA-" },
  { id: 5, name: "Yogesh Chodankar", mobile: "91919049019382", taluka: "Bardez", email: "yogesh@teaminertia.com" },
  { id: 6, name: "Laxman Kubal", mobile: "91917350807077", taluka: "Pernem", email: "-NA-" },
  { id: 7, name: "Anton Mousimann", mobile: "+9191123456789", taluka: "Bicholim", email: "mousimann@email.com" },
  { id: 8, name: "David Noronha", mobile: "91 91779824684", taluka: "Salcete", email: "david@teaminertia.com" },
  { id: 9, name: "Daavid Noronha", mobile: "91917798246842", taluka: "Canacona", email: "-NA-" },
];

const TalukaVillageContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuests, setSelectedGuests] = useState<number[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Template Form State
  const [templateName, setTemplateName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  const filteredGuests = talukaGuests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.taluka.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.mobile.includes(searchTerm)
  );

  const handleSelectAll = () => {
    if (selectedGuests.length === filteredGuests.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(filteredGuests.map(g => g.id));
    }
  };

  const toggleGuest = (id: number) => {
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
              {filteredGuests.map((guest, idx) => (
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
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">{guest.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-200">{guest.mobile}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-200">{guest.taluka}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{guest.email}</td>
                </tr>
              ))}
              {filteredGuests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500 italic">No guests found matching your search.</td>
                </tr>
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

                  <div className="flex justify-center pt-4">
                    <button 
                      onClick={() => {
                        setShowCreateModal(false);
                        setShowSuccessModal(true);
                        setSelectedGuests([]);
                      }}
                      className="px-12 py-3 bg-[#1B1A16] text-white rounded-lg font-bold hover:bg-[#2d2c26] transition-all shadow-lg uppercase tracking-wider"
                    >
                      Send Message
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
  const [showQR, setShowQR] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [selectedTaluka, setSelectedTaluka] = useState("All");
  const [selectedVillage, setSelectedVillage] = useState("All");
  const [viewingMessage, setViewingMessage] = useState<any | null>(null);
  
  // Template Form State
  const [templateName, setTemplateName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  const [connectedInstance] = useState({ name: "Yogesh Chodankar", mobile: "+91 98765 43210" });
  const [messages] = useState([
    { taluka: "Bardez", sender: "Yogesh Chodankar", date: "20/07/2024", time: "12:00 AM", sent: 1, delivered: 0 },
    { taluka: "Pernem", sender: "Yogesh Chodankar", date: "20/07/2024", time: "12:00 AM", sent: 1, delivered: 0 },
    { taluka: "Bicholim", sender: "Yogesh Chodankar", date: "20/07/2024", time: "12:00 AM", sent: 1, delivered: 0 },
    { taluka: "Salcete", sender: "Yogesh Chodankar", date: "20/07/2024", time: "12:00 AM", sent: 1, delivered: 0 },
    { taluka: "Canacona", sender: "Yogesh Chodankar", date: "20/07/2024", time: "12:00 AM", sent: 1, delivered: 0 },
    { taluka: "Bardez", sender: "Yogesh Chodankar", date: "20/07/2024", time: "12:00 AM", sent: 1, delivered: 0 },
    { taluka: "Pernem", sender: "Yogesh Chodankar", date: "20/07/2024", time: "12:00 AM", sent: 1, delivered: 0 },
  ]);

  const talukaPeople = [
    { id: '1', name: 'Rajesh Kumar', mobile: '+91 98230 12345', taluka: 'Bardez', village: 'Mapusa' },
    { id: '2', name: 'Suresh Raina', mobile: '+91 98230 23456', taluka: 'Pernem', village: 'Mandrem' },
    { id: '3', name: 'Amit Shah', mobile: '+91 98230 34567', taluka: 'Bicholim', village: 'Sanquelim' },
    { id: '4', name: 'Nitin Gadkari', mobile: '+91 98230 45678', taluka: 'Salcete', village: 'Margao' },
    { id: '5', name: 'Pramod Sawant', mobile: '+91 98230 56789', taluka: 'Canacona', village: 'Agonda' },
    { id: '6', name: 'Vishwajit Rane', mobile: '+91 98230 67890', taluka: 'Sattari', village: 'Valpoi' },
    { id: '7', name: 'Rohan Khaunte', mobile: '+91 98230 78901', taluka: 'Bardez', village: 'Porvorim' },
    { id: '8', name: 'Atanasio Monserrate', mobile: '+91 98230 89012', taluka: 'Tiswadi', village: 'Panjim' },
  ];

  const filteredPeople = talukaPeople.filter(person => {
    const talukaMatch = selectedTaluka === "All" || person.taluka === selectedTaluka;
    const villageMatch = selectedVillage === "All" || person.village === selectedVillage;
    return talukaMatch && villageMatch;
  });

  const talukas = ["All", ...Array.from(new Set(talukaPeople.map(p => p.taluka)))];
  const villages = ["All", ...Array.from(new Set(talukaPeople.filter(p => selectedTaluka === "All" || p.taluka === selectedTaluka).map(p => p.village)))];

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

                      <div className="flex items-center justify-center space-x-4 pt-4">
                        <button 
                          onClick={() => setStep(1)}
                          className="px-8 py-3 border-2 border-[#1B1A16] text-[#1B1A16] rounded-lg font-bold hover:bg-gray-50 transition-all uppercase tracking-wider"
                        >
                          Back
                        </button>
                        <button 
                          onClick={() => {
                            setShowCreateModal(false);
                            setShowSuccessModal(true);
                            setStep(1);
                            setSelectedRecipients([]);
                          }}
                          disabled={selectedRecipients.length === 0}
                          className={`px-12 py-3 rounded-lg font-bold transition-all shadow-lg uppercase tracking-wider ${
                            selectedRecipients.length > 0 
                              ? 'bg-[#1B1A16] text-white hover:bg-[#2d2c26]' 
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Send
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
            {messages.map((msg, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td 
                  className="px-6 py-4 text-sm font-bold text-gray-900 cursor-pointer hover:text-[#1B1A16] hover:underline"
                  onClick={() => setViewingMessage(msg)}
                >
                  {msg.taluka}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 border-l border-gray-200">{msg.sender}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-l border-gray-200">{msg.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600 border-l border-gray-200">{msg.time}</td>
                <td className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200 text-center font-medium">{msg.sent}</td>
                <td className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200 text-center font-medium">{msg.delivered}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-bold">
              <td colSpan={4} className="px-6 py-4 text-right text-sm text-gray-900">Total</td>
              <td className="px-6 py-4 text-sm text-gray-900 text-center border-l border-gray-200">{messages.reduce((acc, curr) => acc + curr.sent, 0)}</td>
              <td className="px-6 py-4 text-sm text-gray-900 text-center border-l border-gray-200">{messages.reduce((acc, curr) => acc + curr.delivered, 0)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

const DashboardContent = () => {
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
        {stats.map((stat, idx) => (
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
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +12.5%
              </span>
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
        {/* RSVP Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center">
              <BarChart3 size={20} className="mr-2 text-[#FFE400]" />
              RSVP Activity
            </h3>
            <select className="text-sm border-gray-200 rounded-md">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rsvpData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {rsvpData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1B1A16' : '#FFE400'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center">
            <Bell size={20} className="mr-2 text-[#1B1A16]" />
            Recent Activity
          </h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-[#FFE400] flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New user onboarded from Taluka A</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-sm font-bold text-[#1B1A16] hover:underline">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [activePage, setActivePage] = useState<Page>("dashboard");

  // Login Screen State
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [isResetSent, setIsResetSent] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Simple mock login
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const handleForgotPassword = (e: FormEvent) => {
    e.preventDefault();
    if (forgotEmail) {
      setIsResetSent(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

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
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1B1A16] focus:border-transparent outline-none transition-all"
                        placeholder="Enter your username"
                        required
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

                    <button
                      type="submit"
                      className="w-full bg-[#1B1A16] hover:bg-[#2d2c26] text-white font-bold py-4 rounded-md transition-all transform active:scale-[0.98] shadow-lg uppercase tracking-widest"
                    >
                      Login
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
        <Header />
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
            {activePage === "taluka" && (
              <motion.div
                key="taluka"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TalukaVillageContent />
              </motion.div>
            )}
            {activePage === "users" && (
              <motion.div
                key="other"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 flex flex-col items-center justify-center h-full text-gray-400"
              >
                <BarChart3 size={64} className="mb-4 opacity-20" />
                <h2 className="text-2xl font-bold uppercase tracking-widest">
                  {activePage.replace("-", " ")} Page
                </h2>
                <p className="mt-2">This section is currently under development.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
