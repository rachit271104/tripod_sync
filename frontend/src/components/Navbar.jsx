import React from "react";
import { Share2, MoreHorizontal } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full h-14 bg-[#16181d] flex justify-between items-center px-6 border-b border-gray-700 shadow-lg">
      <h1 className="text-xl font-semibold text-gray-200">🎬 Watch Party</h1>
      <div className="flex items-center gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md flex items-center gap-2 transition">
          <Share2 className="w-4 h-4" />
          Share Link
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-1.5 rounded-md flex items-center gap-2 transition">
          <MoreHorizontal className="w-4 h-4" />
          More
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
