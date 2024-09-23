import React, { useState, useRef, useEffect } from "react";

const PushButtonGame = () => {
  const [pressCount, setPressCount] = useState(0);
  const [prompt, setPrompt] = useState("תלחצו על הכפתור");
  const [buttonStyle, setButtonStyle] = useState(getRandomPosition(true)); // Initialize button position above the prompt
  const [gameEnded, setGameEnded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // New state to control confetti visibility
  const [dimScreen, setDimScreen] = useState(false); // State to control screen dimming
  const videoRef = useRef(null); // Ref for the video
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the video is playing

  useEffect(() => {
    if (gameEnded) {
      // Show confetti when the game ends
      setShowConfetti(true);

      // Remove confetti after 15 seconds
      const confettiTimeout = setTimeout(() => {
        setShowConfetti(false);
      }, 15000);

      // Remove the dim effect after 10 seconds (optional, adjust as needed)
      const dimTimeout = setTimeout(() => {
        setDimScreen(false);
      }, 10000);

      // Clean up timeouts when component unmounts or game restarts
      return () => {
        clearTimeout(confettiTimeout);
        clearTimeout(dimTimeout);
      };
    }
  }, [gameEnded]);

  // Function to generate random positions within the viewport, adjusted for mobile
  function getRandomPosition(isInitial = false) {
    const padding = 50; // Padding from the screen edges
    const buttonWidth = 150; // Approximate width of the button
    const buttonHeight = 20; // Approximate height of the button

    // Calculate the max available width and height, accounting for button size
    const maxWidth = window.innerWidth - buttonWidth - padding;
    const maxHeight = window.innerHeight - buttonHeight - padding;

    const x = Math.max(Math.floor(Math.random() * maxWidth), padding);

    // If it's the initial position, place it above the prompt (adjust based on prompt's actual position)
    let y;
    if (isInitial) {
      y = Math.min(50, window.innerHeight / 4); // Ensure it's near the top
    } else {
      y = Math.max(Math.floor(Math.random() * maxHeight), padding);
    }

    // Ensure the button is not overlapping with the prompt (position is hypothetical, adjust as needed)
    if (x > 100 && x < 180 && y > 100 && y < 180) {
      return getRandomPosition();
    }

    return { left: `${x}px`, top: `${y}px` };
  }

  // Handle button click
  const handleClick = () => {
    const newPressCount = pressCount + 1;
    setPressCount(newPressCount);

    // Update prompt based on press count
    const prompts = [
      "נוווווווו",
      "מדוברררר",
      "רמאיייייייייי",
      "יאללה ביתררר",
      "דשקרן",
      "ששששלללוום",
      "דשקרןןן",
    ];
    setPrompt(prompts[newPressCount - 1] || "Great job!");

    // Update button position
    setButtonStyle(getRandomPosition());

    // Check if the game has ended
    if (newPressCount >= prompts.length) {
      setGameEnded(true);
    }
  };

  // Function to play video
  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    setIsPlaying(true);
  };

  // Generate confetti pieces when game ends and showConfetti is true
  const confettiPieces =
    gameEnded && showConfetti
      ? Array.from({ length: 100 }, (_, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={{ "--i": ((i % 10) + 1).toString() }}
          ></div>
        ))
      : null;

  return (
    <div className={`game-container ${dimScreen ? "dimmed" : ""}`}>
      {!gameEnded ? (
        <>
          <p className="prompt">{prompt}</p>
          <button
            className="game-button"
            style={buttonStyle}
            onClick={handleClick}
          >
            תלחצו
          </button>
        </>
      ) : (
        <div className="end-animation">
          <div className="confetti">{confettiPieces}</div>
          <div className="video-container">
            <video
              ref={videoRef}
              className="celebration-video"
              src="./video/CHICKEN.mp4"
              poster="./imgs/burger.png"
              playsInline
            />
            {!isPlaying && (
              <button className="play-button" onClick={handleVideoPlay}>
                נגן
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PushButtonGame;
