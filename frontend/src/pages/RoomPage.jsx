import React, { useEffect, useState } from "react";
import { socket } from "../socket";

import TripodSync from "../components/TripodSync";

 // same backend URL

function RoomPage() {
  const [roomId, setRoomId] = useState(localStorage.getItem("roomId") || "");
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const [copyText, setCopyText] = useState("Copy Party Link");

  useEffect(() => {
    if (roomId) {
      socket.emit("join-room", roomId);

      socket.on("room-joined", () => {
        console.log(`✅ Joined room ${roomId}`);
      });

      socket.on("room-error", (msg) => {
        alert(msg);
      });

      return () => {
        socket.off("room-joined");
        socket.off("room-error");
      };
    }
  }, [roomId]);

  const handleCopy = () => {
    const link = `${window.location.origin}/?party=${roomId}`;
    navigator.clipboard.writeText(link);
    setCopyText("✅ Copied!");
    setTimeout(() => setCopyText("Copy Party Link"), 2000);
  };
//temperary
useEffect(() => {
  socket.on("connect", () => {
    console.log("🟣 Connected socket ID (Room):", socket.id);
  });

  return () => socket.off("connect");
}, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 text-white flex flex-col">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 bg-gray-800 border-b border-gray-700">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          Tripod Sync
          <span
            className={`text-sm px-2 py-0.5 rounded-md ${
              isAdmin ? "bg-blue-600" : "bg-green-600"
            }`}
          >
            {isAdmin ? "Admin" : "Guest"}
          </span>
        </h1>

        <button
          onClick={handleCopy}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium"
        >
          {copyText}
        </button>
      </header>

      {/* Main TripodSync UI */}
      {roomId ? (
        <TripodSync socket={socket} roomId={roomId} isAdmin={isAdmin} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          No active room found. Please create or join one.
        </div>
      )}
    </div>
  );
}

export default RoomPage;
