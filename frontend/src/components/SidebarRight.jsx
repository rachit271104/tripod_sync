import React from "react";

function SidebarRight() {
  const participants = [
    { id: 1, name: " You ", img: "../public/image.jpeg" },
    { id: 2, name: "Friend 1", img: "../public/image.jpeg" },
    { id: 3, name: "Friend 2", img: "../public/image.jpeg" },
    { id: 4, name: "Friend 3", img: "../public/samplephoto.jpeg" },
  ];

  return (
    <aside className="w-64 bg-gray-800 border-l border-gray-700 p-4 flex flex-col shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-center">🎥 Watch Party</h2>

      <div className="grid grid-cols-2 gap-3">
        {participants.map((p) => (
          <div
            key={p.id}
            className="bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg flex flex-col items-center justify-center p-2 transition"
          >
            <div className="w-24 h-20 bg-gray-600 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-300 text-xs mt-2">{p.name}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default SidebarRight;
