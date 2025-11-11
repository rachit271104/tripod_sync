import React from 'react';
import { Video } from 'lucide-react';
import MemberVideoGrid from './MemberVideoGrid';

export default function RightSidebar({ members }) {
  return (
    <div className="w-80 bg-zinc-950 border-l border-zinc-900 flex flex-col">
      <div className="p-4 border-b border-zinc-900">
        <h2 className="text-sm font-medium flex items-center">
          <Video size={16} className="mr-2 text-zinc-400" />
          Video Call
        </h2>
      </div>
      <MemberVideoGrid members={members} />
    </div>
  );
}
