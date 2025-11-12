import React from "react";
import { Users, Video, MessageSquare, Settings } from "lucide-react";

const members = [
  { name: "You", status: "online" },
  { name: "Alex Chen", status: "online" },
  { name: "Sarah Kim", status: "online" },
  { name: "Mike Ross", status: "away" },
];

const SidebarLeft = () => {
  return (
    <aside className="w-60 bg-[#16181d] border-r border-gray-700 flex flex-col justify-between p-4">
      <div>
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-400" /> Members
        </h2>

        <ul className="flex flex-col gap-3">
          {members.map((m, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-gray-300 hover:bg-gray-800 px-3 py-2 rounded-md cursor-pointer transition"
            >
              <div className="relative">
                <img
                  src={`https://i.pravatar.cc/40?img=${i + 1}`}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-gray-900 ${
                    m.status === "online"
                      ? "bg-green-500"
                      : m.status === "away"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                ></span>
              </div>
              <span className="text-sm">{m.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-700 pt-3">
        <button className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition">
          <Settings className="w-5 h-5" /> Settings
        </button>
      </div>
    </aside>
  );
};

export default SidebarLeft;
