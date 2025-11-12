import React from 'react';

export default function MemberList({ members }) {
  return (
    <div className="flex-1 px-3 mt-6 overflow-y-auto">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3 px-3">
        In Call
      </p>
      <div className="space-y-0.5">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-sm">
                {member.avatar}
              </div>
              <div
                className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-950 ${
                  member.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              ></div>
            </div>
            <span className="text-sm flex-1 truncate">{member.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
