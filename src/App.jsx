import React from 'react';
import Cover from './components/Cover';
import Gallery from './components/Gallery';
import CoupleSection from './components/CoupleSection'; // Import the new section
import './App.css';

function App() {
  const handleScrollDown = () => {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <Cover onScrollDown={handleScrollDown} />
      <Gallery />
      <CoupleSection /> {/* Add the new section here */}
    </div>
  );
}

export default App;
