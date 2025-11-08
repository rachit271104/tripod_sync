import React from "react";

function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-800 px-6 py-3 shadow-md border-b border-gray-700">
      <h1 className="text-xl font-bold text-blue-400">🎬 Tripod Sync</h1>

      <div className="flex gap-3">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
          Invite Link
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm">
          Scribble
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm">
          More
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
