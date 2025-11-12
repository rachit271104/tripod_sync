import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (you can restrict later)
    methods: ["GET", "POST"],
  },
});

// In-memory store for room data
// Structure: roomId → { adminId, currentTime, isPlaying, members: [] }
const rooms = new Map();

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  // ✅ 1. Admin creates a new room
  socket.on("create-room", () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    socket.join(roomId);

    rooms.set(roomId, {
      adminId: socket.id,
      currentTime: 0,
      isPlaying: false,
      members: [socket.id],
    });

    console.log(`🎬 Room created: ${roomId} by ${socket.id}`);
    socket.emit("room-created", roomId);
  });

  // ✅ 2. User joins an existing room
  socket.on("join-room", (roomId) => {
    const room = rooms.get(roomId);

    if (!room) {
      console.log(`⚠️ Attempt to join invalid room: ${roomId}`);
      socket.emit("room-error", "Room not found");
      return;
    }

    socket.join(roomId);
    room.members.push(socket.id);
    rooms.set(roomId, room);

    console.log(`👥 ${socket.id} joined room ${roomId}`);

    // Send initial sync state to the new user
    io.to(socket.id).emit("sync-video", {
      currentTime: room.currentTime,
      isPlaying: room.isPlaying,
    });

    // Notify others about new member
    socket.to(roomId).emit("member-joined", { memberId: socket.id });
  });

  // ✅ 3. Admin updates playback (play, pause, seek)
  socket.on("admin-update", ({ roomId, currentTime, isPlaying }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    // Only admin should be able to control playback
    if (socket.id !== room.adminId) {
      console.log(`⛔ Non-admin tried to control video in ${roomId}`);
      return;
    }

    // Update room state
    room.currentTime = currentTime;
    room.isPlaying = isPlaying;
    rooms.set(roomId, room);

    console.log(
      `🎞️ ${isPlaying ? "Playing" : "Paused"} in ${roomId} at ${currentTime.toFixed(2)}`
    );

    // Broadcast updated state to everyone else
    socket.to(roomId).emit("video-update", { currentTime, isPlaying });
  });

  // ✅ 4. New user requests sync manually
  socket.on("request-sync", (roomId) => {
    const room = rooms.get(roomId);
    if (room) {
      io.to(socket.id).emit("sync-video", {
        currentTime: room.currentTime,
        isPlaying: room.isPlaying,
      });
    }
  });

  // ✅ 5. Handle user disconnect
  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);

    // Clean up rooms if needed
    for (const [roomId, room] of rooms.entries()) {
      if (room.members.includes(socket.id)) {
        room.members = room.members.filter((m) => m !== socket.id);

        // If admin leaves, assign a new admin (first member if exists)
        if (socket.id === room.adminId && room.members.length > 0) {
          room.adminId = room.members[0];
          console.log(`👑 New admin for ${roomId}: ${room.adminId}`);
          io.to(room.adminId).emit("admin-role-assigned", roomId);
        }

        // If no members left, delete room
        if (room.members.length === 0) {
          rooms.delete(roomId);
          console.log(`🗑️ Room ${roomId} deleted (no members left)`);
        } else {
          rooms.set(roomId, room);
        }
      }
    }
  });
});

// ✅ 6. Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
