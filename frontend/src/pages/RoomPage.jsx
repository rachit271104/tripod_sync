import React, { useState } from "react";
import TripodSync from "../components/TripodSync";

function RoomPage() {
  // Temporary fake data — can be replaced later with backend sync
  const [selectedFile, setSelectedFile] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const members = [
    { id: 1, name: "You", avatar: "👤", status: "online" },
    { id: 2, name: "Alex Chen", avatar: "👤", status: "online" },
    { id: 3, name: "Sarah Kim", avatar: "👤", status: "online" },
    { id: 4, name: "Mike Ross", avatar: "👤", status: "away" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Top Header */}
      <header className="h-16 flex items-center justify-between px-6 bg-gray-800 border-b border-gray-700">
        <h1 className="text-xl font-semibold">Tripod Sync</h1>
        <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium">
          Invite Friends
        </button>
      </header>

      {/* Main TripodSync Component */}
      <TripodSync
        members={members}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isVideoOff={isVideoOff}
        setIsVideoOff={setIsVideoOff}
      />
    </div>
  );
}

export default RoomPage;
