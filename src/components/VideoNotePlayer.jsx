import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause } from 'react-icons/fa';

const VideoNotePlayer = ({ videoSrc, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [hasError, setHasError] = useState(false);
  const playerRef = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
  };

  const handleError = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (isPlaying && played === 1) {
      setPlayed(0);
    }
  }, [played, isPlaying]);

  if (hasError) {
    return <div className="video-error">Error loading video</div>;
  }

  return (
    <div
      className={`video-note-container ${isPlaying ? 'playing' : ''}`}
      onClick={handlePlayPause}
      role="button"
      aria-label={isPlaying ? 'Pause video note' : 'Play video note'}
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handlePlayPause();
        }
      }}
    >
      <ReactPlayer
        ref={playerRef}
        url={videoSrc}
        playing={isPlaying}
        loop
        muted
        width="100%"
        height="100%"
        style={{ borderRadius: '50%' }}
        light={thumbnail}
        onProgress={handleProgress}
        onError={handleError}
        playIcon={null}
        controls={false}
      />
     
      <svg className="progress-ring" width="100%" height="100%" viewBox="0 0 60 60">
        <circle
          className="progress-ring-circle"
          stroke="#00a884"
          strokeWidth="2"
          fill="transparent"
          r="28"
          cx="30"
          cy="30"
          style={{
            strokeDasharray: `${2 * Math.PI * 28}`,
            strokeDashoffset: `${2 * Math.PI * 28 * (1 - played)}`,
          }}
        />
      </svg>
    </div>
  );
};

export default VideoNotePlayer;