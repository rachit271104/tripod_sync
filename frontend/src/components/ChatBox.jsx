import React, { useState } from "react";

function ChatBox() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800 border-t border-gray-700">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 flex justify-between items-center"
      >
        <span className="font-semibold">💬 Live Chat</span>
        <span>{isExpanded ? "▲" : "▼"}</span>
      </button>

      {/* Chat Messages (visible only if expanded) */}
      {isExpanded && (
        <div className="p-4 h-48 overflow-y-auto text-gray-300 space-y-2">
          <p>
            <strong>Rachit:</strong> Ready to start the movie?
          </p>
          <p>
            <strong>Friend 1:</strong> Yep! 🍿
          </p>
          <p>
            <strong>Friend 2:</strong> Let’s go!
          </p>

          {/* Chat Input */}
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-l-md outline-none"
            />
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
