import React from "react";
import Navbar from "../components/Navbar";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import VideoPlayer from "../components/VideoPlayer";
import ChatBox from "../components/ChatBox";

function RoomPage() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Party Members */}
        <SidebarLeft />

        {/* Center Section */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Video Player */}
          <div className="flex-1 flex items-center justify-center p-4">
            <VideoPlayer />
          </div>

          {/* Live Chat (Collapsible) */}
          <ChatBox />
        </div>

        {/* Right Sidebar - Friends’ Videos */}
        <SidebarRight />
      </div>
    </div>
  );
}

export default RoomPage;
