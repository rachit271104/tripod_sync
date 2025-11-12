import React from 'react';
import SidebarNav from './SidebarNav';
import MemberList from './MemberList';
import SettingsButton from './SettingsButton';
import { Video } from 'lucide-react';

export default function Sidebar({ members }) {
  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <Video size={18} className="text-white" />
        </div>
        <span className="text-lg font-semibold">Tripod</span>
      </div>

      <SidebarNav />
      <MemberList members={members} />
      <SettingsButton />
    </div>
  );
}
