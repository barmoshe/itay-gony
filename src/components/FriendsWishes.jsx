
import React from 'react';
import VideoNotePlayer from './VideoNotePlayer';
import { useState } from 'react';

const FriendsWishes = () => {
  const wishes = [
    {
      id: 1,
      name: 'אופיר',
      photo: '/imgs/opir.jpg',
      message: 'מאחל לכם חיים מלאים באהבה, אושר ובריאות. מי ייתן וכל יום יהיה לכם מתנה.',
      quote: '"האושר שבאהבה אינו נמדד בכמות החיוכים אלא ברגעי השקט והכנות שאנו חולקים." - לא ידוע',
      audio: '/audio/opir.mp3',
      // No video for אופיר
    },
    {
      id: 2,
      name: 'אפיק',
      photo: '/imgs/apik.jpg',
      // No text message for אפיק
      quote: '"האושר שבאהבה אינו נמדד בכמות החיוכים אלא ברגעי השקט והכנות שאנו חולקים." - לא ידוע',
      video: './video/video1.mp4',
      // No text for אפיק
    },
    {
      id: 3,
      name: 'שקד',
      photo: './imgs/SHAKED.jpg',
      message: 'שתזכו לבנות בית מלא באהבה והבנה. כל טוב ואושר לכם בדרך החדשה.',
      quote: '"האושר שבאהבה אינו נמדד בכמות החיוכים אלא ברגעי השקט והכנות שאנו חולקים." - לא ידוע',
      // No audio or video for שקד
    },
    {
      id: 4,
      name: 'בר',
      photo: './imgs/BAR.png',
      // No text message for בר
      quote: '"האושר שבאהבה אינו נמדד בכמות החיוכים אלא ברגעי השקט והכנות שאנו חולקים." - לא ידוע',
      audio: '/audio/bar.mp3',
      // No video for בר
    },
    {
      id: 5,
      name: 'פסו',
      photo: './imgs/PESSO.jpg',
      message: 'מאחל לכם מסע משותף מלא בהצלחות וברגעים שמחים.',
      quote: '"האושר שבאהבה אינו נמדד בכמות החיוכים אלא ברגעי השקט והכנות שאנו חולקים." - לא ידוע',
      // No audio or video for פסו
    },
    {
      id: 6,
      name: 'שלומי',
      photo: './imgs/shalomi.jpg',
      // No text message for שלומי
      quote: '"האושר שבאהבה אינו נמדד בכמות החיוכים אלא ברגעי השקט והכנות שאנו חולקים." - לא ידוע',
      video: '/videos/shalomi.mp4',
      // No audio for שלומי
    },
  ];
  
  return (
    <div id="friends-wishes" className="friends-wishes-container">
      <h2>ברכות מהחברים</h2>
      {wishes.map((friend, index) => (
        <FriendMessage key={friend.id} friend={friend} index={index} />
      ))}
    </div>
  );
};

const FriendMessage = ({ friend, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`friend-message ${isEven ? 'even' : 'odd'}`}>
      <div className="friend-avatar">
        <img src={friend.photo} alt={friend.name} onClick={toggleExpand} />
      </div>
      <div className={`message-bubble ${isExpanded ? 'expanded' : ''}`}>
        <div className="friend-name" onClick={toggleExpand}>{friend.name}</div>
        {(isExpanded || window.innerWidth > 768) && (
          <>
            {friend.message && <div className="message-content">{friend.message}</div>}
            {friend.audio && <audio controls src={friend.audio} />}
            {friend.video && (
              <VideoNotePlayer
                videoSrc={friend.video}
                thumbnail={`/imgs/${friend.name.toLowerCase()}.jpg`}
              />
            )}
            <p className="friend-quote">{friend.quote}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsWishes;