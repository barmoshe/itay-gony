import React from 'react';
import Cover from './components/Cover';
import Gallery from './components/Gallery';
import FriendsWishes from './components/FriendsWishes';
import './App.css';

function App() {
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
      <Gallery />
      <br/><br/>
      <br/><hr /><br/><br/>
      <FriendsWishes />
    </div>
  );
}

export default App;
