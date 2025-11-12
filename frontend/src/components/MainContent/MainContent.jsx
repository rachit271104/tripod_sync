import React from 'react';
import VideoPlayer from './VideoPlayer';
import VideoControls from './VideoControls';

export default function MainContent({
  members,
  selectedFile,
  setSelectedFile,
  isMuted,
  setIsMuted,
  isVideoOff,
  setIsVideoOff,
}) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-16 bg-zinc-950 border-b border-zinc-900 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-medium">Watch Party</h1>
          <span className="text-sm text-zinc-500">{members.length} participants</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-sm rounded-lg transition-colors">
            Share Link
          </button>
          <button className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-sm rounded-lg transition-colors">
            More
          </button>
        </div>
      </div>

      {/* Video Section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-zinc-950">
        <div className="w-full max-w-4xl">
          <VideoPlayer selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
          <VideoControls
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            isVideoOff={isVideoOff}
            setIsVideoOff={setIsVideoOff}
          />
        </div>
      </div>
    </div>
  );
}
