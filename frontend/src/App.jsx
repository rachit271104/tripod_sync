import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const videoRef = useRef(null);

  const handleJoin = () => {
    if (!roomId) return alert("Enter room ID");
    socket.emit("join-room", roomId);
    setJoined(true);
  };

  useEffect(() => {
    const video = videoRef.current;

    socket.on("play", (time) => {
      if (video.paused) {
        video.currentTime = time;
        video.play();
      }
    });

    socket.on("pause", (time) => {
      video.currentTime = time;
      video.pause();
    });

    socket.on("seek", (time) => {
      video.currentTime = time;
    });
  }, []);

  const handlePlay = () => {
    socket.emit("play", { roomId, time: videoRef.current.currentTime });
  };

  const handlePause = () => {
    socket.emit("pause", { roomId, time: videoRef.current.currentTime });
  };

  const handleSeek = () => {
    socket.emit("seek", { roomId, time: videoRef.current.currentTime });
  };

  return (
    <div style={{ padding: 20 }}>
      {!joined ? (
        <div>
          <h2>Join a Room</h2>
          <input
            type="text"
            placeholder="Enter room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={handleJoin}>Join</button>
        </div>
      ) : (
        <div>
          <h2>Room: {roomId}</h2>
          <video
            ref={videoRef}
            width="720"
            controls
            src="/sample.mp4"
            onPlay={handlePlay}
            onPause={handlePause}
            onSeeked={handleSeek}
          />
        </div>
      )}
    </div>
  );
}

export default App;
