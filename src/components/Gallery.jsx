import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const Gallery = ({ setTheme, friendPlaying }) => {
  const [currentAudio, setCurrentAudio] = useState(null); // Track the current playing audio
  const [isPlaying, setIsPlaying] = useState(false); // Track if the audio is playing
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image

  // Ref to store the current fade interval
  const fadeTimeoutRef = useRef(null);

  // Utility function to fade volume
  const fadeVolume = (audio, targetVolume, duration = 500) => {
    if (!audio) return Promise.resolve();

    return new Promise((resolve) => {
      const fadeSteps = 20;
      const fadeInterval = duration / fadeSteps;
      const volumeStep = (targetVolume - audio.volume) / fadeSteps;
      let currentStep = 0;

      const fade = setInterval(() => {
        if (currentStep < fadeSteps) {
          audio.volume = Math.min(Math.max(audio.volume + volumeStep, 0), 1);
          currentStep++;
        } else {
          clearInterval(fade);
          resolve();
        }
      }, fadeInterval);

      // Store the fade interval to clear if needed
      fadeTimeoutRef.current = fade;
    });
  };

  useEffect(() => {
    console.log("Friend playing: ", friendPlaying);

    // If there's an audio currently playing, adjust its volume based on friendPlaying
    if (currentAudio) {
      const targetVolume = friendPlaying ? 0.14 : 1.0; // 14% or 100%
      fadeVolume(currentAudio, targetVolume, 1000); // 0.5 seconds
    }

    // Cleanup function to clear any ongoing fade intervals
    return () => {
      if (fadeTimeoutRef.current) {
        clearInterval(fadeTimeoutRef.current);
      }
    };
  }, [friendPlaying, currentAudio]);

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
    let primaryColor,
      secondaryColor,
      backgroundColor,
      textColor,
      accentColor,
      fontFamily,
      boxShadow,
      coupleQuoteShadow;
    setTheme(theme); // Update the theme in the parent component
    switch (theme) {
      case "green":
        primaryColor = "#7CD441";
        secondaryColor = "#5A9F30";
        backgroundColor = "#b1efc1";
        textColor = "#333333";
        accentColor = "#4CAF50";
        fontFamily = "'Amatic SC', cursive";
        boxShadow = "0 4px 20px rgba(124, 212, 65, 0.5)";
        coupleQuoteShadow = "#7CD441"; // Green text shadow for the quote
        break;
      case "blackYellow":
        primaryColor = "#FFD700";
        secondaryColor = "#695800";
        backgroundColor = "#efe7b1";
        textColor = "#000000";
        accentColor = "#FFA500";
        fontFamily = "'Inter', sans-serif";
        boxShadow = "0 4px 20px rgba(255, 215, 0, 0.5)";
        coupleQuoteShadow = "#FFD700"; // Yellow text shadow for the quote
        break;
      case "pinkPurple":
        primaryColor = "#D81B60";
        secondaryColor = "#6A1B9A";
        backgroundColor = "#efb1ea";
        textColor = "#FFFFFF";
        accentColor = "#E91E63";
        fontFamily = "'Alef', sans-serif";
        boxShadow = "0 4px 20px rgba(216, 27, 96, 0.5)";
        coupleQuoteShadow = "#D81B60"; // Pink text shadow for the quote
        break;
      // Add other themes as needed
      default:
        primaryColor = "#FFD700";
        secondaryColor = "#000000";
        backgroundColor = "#efb1ea";
        textColor = "#333333";
        accentColor = "#e5c100";
        fontFamily = "'Alef', sans-serif";
        boxShadow = "none";
        coupleQuoteShadow = "#FFD700"; // Default yellow text shadow for the quote
    }

    document.documentElement.style.setProperty(
      "--primary-color",
      primaryColor
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      secondaryColor
    );
    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
    document.documentElement.style.setProperty("--text-color", textColor);
    document.documentElement.style.setProperty("--accent-color", accentColor);
    document.documentElement.style.setProperty("--font-family", fontFamily);
    document.documentElement.style.setProperty("--box-shadow", boxShadow);
    document.documentElement.style.setProperty(
      "--couple-quote-shadow",
      coupleQuoteShadow
    ); // Set the text shadow color for the couple-quote
  }

  // Function to handle image click and play the corresponding audio
  const handleImageClick = async (image, index) => {
    changeWebpageTheme(image.theme);
    setSelectedImage(index); // Set the selected image

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      // Optionally, fade out the current audio
      await fadeVolume(currentAudio, 0, 500);
      setIsPlaying(false);
      setSelectedImage(null);
    }

    const newAudio = new Audio(image.audio);

    if (image.audio === "src/assets/audio/BEITAR.mp3") {
      newAudio.currentTime = 0;
    }

    // Set initial volume based on friendPlaying
    newAudio.volume = friendPlaying ? 0.14 : 1.0;

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
      // Fade out before stopping
      fadeVolume(currentAudio, 0, 500).then(() => {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setIsPlaying(false);
        setSelectedImage(null); // Deselect the image when the audio stops
      });
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
