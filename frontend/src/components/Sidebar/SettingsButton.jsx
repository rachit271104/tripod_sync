import React from 'react';
import { Settings } from 'lucide-react';

export default function SettingsButton() {
  return (
    <div className="p-3 border-t border-zinc-900">
      <button className="w-full px-3 py-2.5 rounded-lg flex items-center space-x-3 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">
        <Settings size={18} />
        <span>Settings</span>
      </button>
    </div>
  );
}
