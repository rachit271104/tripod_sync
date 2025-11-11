import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import MainContent from './MainContent/MainContent';
import RightSidebar from './RightSidebar/RightSidebar';

export default function TripodSync() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const members = [
    { id: 1, name: 'You', avatar: '👤', status: 'online' },
    { id: 2, name: 'Alex Chen', avatar: '👤', status: 'online' },
    { id: 3, name: 'Sarah Kim', avatar: '👤', status: 'online' },
    { id: 4, name: 'Mike Ross', avatar: '👤', status: 'away' }
  ];

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar members={members} />
      <MainContent
        members={members}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isVideoOff={isVideoOff}
        setIsVideoOff={setIsVideoOff}
      />
      <RightSidebar members={members} />
    </div>
  );
}
