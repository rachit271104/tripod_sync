import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");

  // Generate a random room ID
  const handleCreateParty = () => {
    const randomId = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${randomId}`);
  };

  const handleJoinParty = () => {
    if (roomCode.trim() !== "") {
      navigate(`/room/${roomCode}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-blue-400">🎬 Tripod Sync</h1>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md">
          Login
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col flex-1 items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Watch Offline Movies <span className="text-blue-400">Together</span>
        </h2>

        <p className="max-w-xl text-gray-300 mb-8">
          Create a party, invite your friends, and enjoy your favorite movies
          perfectly in sync — even offline!
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-10">
          <button
            onClick={handleCreateParty}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-md text-lg font-semibold"
          >
            🎉 Create New Party
          </button>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter Party Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="bg-gray-800 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleJoinParty}
              className="px-4 py-3 bg-green-500 hover:bg-green-600 rounded-md font-semibold"
            >
              Join
            </button>
          </div>
        </div>

        {/* How It Works */}
        <section className="max-w-3xl text-gray-400 space-y-4">
          <h3 className="text-xl font-semibold text-white mb-2">
            How Tripod Sync Works
          </h3>
          <p>
            1️⃣ Create a private room and invite your friends using a shareable link.  
            2️⃣ Everyone loads the same movie file from their device.  
            3️⃣ Any play, pause, or seek action stays in perfect sync for all users!
          </p>
          <p className="italic">
            (Future updates: AI companion, video chat, scribble tool, and more!)
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Tripod Sync | Made with ❤️ 
      </footer>
    </div>
  );
}

export default HomePage;
