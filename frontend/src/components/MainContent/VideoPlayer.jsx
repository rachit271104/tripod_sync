import React from 'react';
import { Video } from 'lucide-react';

export default function VideoPlayer({ selectedFile, setSelectedFile }) {
  return (
    <div className="aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
      {selectedFile ? (
        <video className="w-full h-full bg-black" controls src={selectedFile}>
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Video size={48} className="text-zinc-700 mb-4" />
          <p className="text-zinc-500 mb-6">No video selected</p>
          <label className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer transition-colors text-sm font-medium">
            Choose Video
            <input
              type="file"
              className="hidden"
              accept="video/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setSelectedFile(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </label>
        </div>
      )}
    </div>
  );
}
