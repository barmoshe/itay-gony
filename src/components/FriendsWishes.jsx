import React, { useState, useRef, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import PushButtonGame from "./PushButtonGame";

const FriendsWishes = ({
  theme = "blackYellow",
  setFriendPlaying,
  isFriendPlaying,
}) => {
  // State to track the currently playing friend's ID
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);

  const wishes = [
    {
      id: 1,
      name: "אופיר",
      photo: "./imgs/OFIR.jpg",
      message:
        "לאיתי וגוני היקרים! שיהיה לכם המון מזל טוב לכבוד האירוסין! אני עדיין זוכר את הימים הראשונים שבהם סיפרת לי איתי שהכרת מישהי בתואר ושהפעם זה מרגיש לך אחר, מיוחד ואמיתי וכשדיברת על זה די התרגשת ממש והיה לך חיוך מרוח על הפנים. כאחד שמכיר אותך  15 שנה ועבר איתך לא מעט חוויות בחיים, אני יודע ואני בטוח שזה מה שתמיד חיפשת. זוגיות ואהבה שמבטאת קשר טוב וחזק שאפשר לקרוא לו בית. לא שמוריד חלילה מהחשיבות של דברים אחרים כמו עבודה, כסף, תחביבים וכאלה אבל זוגיות אצלך זה אחרת - תמיד היית בנאדם משפחתי, בנאדם שזוגיות זה חלק גדול ממה שאתה מבטא וחלק גדול מהמהות שלך כבנאדם, ואין שום ספק שהזוגיות המדהימה שיש ביניכם זה בדיוק מה שרצית ומה שחיפשת כל חייך, ושגוני היא האישה המושלמת עבורך. מההתחלה היה נראה שהזוגיות ביניכם מאוד טובה והיה ביניכם קליק כזה והיה די ברור שזה ילך ויתקדם למשהו רציני ומיוחד מאוד. אתם משלימים אחד את השניה ונראה שיש לכם גם מטרות משותפות לא רק לעתיד הקרוב, אלא גם לעתיד הרחוק ביחד. גוני, מההתחלה השתלבת כאחת מהחבר'ה, תמיד נעים ונחמד לשבת ולדבר איתך ואת אחלה ידידה שבעולם. כייף לדעת שמישהי מדהימה כמוך תהיה אשתו של איתי. כייף לדעת שעכשיו נמשיך להגיע אליכם הביתה נגיע לבית של הזוג הנשוי הראשון בחבורה ומי יתן שהזוגיות שלכם תהווה דוגמה לכל שאר הפושפשים. מאחל לכם שנים רבות של אהבה ושל אושר, שתמשיך להיות לכם אחלה זוגיות שבעולם, שתמשיכו להכיר אחת את השניה גם עכשיו ולאורך שנים ארוכות, שתמשיכו לאהוב אחת את השניה ושיהיו לכם ילדים חמודים ויפים כמוכם. (מתנדב לעשות בייביסטר מתי שתצטרכו 😉).",
      quote:
        "שתהיה לכם החתונה הכי מושלמת בעולם כמו שמגיע לכם אוהב אתכם מאוד אופיר  ❤️❤️❤️", // No video for אופיר
    },
    {
      id: 2,
      name: "אפיק",
      photo: "./imgs/AFIK.jpg",
      // No text message for אפיק
      quote: "״המשטרה לא תעזור הלב שלי תמיד יהיה צהוב שחור״",
      message:
        "אהובים שלי המון מזל טוב לרגל האירוסים דרך חדשה נפתחת בפניכם מתרגש ומאחל לכם המון אושר שמחה ואהבה אינסופית בדרך המשותפת שלכם. שתמשיכו לבנות יחד קשר חזק, מלא בהבנה, תמיכה וחברות אמיתית. אוהב מכל הלב💛",
      // No text for אפיק
    },
    {
      id: 3,
      name: "שקד",
      photo: "./imgs/SHAKED.jpg",
      video: "./video/SHAKED.mov",
      poster: "./imgs/SHAKED2.jpg",
      // No audio or video for שקד
    },
    {
      id: 4,
      name: "שלומי",
      photo: "./imgs/SHLOMI.jpg",
      // No text message for שלומי
      video: "./video/SHLOMI.mov",
      // No audio for שלומי
    },
    {
      id: 5,
      name: "פסו",
      photo: "./imgs/PESSO.jpg",
      message:
        "דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא  דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא",
      quote: "״גם בתקופות הכי קשות אצעק את שמכם ברחובות״",
      // No audio or video for פסו
    },
    {
      id: 6,
      name: "נהוראי",
      photo: "./imgs/NEORAY.jpg",
      message: "״טקסט לדוגמא״",
      quote: "״טקסט לדוגמא״",
    },
    {
      id: 7,
      name: "ברררררררר",
      photo: "./imgs/BAR.png",
      // No text message for בר
      quote: "״אוהב מכל הלב, אוהב אותכם עד שזה כואב״",
      audio: "./audio/BAR.mp3",
      // No video for בר
    },
  ];

  return (
    <div id="friends-wishes" className="friends-wishes-container">
      <h2>ברכות מהחברים</h2>
      {wishes.map((friend, index) => (
        <FriendMessage
          key={friend.id}
          friend={friend}
          index={index}
          theme={theme}
          currentlyPlayingId={currentlyPlayingId} // Pass down the currently playing ID
          setCurrentlyPlayingId={setCurrentlyPlayingId} // Pass down the setter function
          setFriendPlaying={setFriendPlaying}
          isFriendPlaying={isFriendPlaying}
        />
      ))}
    </div>
  );
};

