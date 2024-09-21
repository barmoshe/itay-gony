import React, { useState, useEffect } from 'react';
import Cover from './components/Cover';
import Gallery from './components/Gallery';
import FriendsWishes from './components/FriendsWishes';
import './App.css';

function App() {
  const [theme, setTheme] = useState('default'); // Add a state for the theme
  const [isFriendPlaying, setIsFriendPlaying] = useState(false); // Track if a friend audio is playing

  useEffect(() => {
    console.log('11Friend playing: ', isFriendPlaying);
  }, [isFriendPlaying]);

  const handleScrollDown = () => {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      const yOffset = -100;
      const y = gallerySection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <Cover onScrollDown={handleScrollDown} />
      {/* Pass the setTheme function to the Gallery to update the theme */}
      <Gallery setTheme={setTheme} friendPlaying={isFriendPlaying} />
      <br/><br/>
      <br/><hr /><br/><br/>
      <FriendsWishes 
        theme={theme} 
        setFriendPlaying={setIsFriendPlaying} 
        isFriendPlaying={isFriendPlaying} 
      />
      <br/><br/>
      <div className="temp" />
    </div>
  );
}

export default App;
