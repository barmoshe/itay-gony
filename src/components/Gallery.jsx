import React, { useState } from "react";
import "../App.css";

const Gallery = () => {
  const [currentAudio, setCurrentAudio] = useState(null); // Track the current playing audio
  const [isPlaying, setIsPlaying] = useState(false); // Track if the audio is playing
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image

  const images = [
    {
      src: "./imgs/img1.jpg",
      alt: "תמונה 1",
      theme: "green",
      audio: "./audio/MATOK.mp3",
    },
    {
      src: "./imgs/img2.jpg",
      alt: "תמונה 2",
      theme: "blackYellow",
      audio: "./audio/BEITAR.mp3",
    },
    {
      src: "./imgs/img3.jpg",
      alt: "תמונה 3",
      theme: "pinkPurple",
      audio: "./audio/the-spins.mp3",
    },
  ];

  function changeWebpageTheme(theme) {
    let primaryColor, secondaryColor, backgroundColor, textColor, fontFamily, boxShadow, coupleQuoteShadow;
  
    switch (theme) {
      case "green":
        primaryColor = "#7CD441";
        secondaryColor = "#5A9F30";
        backgroundColor = "#b1efc1";
        textColor = "#333333";
        fontFamily = "'Amatic SC', cursive";
        boxShadow = "0 4px 20px rgba(124, 212, 65, 0.5)";
        coupleQuoteShadow = "#7CD441"; // Green text shadow for the quote
        break;
      case "blackYellow":
        primaryColor = "#FFD700";
        secondaryColor = "#695800";
        backgroundColor = "#efe7b1";
        textColor = "#000000";
        fontFamily = "'Inter', sans-serif";
        boxShadow = "0 4px 20px rgba(255, 215, 0, 0.5)";
        coupleQuoteShadow = "#FFD700"; // Yellow text shadow for the quote
        break;
      case "pinkPurple":
        primaryColor = "#D81B60";
        secondaryColor = "#6A1B9A";
        backgroundColor = "#efb1ea";
        textColor = "#FFFFFF";
        fontFamily = "'Alef', sans-serif";
        boxShadow = "0 4px 20px rgba(216, 27, 96, 0.5)";
        coupleQuoteShadow = "#D81B60"; // Pink text shadow for the quote
        break;
      default:
        primaryColor = "#FFD700";
        secondaryColor = "#000000";
        backgroundColor = "#efb1ea";
        textColor = "#333333";
        fontFamily = "'Alef', sans-serif";
        boxShadow = "none";
        coupleQuoteShadow = "#FFD700"; // Default yellow text shadow for the quote
    }
  
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty("--secondary-color", secondaryColor);
    document.documentElement.style.setProperty("--background-color", backgroundColor);
    document.documentElement.style.setProperty("--text-color", textColor);
    document.documentElement.style.setProperty("--font-family", fontFamily);
    document.documentElement.style.setProperty("--box-shadow", boxShadow);
    document.documentElement.style.setProperty("--couple-quote-shadow", coupleQuoteShadow); // Set the text shadow color for the couple-quote
  }
  

  // Function to handle image click and play the corresponding audio
  const handleImageClick = (image, index) => {
    changeWebpageTheme(image.theme);
    setSelectedImage(index); // Set the selected image

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const newAudio = new Audio(image.audio);

    if (image.audio === "src/assets/audio/BEITAR.mp3") {
      newAudio.currentTime = 0;
    }

    newAudio.play();
    setIsPlaying(true);
    setCurrentAudio(newAudio);

    newAudio.addEventListener("ended", () => {
      setIsPlaying(false);
      setSelectedImage(null); // Deselect the image when the audio ends
    });
  };

  // Function to handle stop audio
  const handleStop = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
      setSelectedImage(null); // Deselect the image when the audio stops
    }
  };

  return (
    <>
      <h6 className="gallery-heading">תבחרו תמונת נושא</h6>
      <section id="gallery" aria-label="גלריית תמונות">
        {images.map((image, index) => (
          <div
            className={`gallery-item ${selectedImage === index ? "selected" : ""}`}
            key={index}
            tabIndex={0}
            onClick={() => handleImageClick(image, index)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleImageClick(image, index);
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

      {currentAudio && isPlaying && (
        <button className="play-pause-button" onClick={handleStop} aria-label="Stop audio">
          Stop
        </button>
      )}
    </>
  );
};

export default Gallery;
