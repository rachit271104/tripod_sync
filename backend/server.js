import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // frontend
    methods: ["GET", "POST"],
  },
});

// In-memory store for room data
const rooms = new Map(); // roomId → { adminId, currentTime, isPlaying }

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  // User joins a room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`👥 ${socket.id} joined room ${roomId}`);

    const room = rooms.get(roomId);
    if (room && room.isPlaying !== undefined) {
      // Send current playback state to new user
      io.to(socket.id).emit("sync-video", {
        currentTime: room.currentTime,
        isPlaying: room.isPlaying,
      });
    }
  });

  // Admin updates playback (play/pause/seek)
  socket.on("admin-update", ({ roomId, currentTime, isPlaying }) => {
    const existingRoom = rooms.get(roomId) || {};
    rooms.set(roomId, {
      ...existingRoom,
      adminId: existingRoom.adminId || socket.id,
      currentTime,
      isPlaying,
    });

    console.log(
      `🎬 ${isPlaying ? "Playing" : "Paused"} in ${roomId} at ${currentTime}`
    );

    // Broadcast to everyone except admin
    socket.to(roomId).emit("video-update", { currentTime, isPlaying });
  });

  // Sync request (used if new user clicks a “Sync Me” button)
  socket.on("request-sync", (roomId) => {
    const room = rooms.get(roomId);
    if (room) {
      io.to(socket.id).emit("sync-video", {
        currentTime: room.currentTime,
        isPlaying: room.isPlaying,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
