import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header';
import fielddressImage from './images/fielddress.jpg';
import gypImage from './images/gyp.jpg';
import inna from './images/inna.jpg';
import innaback from './images/innabackground.jpeg'
import { setCurrentImageIndex } from './actions/currentAction';
import './App.css';

// Array of images
const images = [
  fielddressImage,
  gypImage,
  // Add other images here
];

function App() {
  const [autoplayInterval, setAutoplayInterval] = useState(null);
  const currentImageIndex = useSelector(state => state.current.currentImageIndex);
  const dispatch = useDispatch();

  const handlePreviousImage = () => {
    const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    dispatch(setCurrentImageIndex(newIndex));
  };

  const handleNextImage = () => {
    const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    dispatch(setCurrentImageIndex(newIndex));
  };

  useEffect(() => {
    // Start autoplay when component mounts
    const interval = setInterval(() => {
      const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
      dispatch(setCurrentImageIndex(newIndex));
    }, 5000); // Change the interval as needed (e.g., 5000 milliseconds for 5 seconds)

    setAutoplayInterval(interval);

    // Clean up the interval when component unmounts
    return () => {
      clearInterval(autoplayInterval);
    };
  }, [currentImageIndex, dispatch]);

  const handlePauseAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  const handleResumeAutoplay = () => {
    const interval = setInterval(() => {
      const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
      dispatch(setCurrentImageIndex(newIndex));
    }, 5000); // Change the interval as needed
    setAutoplayInterval(interval);
  };

  return (
    <>
      <Header />
      <div className="carousel-container" onMouseEnter={handlePauseAutoplay} onMouseLeave={handleResumeAutoplay}>
        <div className="carousel">
          <button className="prev" onClick={handlePreviousImage}>&#10094;</button>
          <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
          <button className="next" onClick={handleNextImage}>&#10095;</button>
        </div>
      </div>


      <div className='center-container'>
        <div className="me">
          <img src={inna} alt="inna" />
        </div>
        <div className="description-box">
          <p>Specializing in: Hair, Makeup, Massages, nails, and wedding prep. Fill out the form below to make an appointment or contact me via email!</p>
        </div>
      </div>

    </>
  );
}

export default App;
