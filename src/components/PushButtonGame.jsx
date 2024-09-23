import React, { useState, useRef, useEffect } from "react";

const PushButtonGame = () => {
  const [pressCount, setPressCount] = useState(0);
  const [prompt, setPrompt] = useState("תלחצו על הכפתור");
  const [buttonStyle, setButtonStyle] = useState(getRandomPosition());
  const [gameEnded, setGameEnded] = useState(false);
  const [dimScreen, setDimScreen] = useState(false); // State to control screen dimming
  const videoRef = useRef(null); // Ref for the video
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the video is playing

  useEffect(() => {
    // Remove the dim effect after 10 seconds
    if (gameEnded) {
      setTimeout(() => {
        setDimScreen(false);
      }, 10000);
    }
  }, [gameEnded]);

  // Function to generate random positions within the viewport, adjusted for mobile
  function getRandomPosition() {
    const padding = 50; // Padding from the screen edges
    const buttonWidth = 150; // Approximate width of the button
    const buttonHeight = 20; // Approximate height of the button

    // Calculate the max available width and height, accounting for button size
    const maxWidth = window.innerWidth - buttonWidth - padding;
    const maxHeight = window.innerHeight - buttonHeight - padding;

    const x = Math.max(Math.floor(Math.random() * maxWidth), padding);
    const y = Math.max(Math.floor(Math.random() * maxHeight), padding);
    //make sure its not on the prompt
    if (x > 100 && x < 180 && y > 100 && y < 180  ) {
      return getRandomPosition();
    }

    return { left: `${x}px`, top: `${y}px` };
  }

  // Handle button click
  const handleClick = () => {
    const newPressCount = pressCount + 1;
    setPressCount(newPressCount);

    // Update prompt based on press count
    const prompts = ["נוווווווו", "מדוברררר", "רמאיייייייייי", "דשקרן"];
    setPrompt(prompts[newPressCount - 1] || "Great job!");

    // Update button position
    setButtonStyle(getRandomPosition());

    // Check if the game has ended
    if (newPressCount >= 4) {
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
          <div className="confetti"></div>
          <div className="video-container">
            <video
              ref={videoRef}
              className="celebration-video"
              src="./video/CHICKEN.mp4"
              poster="./imgs/burger.png"
              playsInline
              
            />{!isPlaying &&
            <button className="play-button" onClick={handleVideoPlay}>
              נגן
            </button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default PushButtonGame;
