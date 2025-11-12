import React, { useEffect, useRef } from "react";
import { Video } from "lucide-react";
import { io } from "socket.io-client";

const socket = io("http://10.35.113.75:5000"); // connect to backend

export default function VideoPlayer({ selectedFile, setSelectedFile }) {
  const videoRef = useRef(null);
  const roomId = "tripod-test-room"; // temporary static room
  const isAdmin = true; // for now, assume first tab is admin

  useEffect(() => {
    // join the room
    socket.emit("join-room", roomId);

    // handle updates from admin (play/pause/seek)
    socket.on("video-update", ({ currentTime, isPlaying }) => {
      const video = videoRef.current;
      if (!video) return;

      // Sync the playback time
      video.currentTime = currentTime;

      // Play or pause depending on admin state
      if (isPlaying) video.play();
      else video.pause();
    });

    // handle initial sync for new users joining late
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
  }, []);

  // when admin plays video
  const handlePlay = () => {
    if (isAdmin) {
      const currentTime = videoRef.current.currentTime;
      socket.emit("admin-update", {
        roomId,
        currentTime,
        isPlaying: true,
      });
    }
  };

  // when admin pauses video
  const handlePause = () => {
    if (isAdmin) {
      const currentTime = videoRef.current.currentTime;
      socket.emit("admin-update", {
        roomId,
        currentTime,
        isPlaying: false,
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
