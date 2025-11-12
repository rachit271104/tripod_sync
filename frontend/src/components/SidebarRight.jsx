import React from "react";
import { Mic, Video } from "lucide-react";

const participants = [
  { name: "You", mic: true },
  { name: "Alex Chen", mic: true },
  { name: "Sarah Kim", mic: true },
  { name: "Mike Ross", mic: false },
];

const SidebarRight = () => {
  return (
    <aside className="w-96 h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-800">
        <Video className="w-5 h-5 text-white" />
        <h2 className="text-white text-lg font-medium">Video Call</h2>
      </div>

      {/* Participants List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {participants.map((p, i) => (
          <div
            key={i}
            className="relative bg-[#1a1a1a] rounded-lg overflow-hidden aspect-video"
          >
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#5b4a9d] flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-[#8b7bc4]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>

            {/* Name Badge */}
            <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 px-3 py-1 rounded">
              <span className="text-white text-sm font-medium">{p.name}</span>
            </div>

            {/* Status Indicators */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              {/* Camera Status */}
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>

              {/* Mic Status */}
              <button className="w-7 h-7 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] flex items-center justify-center transition-colors">
                <Mic
                  className={`w-3.5 h-3.5 ${p.mic ? "text-white" : "text-red-500"}`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarRight;