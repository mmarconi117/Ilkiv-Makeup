import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header';
import fielddressImage from './images/fielddress.jpg';
import gypImage from './images/gyp.jpg';
import inna from './images/inna.jpg'
import { setCurrentImageIndex } from './actions/currentAction';
import './App.css';

// Array of images
const images = [
  fielddressImage,
  gypImage,
  // Add other images here
];

function App() {
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

  return (
    <>
      <Header />
      <div className='carousel'>
        <button className='prev' onClick={handlePreviousImage}>&#10094;</button>
        <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
        <button className='next' onClick={handleNextImage}>&#10095;</button>
      </div>
      <div className='me'>
        <img src={inna} alt='inna' />
      </div>
    </>
  );
}

export default App;
