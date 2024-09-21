import React, { useState, useRef, useEffect } from "react";

const CirclePlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleTouch = () => {
      setTimeout(() => {
        setShowControls(true);
      }, 2000);
    };

    window.addEventListener("touchstart", handleTouch);
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const progress =
      (video.currentTime / video.duration) * 100 || 0;
    video.style.setProperty("--progress", `${progress}%`);
  };

  return (
    <div
      className="circle-player"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        togglePlayPause();
        setShowControls(true);
      }}
    >
      <video
        ref={videoRef}
        src={src}
        className="circle-video"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        loop
      />
      {(hovered || showControls) && (
        <div className="play-pause-button" onClick={(e) => e.stopPropagation()}>
          {isPlaying ? "❚❚" : "►"}
        </div>
      )}
      <div className="loading-bar"></div>
    </div>
  );
};

export default CirclePlayer;
