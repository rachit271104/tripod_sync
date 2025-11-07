import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React frontend
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

// Store video states for each room
const roomStates = {}; // { roomId: { time: 0, isPlaying: false } }

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  // When user joins a room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`👥 ${socket.id} joined room ${roomId}`);

    // Send current room state (if exists)
    if (roomStates[roomId]) {
      socket.emit("sync-video", roomStates[roomId]);
    } else {
      roomStates[roomId] = { time: 0, isPlaying: false };
    }
  });

  // Handle play event
  socket.on("play-video", ({ roomId, time }) => {
    console.log(`▶️ Play in room ${roomId} at ${time.toFixed(2)}s`);

    // Update room state
    roomStates[roomId] = { time, isPlaying: true };

    // Broadcast to others in the room
    socket.to(roomId).emit("play-video", time);
  });

  // Handle pause event
  socket.on("pause-video", ({ roomId, time }) => {
    console.log(`⏸ Pause in room ${roomId} at ${time.toFixed(2)}s`);

    // Update room state
    roomStates[roomId] = { time, isPlaying: false };

    // Broadcast to others in the room
    socket.to(roomId).emit("pause-video", time);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
