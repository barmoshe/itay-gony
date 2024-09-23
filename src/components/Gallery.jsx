import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const Gallery = ({ setTheme, friendPlaying }) => {
  const [currentAudio, setCurrentAudio] = useState(null); // Track the current playing audio
  const [isPlaying, setIsPlaying] = useState(false); // Track if the audio is playing
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image
  const [isMobile, setIsMobile] = useState(false); // Track if the device is mobile
  const [currentAudioTime, setCurrentAudioTime] = useState(0); // Track the current audio time

  const fadeTimeoutRef = useRef(null);

  // Detect if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this threshold as needed
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Synchronize the time and switch between regular audio smoothly
  const switchAudioSource = async (currentTime, newAudioSrc) => {
    if (currentAudio) {
      currentAudio.pause();
    }

    const newAudio = new Audio(newAudioSrc);
    newAudio.currentTime = currentTime;
    setCurrentAudio(newAudio);

    newAudio.play();
    setIsPlaying(true);

    newAudio.addEventListener("timeupdate", () => {
      setCurrentAudioTime(newAudio.currentTime);
    });

    newAudio.addEventListener("ended", () => {
      setIsPlaying(false);
      setSelectedImage(null);
    });
  };

  const handleImageClick = async (image, index) => {
    changeWebpageTheme(image.theme);
    setSelectedImage(index);

    // Only use the regular audio source
    const audioToPlay = image.audio.regular;

    await switchAudioSource(currentAudioTime, audioToPlay);
  };

  const handleStop = () => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
      setSelectedImage(null);
    }
  };

  const images = [
    {
      src: "./imgs/img1.jpg",
      alt: "תמונה 1",
      theme: "green",
      audio: {
        regular: "./audio/MATOK_LOW.mp3",
      },
    },
    {
      src: "./imgs/img2.jpg",
      alt: "תמונה 2",
      theme: "blackYellow",
      audio: {
        regular: "./audio/BEITAR_LOW.mp3",
      },
    },
    {
      src: "./imgs/img3.jpg",
      alt: "תמונה 3",
      theme: "pinkPurple",
      audio: {
        regular: "./audio/the-spins_LOW.mp3",
      },
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
    setTheme(theme);
    switch (theme) {
      case "green":
        primaryColor = "#7CD441";
        secondaryColor = "#5A9F30";
        backgroundColor = "#b1efc1";
        textColor = "#333333";
        accentColor = "#4CAF50";
        fontFamily = "'Amatic SC', cursive";
        boxShadow = "0 4px 20px rgba(124, 212, 65, 0.5)";
        coupleQuoteShadow = "#7CD441";
        break;
      case "blackYellow":
        primaryColor = "#FFD700";
        secondaryColor = "#695800";
        backgroundColor = "#efe7b1";
        textColor = "#000000";
        accentColor = "#FFA500";
        fontFamily = "'Inter', sans-serif";
        boxShadow = "0 4px 20px rgba(255, 215, 0, 0.5)";
        coupleQuoteShadow = "#FFD700";
        break;
      case "pinkPurple":
        primaryColor = "#D81B60";
        secondaryColor = "#6A1B9A";
        backgroundColor = "#efb1ea";
        textColor = "#9684ab";
        accentColor = "#E91E63";
        fontFamily = "'Alef', sans-serif";
        boxShadow = "0 4px 20px rgba(216, 27, 96, 0.5)";
        coupleQuoteShadow = "#D81B60";
        break;
      default:
        primaryColor = "#FFD700";
        secondaryColor = "#000000";
        backgroundColor = "#efb1ea";
        textColor = "#333333";
        accentColor = "#e5c100";
        fontFamily = "'Alef', sans-serif";
        boxShadow = "none";
        coupleQuoteShadow = "#FFD700";
    }

    document.documentElement.style.setProperty("--primary-color", primaryColor);
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
    );
  }

  return (
    <>
      <h6 className="gallery-heading">תבחרו תמונת נושא</h6>
      <section id="gallery" aria-label="גלריית תמונות">
        {images.map((image, index) => (
          <div
            className={`gallery-item ${
              selectedImage === index ? "selected" : ""
            }`}
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
          עצור מוזיקה
        </button>
      )}
    </>
  );
};

export default Gallery;
