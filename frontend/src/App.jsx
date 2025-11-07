import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const videoRef = useRef(null);
  const roomId = "q0s4i6"; // 👈 use same room as your backend logs

  // Prevents feedback loop (when we play from socket, don't re-emit)
  const isRemoteAction = useRef(false);

  useEffect(() => {
    // Join room
    socket.emit("join-room", roomId);
    console.log("🟢 Joined room:", roomId);

    // When PLAY is received from other user
    socket.on("play", (time) => {
      console.log("▶️ Received PLAY:", time);
      const video = videoRef.current;
      if (!video) return;

      isRemoteAction.current = true;
      video.currentTime = time;
      video.play().catch((err) => console.warn("⚠️ Play blocked:", err));
      setTimeout(() => (isRemoteAction.current = false), 500);
    });

    // When PAUSE is received from other user
    socket.on("pause", (time) => {
      console.log("⏸ Received PAUSE:", time);
      const video = videoRef.current;
      if (!video) return;

      isRemoteAction.current = true;
      video.currentTime = time;
      video.pause();
      setTimeout(() => (isRemoteAction.current = false), 500);
    });

    // When SEEK is received from other user
    socket.on("seek", (time) => {
      console.log("⏩ Received SEEK:", time);
      const video = videoRef.current;
      if (!video) return;

      isRemoteAction.current = true;
      video.currentTime = time;
      setTimeout(() => (isRemoteAction.current = false), 500);
    });
  }, []);

  // Local event handlers
  const handlePlay = () => {
    if (isRemoteAction.current) return;
    const time = videoRef.current.currentTime;
    socket.emit("play", { roomId, time });
    console.log("▶️ Local play emitted:", time);
  };

  const handlePause = () => {
    if (isRemoteAction.current) return;
    const time = videoRef.current.currentTime;
    socket.emit("pause", { roomId, time });
    console.log("⏸ Local pause emitted:", time);
  };

  const handleSeek = () => {
    if (isRemoteAction.current) return;
    const time = videoRef.current.currentTime;
    socket.emit("seek", { roomId, time });
    console.log("⏩ Local seek emitted:", time);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>🎬 Tripod Sync — Room {roomId}</h1>
      <video
  ref={videoRef}
  width="640"
  controls
  src="/sample.mp4"
  onPlay={handlePlay}
  onPause={handlePause}
  onSeeked={handleSeek}
/>

    </div>
  );
}

export default App;
