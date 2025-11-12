import { io } from "socket.io-client";

// Change localhost to your LAN IP for mobile testing if needed
export const socket = io("http://localhost:5000", {
  autoConnect: true,
});
