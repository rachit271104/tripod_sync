import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  // Join a room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`👥 ${socket.id} joined room: ${roomId}`);
  });

  // Broadcast playback events only within the same room
  socket.on("play", ({ roomId, time }) => {
    console.log(`▶️ Play in room ${roomId} at ${time}`);
    socket.to(roomId).emit("play", time);
  });

  socket.on("pause", ({ roomId, time }) => {
    console.log(`⏸️ Pause in room ${roomId} at ${time}`);
    socket.to(roomId).emit("pause", time);
  });

  socket.on("seek", ({ roomId, time }) => {
    console.log(`⏩ Seek in room ${roomId} to ${time}`);
    socket.to(roomId).emit("seek", time);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
