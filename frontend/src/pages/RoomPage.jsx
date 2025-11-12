import React from "react";
import Navbar from "../components/Navbar";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import VideoPlayer from "../components/VideoPlayer";
import ChatBox from "../components/ChatBox";

const RoomPage = () => {
  return (
    <div className="h-screen w-full bg-[#0e0e10] text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <SidebarLeft />

        {/* Middle Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <VideoPlayer />
          <ChatBox />
        </div>

        {/* Right Sidebar */}
        <SidebarRight />
      </div>
    </div>
  );
};

export default RoomPage;
