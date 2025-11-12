import React from 'react';
import { Mic } from 'lucide-react';

export default function MemberVideoGrid({ members }) {
  return (
    <div className="flex-1 overflow-y-auto p-3">
      <div className="space-y-2">
        {members.map((member) => (
          <div
            key={member.id}
            className="relative bg-zinc-900 rounded-xl overflow-hidden group"
          >
            <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
              <div className="text-5xl">{member.avatar}</div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-medium">{member.name}</span>
                <div className="flex items-center space-x-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      member.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  ></div>
                  {member.status === 'online' && (
                    <div className="w-5 h-5 bg-zinc-800/80 rounded-full flex items-center justify-center">
                      <Mic size={12} className="text-emerald-500" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <button className="px-3 py-1.5 bg-zinc-900/90 text-white text-xs rounded-lg hover:bg-zinc-800 transition-colors">
                Pin
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
