import React from 'react';
import { Users, Video, MessageSquare } from 'lucide-react';

export default function SidebarNav() {
  const navItems = [
    { label: 'Members', icon: Users, active: true },
    { label: 'Videos', icon: Video },
    { label: 'Chat', icon: MessageSquare },
  ];

  return (
    <div className="px-3 space-y-1">
      {navItems.map(({ label, icon: Icon, active }) => (
        <button
          key={label}
          className={`w-full px-3 py-2.5 rounded-lg flex items-center space-x-3 text-sm font-medium transition-colors ${
            active ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
