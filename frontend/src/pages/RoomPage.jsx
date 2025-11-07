import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function RoomPage() {
  const { roomId } = useParams();
  const videoRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Join the room
  useEffect(() => {
    socket.emit("join-room", roomId);
    console.log(`Joined room: ${roomId}`);

    socket.on("play-video", (time) => {
      const video = videoRef.current;
      if (!video) return;
      console.log("▶️ Received play at time:", time);

      if (Math.abs(video.currentTime - time) > 0.5) {
        video.currentTime = time;
      }
      video.play();
    });

    socket.on("pause-video", (time) => {
      const video = videoRef.current;
      if (!video) return;
      console.log("⏸ Received pause at time:", time);

      if (Math.abs(video.currentTime - time) > 0.5) {
        video.currentTime = time;
      }
      video.pause();
    });

    return () => {
      socket.off("play-video");
      socket.off("pause-video");
    };
  }, [roomId]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoFile(videoURL);
      setIsReady(true);
    }
  };

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    console.log("▶️ Play pressed, sending time:", video.currentTime);
    socket.emit("play-video", { roomId, time: video.currentTime });
  };

  const handlePause = () => {
    const video = videoRef.current;
    if (!video) return;
    console.log("⏸ Pause pressed, sending time:", video.currentTime);
    socket.emit("pause-video", { roomId, time: video.currentTime });
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-semibold mb-4">
        Room ID: <span className="text-blue-600">{roomId}</span>
      </h1>

      {!isReady ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg">Upload your video file (.mp4 / .mkv):</p>
          <input type="file" accept="video/*" onChange={handleFileUpload} />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <video
            ref={videoRef}
            src={videoFile}
            controls
            width="720"
            onPlay={handlePlay}
            onPause={handlePause}
          />
        </div>
      )}
    </div>
  );
}
