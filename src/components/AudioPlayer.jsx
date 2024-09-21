import React, { useState, useRef, useEffect } from 'react';

// Utility hook to get window dimensions
const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let timeoutId = null;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150); // Debounce delay
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};

// Define theme styles
const themeStyles = {
  green: {
    primaryColor: "#7CD441",
    secondaryColor: "#5A9F30",
    backgroundColor: "#b1efc1",
    textColor: "#333333",
    accentColor: "#4CAF50",
    fontFamily: "'Amatic SC', cursive",
    boxShadow: "0 4px 20px rgba(124, 212, 65, 0.5)",
    coupleQuoteShadow: "#7CD441",
  },
  blackYellow: {
    primaryColor: "#FFD700",
    secondaryColor: "#695800",
    backgroundColor: "#efe7b1",
    textColor: "#000000",
    accentColor: "#FFA500",
    fontFamily: "'Inter', sans-serif",
    boxShadow: "0 4px 20px rgba(255, 215, 0, 0.5)",
    coupleQuoteShadow: "#FFD700",
  },
  pinkPurple: {
    primaryColor: "#D81B60",
    secondaryColor: "#6A1B9A",
    backgroundColor: "#efb1ea",
    textColor: "#FFFFFF",
    accentColor: "#E91E63",
    fontFamily: "'Alef', sans-serif",
    boxShadow: "0 4px 20px rgba(216, 27, 96, 0.5)",
    coupleQuoteShadow: "#D81B60",
  },
};

// Define inline styles using a JavaScript object
const getStyles = (isHovered, windowWidth, theme) => {
  // Fallback to 'green' theme if the provided theme is undefined or invalid
  const themeColors = themeStyles[theme] || themeStyles.blackYellow;

  const buttonSize = windowWidth < 600 ? '50px' : '70px';
  const iconSize = windowWidth < 600 ? 10 : 12;
  const pauseBarWidth = windowWidth < 600 ? '4px' : '5px';
  const pauseBarHeight = windowWidth < 600 ? '20px' : '24px';

  return {
    container: {
      position: 'relative',
      width: '100%',
      height: windowWidth < 600 ? '150px' : '200px',
      background: themeColors.backgroundColor,
      borderRadius: '12px',
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: themeColors.boxShadow,
      transition: 'background 0.3s ease',
    },
    canvas: {
      width: '100%',
      height: '100%',
      display: 'block',
    },
    playPauseButton: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: buttonSize,
      height: buttonSize,
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      color: themeColors.accentColor,
      border: 'none',
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: windowWidth < 600 ? 1 : (isHovered ? 1 : 0), // Always visible on mobile
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      zIndex: 2,
    },
    playPauseButtonVisible: {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
    },
    playPauseButtonHidden: {
      transform: 'translate(-50%, -50%) scale(0.95)',
    },
    playIcon: {
      width: '0',
      height: '0',
      borderTop: `${iconSize}px solid transparent`,
      borderBottom: `${iconSize}px solid transparent`,
      borderLeft: `${iconSize * 2}px solid ${themeColors.accentColor}`,
      marginLeft: '5px',
    },
    pauseIcon: {
      display: 'flex',
      justifyContent: 'space-between',
      width: `${iconSize * 2 + 4}px`,
    },
    pauseBar: {
      width: `${pauseBarWidth}`,
      height: `${pauseBarHeight}`,
      backgroundColor: themeColors.accentColor,
      borderRadius: '2px',
    },
  };
};

const AudioPlayer = ({ src, theme = 'blackYellow', setFriendPlaying }) => {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const size = useWindowSize();
  const styles = getStyles(isHovered, size.width, theme);

  useEffect(() => {
    console.log('theme changed to:', theme);
  }, [theme]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    // Initialize AudioContext only once
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
    }

    // Resume AudioContext on user interaction if it's suspended
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    // Create MediaElementSource only once
    if (!sourceRef.current) {
      try {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audio);
      } catch (e) {
        console.error('AudioContext already connected to a MediaElementSourceNode:', e);
      }
    }

    // Create AnalyserNode only once
    if (!analyserRef.current) {
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 1024; // Reduced for better performance
      if (sourceRef.current) {
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }
    }

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasSize();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      const themeColors = themeStyles[theme] || themeStyles.blackYellow;

      if (isPlaying && !audioEnded) {
        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = themeColors.backgroundColor;
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = themeColors.accentColor;
        canvasCtx.beginPath();

        const sliceWidth = (canvas.width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvas.height) / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();

        // Draw progress bar
        const progress = audio.currentTime / audio.duration || 0;
        const progressWidth = canvas.width * progress;
        const progressBarHeight = size.width < 600 ? 15 : 20;
        //fill style with themeColors.primaryColor with opacity 0.5
        const progressBarColor = themeColors.primaryColor + '80';
        canvasCtx.fillStyle = progressBarColor;
        canvasCtx.fillRect(0, canvas.height / 2 - progressBarHeight / 2, progressWidth, progressBarHeight);
      } else {
        // Clear the canvas
        canvasCtx.fillStyle = themeColors.backgroundColor;
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw thin straight line
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = themeColors.accentColor;
        canvasCtx.beginPath();
        canvasCtx.moveTo(0, canvas.height / 2);
        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
      }
    };

    // Start the drawing loop
    draw();

    const handleEnded = () => {
      setIsPlaying(false);
      setAudioEnded(true);
      if (setFriendPlaying) setFriendPlaying(false); // Notify parent
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      cancelAnimationFrame(animationRef.current);
      audio.removeEventListener('ended', handleEnded);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying, audioEnded, src, size.width, theme, setFriendPlaying]); // Added setFriendPlaying as a dependency

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setAudioEnded(false);
          if (setFriendPlaying) setFriendPlaying(true); // Notify parent
        })
        .catch((error) => {
          console.error('Error playing audio:', error);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
      if (setFriendPlaying) setFriendPlaying(false); // Notify parent
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <audio ref={audioRef} src={src} preload="auto" />
      <canvas ref={canvasRef} style={styles.canvas}></canvas>
      <button
        onClick={togglePlayPause}
        style={{
          ...styles.playPauseButton,
          ...(isHovered ? styles.playPauseButtonVisible : styles.playPauseButtonHidden),
        }}
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        tabIndex="0"
      >
        {isPlaying ? (
          <div style={styles.pauseIcon}>
            <div style={styles.pauseBar}></div>
            <div style={styles.pauseBar}></div>
          </div>
        ) : (
          <div style={styles.playIcon}></div>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