const FriendMessage = ({
  friend,
  index,
  theme,
  currentlyPlayingId,
  setCurrentlyPlayingId,
  setFriendPlaying,
  isFriendPlaying,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const isEven = index % 2 === 0;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  // Determine if this friend's audio is currently playing
  const isPlaying = currentlyPlayingId === friend.id;

  // Handlers to set or pause the currently playing audio
  const handlePlay = () => {
    setCurrentlyPlayingId(friend.id);
    setFriendPlaying(true);
  };

  const handlePause = () => {
    setCurrentlyPlayingId(null);
    setFriendPlaying(false);
  };

  return (
    <div className={`friend-message ${isEven ? "even" : "odd"}`}>
      <div className={`message-bubble ${isExpanded ? "expanded" : ""}`}>
        <div className="friend-name" onClick={toggleExpand}>
          {friend.name}
        </div>
        {(isExpanded || window.innerWidth > 768) && (
          <>
            {friend.message && (
              <div className="message-content">{friend.message}</div>
            )}
            {friend.audio && (
              <AudioPlayer
                src={friend.audio}
                theme={theme}
                isPlaying={isPlaying} // Pass down if this audio should be playing
                setCurrentlyPlayingId={handlePlay} // Function to set this as playing
                onPause={handlePause} // Function to pause
                id={friend.id} // Pass down the friend's ID
                setFriendPlaying={setFriendPlaying}
                isFriendPlaying={isFriendPlaying}
              />
            )}
            {friend.video && (
              <CustomVideoPlayer
                src={friend.video}
                theme={theme}
                poster={friend.poster}
              />
            )}
            <p className="friend-quote">{friend.quote}</p>
          </>
        )}
      </div>
      <div className="friend-avatar">
        <img src={friend.photo} alt={friend.name} onClick={toggleExpand} />
      </div>
    </div>
  );
};

const CustomVideoPlayer = ({
  src,
  poster,
  theme,
  setFriendPlaying,
  isFriendPlaying,
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null); // Ref for the container
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [circleRadius, setCircleRadius] = useState(125); // Initial radius

  // Function to update circle radius based on container size
  const updateCircleRadius = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newRadius = containerWidth * 0.45; // 45% of container width
      setCircleRadius(newRadius);
    }
  };

  // Set initial radius and add ResizeObserver for container
  useEffect(() => {
    updateCircleRadius(); // Set initial radius

    const resizeObserver = new ResizeObserver(() => {
      updateCircleRadius();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  // Toggle Play/Pause
  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    // The state will be updated in the event handlers
  };

  // Update play state when video plays
  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    if (setFriendPlaying) setFriendPlaying(true);
  };

  // Update play state when video pauses
  const handleVideoPause = () => {
    setIsVideoPlaying(false);
    if (setFriendPlaying) setFriendPlaying(false);
  };

  // Update progress as video plays
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const currentProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  // Reset progress when video ends
  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    setProgress(100);
    if (setFriendPlaying) setFriendPlaying(false);
  };

  // Pause video if another media is playing
  useEffect(() => {
    if (isFriendPlaying && isVideoPlaying) {
      // Another media started playing, pause this video
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFriendPlaying]);

  return (
    <div
      className={`custom-video-player ${isVideoPlaying ? "playing" : "paused"}`}
      onClick={togglePlayPause}
      aria-label="Video Player"
      ref={containerRef} // Assign ref to container
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        onClick={(e) => e.stopPropagation()} // Prevent click bubbling to container
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        className="video-element"
        poster={poster}
        playsInline // Prevent fullscreen on iOS
        webkit-playsinline="true" // Additional attribute for older iOS versions
      />

      {/* Black Overlay */}
      <div
        className={`video-overlay ${isVideoPlaying ? "fade-out" : "visible"}`}
      ></div>

      {/* SVG Circular Progress Bar */}
      <svg
        className="progress-ring"
        viewBox={`0 0 ${circleRadius * 2 + 10} ${circleRadius * 2 + 10}`}
      >
        <defs>
          <linearGradient id="gradient-progress" x1="1" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={
                theme === "green"
                  ? "#7CD441" // Lighter green
                  : theme === "pinkPurple"
                  ? "purple" // Purple for pinkPurple theme
                  : "#FFD700" // Default to blackYellow's primary color
              }
            />
            <stop
              offset="100%"
              stopColor={
                theme === "green"
                  ? "#5A9F30" // Darker green
                  : theme === "pinkPurple"
                  ? "pink" // Pink for pinkPurple theme
                  : "#FFA500" // Default to blackYellow's secondary color
              }
            />
          </linearGradient>
        </defs>

        <circle
          className="progress-ring__circle"
          stroke="url(#gradient-progress)"
          strokeWidth="6"
          fill="transparent"
          r={circleRadius}
          cx={circleRadius + 5} // Centered with padding
          cy={circleRadius + 5}
          style={{
            strokeDasharray: `${2 * Math.PI * circleRadius}`,
            strokeDashoffset: `${
              2 * Math.PI * circleRadius * (1 - progress / 100)
            }`,
            transition: "stroke-dashoffset 0.5s linear",
          }}
        />
      </svg>

      {/* Play/Pause Button */}
      <button
        className={`play-pause-button-video ${
          isVideoPlaying ? "fade-out-button" : "fade-in-button"
        }`}
        onClick={(e) => {
          e.stopPropagation(); // Prevent click from bubbling to container
          togglePlayPause();
        }}
        aria-label={isVideoPlaying ? "Pause Video" : "Play Video"}
      >
        {isVideoPlaying ? (
          // Pause Icon (Elegant Two Bars)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <rect x="4" y="3" width="3" height="10" rx="1" ry="1"></rect>
            <rect x="9" y="3" width="3" height="10" rx="1" ry="1"></rect>
          </svg>
        ) : (
          // Play Icon (Elegant Triangle)
          <span>הפעל</span>
        )}
      </button>
    </div>
  );
};

export default FriendsWishes;
