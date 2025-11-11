import React, { useState } from "react";
import SidebarLeft from "../components/Sidebar/Sidebar";
import SidebarRight from "../components/RightSidebar/RightSidebar";
import VideoPlayer from "../components/MainContent/VideoPlayer";
import VideoControls from "../components/MainContent/VideoControls";

function RoomPage() {
  // 🎬 Local states
  const [selectedFile, setSelectedFile] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // 👥 Dummy member list
  const members = [
    { id: 1, name: "You", avatar: "👤", status: "online" },
    { id: 2, name: "Alex Chen", avatar: "👤", status: "online" },
    { id: 3, name: "Sarah Kim", avatar: "👤", status: "online" },
    { id: 4, name: "Mike Ross", avatar: "👤", status: "away" },
  ];

  return (
    <div className="bg-linear-to-br from-gray-900 to-gray-800 text-white h-screen flex overflow-hidden">
      {/* 🧍 Left Sidebar (Members, Nav, Settings) */}
      <SidebarLeft members={members} />

      {/* 🎥 Center Section (Video Player + Controls) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center p-4 bg-zinc-950">
          <div className="w-full max-w-4xl">
            <VideoPlayer
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
            <VideoControls
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              isVideoOff={isVideoOff}
              setIsVideoOff={setIsVideoOff}
            />
          </div>
        </div>
      </div>

      {/* 👥 Right Sidebar (Member Video Grid) */}
      <SidebarRight members={members} />
    </div>
  );
}

export default RoomPage;
