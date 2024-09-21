import React, { useState } from "react";
import VideoNotePlayer from "./VideoNotePlayer";
import AudioPlayer from "./AudioPlayer";

const FriendsWishes = ({ theme = "blackYellow" , setFriendPlaying, isFriendPlaying }) => {
  // State to track the currently playing friend's ID
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);

  const wishes = [
    {
      id: 1,
      name: "אופיר",
      photo: "./imgs/OFIR.jpg",
      quote: "״תודה רברררר״",
      audio: "./audio/BEITAR.mp3",
      // No video for אופיר
    },
    {
      id: 2,
      name: "אפיק",
      photo: "./imgs/AFIK.jpg",
      // No text message for אפיק
      quote: "״המשטרה לא תעזור הלב שלי תמיד יהיה צהוב שחור״",
      video: "./video/video1.mp4",
      // No text for אפיק
    },
    {
      id: 3,
      name: "שקד",
      photo: "./imgs/SHAKED.jpg",
      message:
        "דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא  דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא דוגמא",
      quote: "״הוא פשוט קם הלך״ #אפיק",
      // No audio or video for שקד
    },
    {
      id: 4,
      name: "שלומי",
      photo: "./imgs/SHLOMI.jpg",
      // No text message for שלומי
      quote: "״טקסט לדוגמא טקסט לדוגמא טקסט לדוגמא טקסט לדוגמא טקסט לדוגמא״",
      video: "./videos/video1.mp4",
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
      name: "ברררררררר",
      photo: "./imgs/BAR.png",
      // No text message for בר
      quote: "״אוהב מכל הלב, אוהב אותכם עד שזה כואב״",
      audio: "./audio/the-spins.mp3",
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
      <div className="all-friends">
        <h4>ברכה כללית מכל החברים</h4>
        <p className="all-friends-message">
          כל החברים מאחלים לכם כל טוב בעולם ובעתיד, ומקווים שתמצאו את האושר
          האמיתי ביחד!
        </p>
        <img src="./imgs/ALL.jpg" alt="ברכה כללית מכל החברים" />
      </div>
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

  // Handler to set this friend as the currently playing one
  const handlePlay = () => {
    setCurrentlyPlayingId(friend.id);
  };

  // Handler to pause the currently playing audio
  const handlePause = () => {
    setCurrentlyPlayingId(null);
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
              <video
                controls
                src={friend.video}
                onClick={toggleExpand}
                style={{
                  width: "25%",
                  borderRadius: "50%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                }}
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

export default FriendsWishes;
