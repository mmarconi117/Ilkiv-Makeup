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

      <div className='center-container'>
        <div className="me">
          {/* <img src={} alt="inna" /> */}
        </div>
        <div className="description-box">
          <p>Specializing in: Hair, Makeup, Massages, nails, and wedding prep. Fill out the form below to make an appointment or contact me via email!
          </p>
        </div>
        <Header />
      </div>




      <div className="carousel-container" onMouseEnter={handlePauseAutoplay} onMouseLeave={handleResumeAutoplay}>
        <div className="carousel">
          <button className="prev" onClick={handlePreviousImage}>&#10094;</button>
          <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
          <button className="next" onClick={handleNextImage}>&#10095;</button>
        </div>
      </div>





      <div className='undercar-container'>
        <div className='undercar-title'>𝔹𝕖𝕒𝕦𝕥𝕪 𝕒𝕥 𝕚𝕥𝕤 𝕗𝕚𝕟𝕖𝕤𝕥</div>
        <div className='undercartitle-container'>
          <div className='undercar-left'>
            <h1>ʜɪɢʜʟʏ ᴛʀᴀɪɴᴇᴅ & ꜱᴋɪʟʟᴇᴅ ʙᴇᴀᴜᴛʏ ᴘʀᴏꜰᴇꜱꜱɪᴏɴᴀʟ</h1>
            <p className='leftp'>
              𝘚𝘪 𝘉𝘦𝘢𝘶𝘵𝘺 𝘉𝘢𝘳 𝘣𝘳𝘪𝘯𝘨𝘴 𝘵𝘩𝘦 𝘭𝘶𝘹𝘶𝘳𝘺 𝘰𝘧 𝘱𝘳𝘰𝘧𝘦𝘴𝘴𝘪𝘰𝘯𝘢𝘭 𝘣𝘦𝘢𝘶𝘵𝘺 𝘴𝘦𝘳𝘷𝘪𝘤𝘦𝘴 𝘥𝘪𝘳𝘦𝘤𝘵𝘭𝘺 𝘵𝘰 𝘺𝘰𝘶𝘳 𝘭𝘰𝘤𝘢𝘵𝘪𝘰𝘯,        𝘸𝘩𝘦𝘵𝘩𝘦𝘳 𝘪𝘵'𝘴 𝘪𝘯 𝘵𝘩𝘦 𝘤𝘰𝘮𝘧𝘰𝘳𝘵 𝘰𝘧 𝘺𝘰𝘶𝘳 𝘰𝘸𝘯 𝘩𝘰𝘮𝘦, 𝘢𝘵 𝘢 𝘴𝘱𝘦𝘤𝘪𝘢𝘭 𝘦𝘷𝘦𝘯𝘵 𝘷𝘦𝘯𝘶𝘦, 𝘰𝘳 𝘢𝘯𝘺 𝘰𝘵𝘩𝘦𝘳 𝘱𝘳𝘦𝘧𝘦𝘳𝘳𝘦𝘥 𝘴𝘦𝘵𝘵𝘪𝘯𝘨.        𝘖𝘶𝘳 𝘥𝘦𝘥𝘪𝘤𝘢𝘵𝘦𝘥 𝘵𝘦𝘢𝘮 𝘪𝘴 𝘤𝘰𝘮𝘮𝘪𝘵𝘵𝘦𝘥 𝘵𝘰 𝘶𝘯𝘷𝘦𝘪𝘭𝘪𝘯𝘨 𝘵𝘩𝘦 𝘪𝘯𝘯𝘢𝘵𝘦 𝘣𝘦𝘢𝘶𝘵𝘺 𝘢𝘯𝘥 𝘪𝘯𝘥𝘪𝘷𝘪𝘥𝘶𝘢𝘭𝘪𝘵𝘺 𝘵𝘩𝘢𝘵 𝘥𝘦𝘧𝘪𝘯𝘦𝘴 𝘦𝘢𝘤𝘩 𝘸𝘰𝘮𝘢𝘯,        𝘰𝘧𝘧𝘦𝘳𝘪𝘯𝘨 𝘢 𝘱𝘦𝘳𝘴𝘰𝘯𝘢𝘭𝘪𝘻𝘦𝘥 𝘦𝘹𝘱𝘦𝘳𝘪𝘦𝘯𝘤𝘦 𝘵𝘢𝘪𝘭𝘰𝘳𝘦𝘥 𝘵𝘰 𝘦𝘯𝘩𝘢𝘯𝘤𝘦 𝘺𝘰𝘶𝘳 𝘯𝘢𝘵𝘶𝘳𝘢𝘭 𝘧𝘦𝘢𝘵𝘶𝘳𝘦𝘴 𝘢𝘯𝘥 𝘣𝘰𝘰𝘴𝘵 𝘺𝘰𝘶𝘳 𝘤𝘰𝘯𝘧𝘪𝘥𝘦𝘯𝘤𝘦.        𝘍𝘳𝘰𝘮 𝘦𝘹𝘲𝘶𝘪𝘴𝘪𝘵𝘦 𝘮𝘢𝘬𝘦𝘶𝘱 𝘢𝘳𝘵𝘪𝘴𝘵𝘳𝘺 𝘵𝘰 𝘳𝘦𝘫𝘶𝘷𝘦𝘯𝘢𝘵𝘪𝘯𝘨 𝘴𝘬𝘪𝘯𝘤𝘢𝘳𝘦 𝘵𝘳𝘦𝘢𝘵𝘮𝘦𝘯𝘵𝘴, 𝘸𝘦 𝘴𝘱𝘦𝘤𝘪𝘢𝘭𝘪𝘻𝘦 𝘪𝘯 𝘱𝘳𝘰𝘷𝘪𝘥𝘪𝘯𝘨 𝘶𝘯𝘱𝘢𝘳𝘢𝘭𝘭𝘦𝘭𝘦𝘥        𝘱𝘢𝘮𝘱𝘦𝘳𝘪𝘯𝘨 𝘵𝘩𝘢𝘵 𝘤𝘦𝘭𝘦𝘣𝘳𝘢𝘵𝘦𝘴 𝘺𝘰𝘶𝘳 𝘶𝘯𝘪𝘲𝘶𝘦 𝘦𝘴𝘴𝘦𝘯𝘤𝘦 𝘢𝘯𝘥 𝘦𝘮𝘱𝘰𝘸𝘦𝘳𝘴 𝘺𝘰𝘶 𝘵𝘰 𝘴𝘩𝘪𝘯𝘦 𝘸𝘪𝘵𝘩 𝘳𝘢𝘥𝘪𝘢𝘯𝘤𝘦.      </p>
          </div>
          <div className='undercar-middle'>
          </div>
          <div className='undercar-right'>
          </div>
        </div>
        <div className='form-button'>
          <button className="open-form-button" onClick={handleFormToggle}>
            {isFormVisible ? "Close Form" : "Open Form"}
          </button>
          {isFormVisible && (
        <div className='form-container'>
          <div className='form'>
            <Form />
          </div>
        </div>
      )}
        </div>
      </div>



      <div className='footer'>
        <Footer />
      </div>
    </>
  );
}

export default App;
