import React, { useEffect, useRef } from "react";
import { Video } from "lucide-react";
import { socket } from "../../socket";




export default function VideoPlayer({ selectedFile, setSelectedFile }) {
  const videoRef = useRef(null);

  // ✅ Load from localStorage (set during create/join)
  const roomId = localStorage.getItem("roomId");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    if (!roomId) {
      console.warn("⚠️ No roomId found in localStorage.");
      return;
    }

    // join the correct room
    socket.emit("join-room", roomId);

    // listen for video updates from backend
    socket.on("video-update", ({ currentTime, isPlaying }) => {
      const video = videoRef.current;
      if (!video) return;

      // Sync time
      video.currentTime = currentTime;

      // Play or pause
      if (isPlaying) video.play();
      else video.pause();
    });

    // handle sync when new user joins
    socket.on("sync-video", ({ currentTime, isPlaying }) => {
      const video = videoRef.current;
      if (!video) return;

      video.currentTime = currentTime;

      if (isPlaying) video.play();
      else video.pause();
    });

    return () => {
      socket.off("video-update");
      socket.off("sync-video");
    };
  }, [roomId]);

  // ✅ Send admin updates
  const handlePlay = () => {
    if (isAdmin && videoRef.current) {
      socket.emit("admin-update", {
        roomId,
        currentTime: videoRef.current.currentTime,
        isPlaying: true,
      });
    }
  };

  const handlePause = () => {
    if (isAdmin && videoRef.current) {
      socket.emit("admin-update", {
        roomId,
        currentTime: videoRef.current.currentTime,
        isPlaying: false,
      });
    }
  };

  const handleSeeked = () => {
    if (isAdmin && videoRef.current) {
      socket.emit("admin-update", {
        roomId,
        currentTime: videoRef.current.currentTime,
        isPlaying: !videoRef.current.paused,
      });
    }
  };

  return (
    <div className="aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
      {selectedFile ? (
        <video
          ref={videoRef}
          className="w-full h-full bg-black"
          src={selectedFile}
          controls
          onPlay={handlePlay}
          onPause={handlePause}
          onSeeked={handleSeeked}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Video size={48} className="text-zinc-700 mb-4" />
          <p className="text-zinc-500 mb-6">No video selected</p>
          <label className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer transition-colors text-sm font-medium">
            Choose Video
            <input
              type="file"
              className="hidden"
              accept="video/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setSelectedFile(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </label>
        </div>
      )}
    </div>
  );
}
