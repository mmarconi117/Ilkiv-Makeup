import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header';
import fielddressImage from './images/fielddress.jpg';
import gypImage from './images/gyp.jpg';
import { setCurrentImageIndex } from './actions/currentAction';
import './App.css';

function App() {
  const currentImageIndex = useSelector(state => state.current.currentImageIndex);
  const dispatch = useDispatch();

  const handlePreviousImage = () => {
    const newIndex = currentImageIndex === 0 ? 1 : 0; // If currentImageIndex is 0, set newIndex to 1, otherwise set it to 0
    dispatch(setCurrentImageIndex(newIndex));
  };

  const handleNextImage = () => {
    const newIndex = currentImageIndex === 1 ? 0 : 1; // If currentImageIndex is 1, set newIndex to 0, otherwise set it to 1
    dispatch(setCurrentImageIndex(newIndex));
  };

  return (
    <>
      <Header />
      <div className='carousel'>
        {/* Previous button */}
        <button className='prev' onClick={handlePreviousImage}>&#10094;</button>
        {/* Display the images and handle click events */}
        <img src={currentImageIndex === 0 ? fielddressImage : gypImage} alt={currentImageIndex === 0 ? "Field Dress" : "Gyp"} onClick={() => handleImageClick(currentImageIndex === 0 ? 0 : 1)} />
        {/* Next button */}
        <button className='next' onClick={handleNextImage}>&#10095;</button>
      </div>
    </>
  );
}

export default App;
