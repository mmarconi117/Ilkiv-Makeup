import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header';
import Form from './components/Form';
import Footer from './components/Footer'
import fielddressImage from './images/fielddress.jpg';
import gypImage from './images/gyp.jpg';
import inna from './images/inna.jpg';
import innaback from './images/innabackground.jpeg';
import { setCurrentImageIndex } from './actions/currentAction';
import { showForm, hideForm } from './actions/formAction';
import './App.css';

const images = [
  fielddressImage,
  gypImage,
  // Add other images here
];

function App() {
  const [autoplayInterval, setAutoplayInterval] = useState(null);
  const currentImageIndex = useSelector(state => state.current.currentImageIndex);
  const isFormVisible = useSelector(state => state.form.isFormVisible);
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
    const interval = setInterval(() => {
      const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
      dispatch(setCurrentImageIndex(newIndex));
    }, 5000);

    setAutoplayInterval(interval);

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
    }, 5000);
    setAutoplayInterval(interval);
  };

  const handleFormToggle = () => {
    if (isFormVisible) {
      dispatch(hideForm());
    } else {
      dispatch(showForm());
    }
  };

  return (
    <>
      <Header />
      <div className='center-container'>
            <div className="me">
                {/* <img src={} alt="inna" /> */}
            </div>
            <div className="description-box">
                <p>Specializing in: Hair, Makeup, Massages, nails, and wedding prep. Fill out the form below to make an appointment or contact me via email!
                </p>
            </div>
            <div className='form-button'>
                <button className="open-form-button" onClick={handleFormToggle}>
                    {isFormVisible ? "Close Form" : "Open Form"}
                </button>
            </div>
        </div>

      {isFormVisible && (
        <div className='form-container'>
          <div className='form'>
            <Form />
          </div>
        </div>
      )}


      <div className="carousel-container" onMouseEnter={handlePauseAutoplay} onMouseLeave={handleResumeAutoplay}>
        <div className="carousel">
          <button className="prev" onClick={handlePreviousImage}>&#10094;</button>
          <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
          <button className="next" onClick={handleNextImage}>&#10095;</button>
        </div>
      </div>

      <div className='undercar-container'>
        <div className='undercar-title'>𝔹𝕖𝕒𝕦𝕥𝕪 𝕒𝕥 𝕚𝕥𝕤 𝕗𝕚𝕟𝕖𝕤𝕥</div>
        <div className='undercar-left'>
          <h1>Highly Trained & Skilled Beauty Professional</h1>
          <p className='leftp'>Si Beauty Bar brings the luxury of professional beauty services directly to your location,
          whether it's in the comfort of your own home, at a special event venue, or any other preferred setting.
          Our dedicated team is committed to unveiling the innate beauty and individuality that defines each woman,
          offering a personalized experience tailored to enhance your natural features and boost your confidence.
          From exquisite makeup artistry to rejuvenating skincare treatments, we specialize in providing unparalleled
          pampering that celebrates your unique essence and empowers you to shine with radiance.
          </p>
        </div>
      </div>



      <div className='footer'>
        <Footer />
      </div>
    </>
  );
}

export default App;
