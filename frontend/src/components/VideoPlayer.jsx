import React from "react";
import { VideoOff } from "lucide-react";

const VideoPlayer = () => {
  return (
    <div className="bg-[#1b1c22] rounded-lg w-[75%] h-[60vh] flex flex-col items-center justify-center border border-gray-700 shadow-lg">
      <VideoOff className="w-12 h-12 text-gray-500 mb-3" />
      <p className="text-gray-400 mb-4">No video selected</p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition">
        Choose Video
      </button>
    </div>
  );
};

export default VideoPlayer;
