import React, { useRef } from "react";

function VideoPlayer() {
  const videoRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      videoRef.current.src = url;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <video
        ref={videoRef}
        controls
        className="w-[80%] max-h-[70vh] rounded-lg border border-gray-700 shadow-md"
      />
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="text-sm text-gray-300"
      />
    </div>
  );
}

export default VideoPlayer;
