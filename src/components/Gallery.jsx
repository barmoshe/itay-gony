import React, { useState, useRef } from "react";
import "../App.css";

const Gallery = () => {
  const [currentAudio, setCurrentAudio] = useState(null); // Track the current playing audio
  const [isPlaying, setIsPlaying] = useState(false); // Track if the audio is playing

  const images = [
    {
      src: "src/assets/imgs/img1.jpg",
      alt: "תמונה 1",
      theme: "green",
      audio: "src/assets/audio/MATOK.mp3", // Audio file associated with the first image
    },
    {
      src: "src/assets/imgs/img2.jpg",
      alt: "תמונה 2",
      theme: "blackYellow",
      audio: "src/assets/audio/BEITAR.mp3", // Audio file associated with the second image
    },
    {
      src: "src/assets/imgs/img3.jpg",
      alt: "תמונה 3",
      theme: "pinkPurple",
      audio: "src/assets/audio/the-spins.mp3", // Audio file associated with the third image
    },
  ];

  // Function to change the webpage theme based on the selected theme
  function changeWebpageTheme(theme) {
    let primaryColor, secondaryColor, backgroundImage, fontFamily, boxShadow;

    switch (theme) {
      case "green":
        primaryColor = "#4CAF50"; // Elegant green
        secondaryColor = "#2E7D32"; // Darker green for accents
        backgroundImage = "linear-gradient(135deg, #4CAF50, #A5D6A7)"; // Soft green gradient
        fontFamily = "'Amatic SC', cursive"; // Soft handwritten style for elegance
        boxShadow = "0 4px 20px rgba(76, 175, 80, 0.5)"; // Soft green shadow
        break;
      case "blackYellow":
        primaryColor = "#FFD700"; // Luxurious gold
        secondaryColor = "#333333"; // Deep black
        backgroundImage = "linear-gradient(135deg, #FFD700, #FFEB3B)"; // Gold gradient
        fontFamily = "'Inter', sans-serif"; // Clean sans-serif for a modern look
        boxShadow = "0 4px 20px rgba(255, 215, 0, 0.5)"; // Golden shadow
        break;
      case "pinkPurple":
        primaryColor = "#D81B60"; // Vibrant pink
        secondaryColor = "#6A1B9A"; // Deep purple
        backgroundImage = "linear-gradient(135deg, #D81B60, #8E24AA)"; // Pink to purple gradient
        fontFamily = "'Alef', sans-serif"; // Balanced and elegant sans-serif
        boxShadow = "0 4px 20px rgba(216, 27, 96, 0.5)"; // Pink shadow
        break;
      default:
        primaryColor = "#FFD700"; // Default yellow
        secondaryColor = "#000000"; // Default black
        backgroundImage = "none";
        fontFamily = "'Alef', sans-serif";
        boxShadow = "none";
    }

    // Apply CSS changes dynamically
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty("--secondary-color", secondaryColor);
    document.documentElement.style.setProperty("--background-image", backgroundImage);
    document.documentElement.style.setProperty("--font-family", fontFamily);
    document.documentElement.style.setProperty("--box-shadow", boxShadow);
  }

  // Function to handle image click and play the corresponding audio
  const handleImageClick = (image) => {
    changeWebpageTheme(image.theme);

    // Stop the currently playing audio, if any
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0; // Reset audio to the start
    }

    // Create a new audio instance and play it
    const newAudio = new Audio(image.audio);
    
    // If audio is SHISH, start from 0:05
    if (image.audio === "src/assets/audio/BEITAR.mp3") {
      newAudio.currentTime = 100;   
    }

    newAudio.play();
    setIsPlaying(true); // Set playing state
    setCurrentAudio(newAudio); // Set the new audio as the current one

    newAudio.addEventListener("ended", () => {
      setIsPlaying(false); // Reset state when audio ends
    });
  };

  // Function to handle stop audio
  const handleStop = () => {
    if (currentAudio) {
      currentAudio.pause(); // Stop the audio
      currentAudio.currentTime = 0; // Reset to the start
      setIsPlaying(false); // Set playing state to false
    }
  };

  return (
    <>
      <h6 className="gallery-heading">תבחרו תמונת נושא</h6>
      <section id="gallery" aria-label="גלריית תמונות">
        {images.map((image, index) => (
          <div
            className="gallery-item"
            key={index}
            tabIndex={0}
            onClick={() => handleImageClick(image)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleImageClick(image);
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              data-full={image.src}
              loading="lazy"
            />
          </div>
        ))}
      </section>

      {/* Stop Button - Only visible when audio is playing */}
      {(currentAudio && isPlaying)&&(
        <button
          className="play-pause-button"
          onClick={handleStop}
          aria-label="Stop audio"
        >
          Stop
        </button>
      )}
    </>
  );
};

export default Gallery;
