import React from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';

export default function VideoControls({
  isMuted,
  setIsMuted,
  isVideoOff,
  setIsVideoOff,
}) {
  return (
    <div className="mt-6 flex items-center justify-center space-x-3">
      <button
        onClick={() => setIsMuted(!isMuted)}
        className={`p-4 rounded-full transition-colors ${
          isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-zinc-800 hover:bg-zinc-700'
        }`}
      >
        {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
      </button>
      <button
        onClick={() => setIsVideoOff(!isVideoOff)}
        className={`p-4 rounded-full transition-colors ${
          isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-zinc-800 hover:bg-zinc-700'
        }`}
      >
        {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
      </button>
      <button className="p-4 bg-red-500 hover:bg-red-600 rounded-full transition-colors">
        <PhoneOff size={20} />
      </button>
    </div>
  );
}
