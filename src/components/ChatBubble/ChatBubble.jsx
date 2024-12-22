import React, { useState } from 'react';
import './ChatBubble.css';

function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [chatResponse, setChatResponse] = useState('');
  const [userMessage, setUserMessage] = useState('')

  const handleBubbleClick = () => {
    setIsOpen(true);
    setTimeout(() => setOptionsVisible(true), 1000);
  };

  const handleOptionClick = (option) => {
    if (option === 'Book appointment') {
      setChatResponse('Scroll down toward the bottom of the page and click book now!');
    } else if (option === 'What I offer...') {
      setChatResponse('I offer personalized beauty services tailored to your needs, ensuring you look and feel your best for weddings, proms, parties, photoshoots, and other special occasions.');
    } else if (option === 'Menu') {
      setChatResponse("Here's the menu: Nails, Hair, Makeup.");
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setOptionsVisible(false);
    setChatResponse('');
    setUserMessage('');
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (userMessage.trim() === '') return;
    setChatResponse(`Please pick an option!`);
    setUserMessage('');
  };

  return (
    <div className={`chat-bubble ${isOpen ? 'open' : ''}`} onClick={!isOpen ? handleBubbleClick : null}>
      {!isOpen && (
        <div className="chat-icon">
          <span>💬</span>
        </div>
      )}

      {isOpen && (
        <div className="chat-content">
          <div className="welcome-message">
            <p>Hello, Welcome to Si Beauty Bar, how may I help you?</p>
          </div>

          {optionsVisible && (
            <div className="chat-options">
              <button onClick={() => handleOptionClick('Book appointment')}>Book appointment</button>
              <button onClick={() => handleOptionClick('What I offer')}>Services I offer</button>
              <button onClick={() => handleOptionClick('Menu')}>Menu</button>
            </div>
          )}

          {chatResponse && (
            <div className="chat-response">
              <p>{chatResponse}</p>
            </div>
          )}

          <div className="chat-input">
            <form onSubmit={handleMessageSend}>
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type a message!"
              />
              <button type="submit">Send Message</button>
            </form>
          </div>


          {isOpen && (
            <button className="close-button" onClick={closeChat}>
              X
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatBubble;
