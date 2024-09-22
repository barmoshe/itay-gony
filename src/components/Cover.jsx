import React, { useEffect } from "react";
import "../App.css";

const Cover = ({ onScrollDown }) => {
  useEffect(() => {
    const heartsContainer = document.querySelector(".hearts-container");

    if (!heartsContainer) return;

    const heartEmojis = ["🖤", "💛"];

    function createHeart() {
      const heart = document.createElement("span");
      heart.classList.add("heart");

      const randomHeart =
        heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heart.textContent = randomHeart;

      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.bottom = `-50px`;

      const size = Math.random() * 2.5 + 1;
      heart.style.fontSize = `${size}rem`;

      const duration = Math.random() * 3 + 4;
      heart.style.animationDuration = `${duration}s`;

      heart.style.opacity = `${Math.random() * 0.7 + 0.2}`;

      heartsContainer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, duration * 1000);
    }

    const intervalId = setInterval(createHeart, 200);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="cover">
      <h1>איתי וגוני האהובים 💛🖤</h1>
      <p className="congrats-message">מזל טוב לאירוסין 🎉</p>{" "}
      {/* Positioned below the header */}
      <img src="./imgs/cover.PNG" alt="תמונת שער" />
      <div
        id="scroll-indicator"
        tabIndex={0}
        aria-label="גלול למטה"
        onClick={onScrollDown}
        role="button"
        onKeyPress={(e) => {
          if (e.key === "Enter") onScrollDown();
        }}
      >
        ⬇
      </div>
      <div className="hearts-container"></div>{" "}
      {/* Container for animated heart emojis */}
    </section>
  );
};

export default Cover;
