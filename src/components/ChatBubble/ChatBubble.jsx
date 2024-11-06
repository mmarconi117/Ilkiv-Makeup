import React, { useState } from 'react';
import './ChatBubble.css'; // Assuming you have the styles

function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false); // Toggle chat visibility
  const [optionsVisible, setOptionsVisible] = useState(false); // Toggle options visibility
  const [chatResponse, setChatResponse] = useState(''); // To store the chat response message

  const handleBubbleClick = () => {
    setIsOpen(true); // Open chat on click
    setTimeout(() => setOptionsVisible(true), 1000); // Show options after a brief delay
  };

  const handleOptionClick = (option) => {
    if (option === 'Book appointment') {
      setChatResponse('Scroll down toward the bottom of the page and click book now!'); // Set response for Book appointment
    } else if (option === 'What I offer') {
      setChatResponse('Here are the services I offer: ...'); // Customize response
    } else if (option === 'Menu') {
      setChatResponse('Here’s the menu: ...'); // Customize response
    }
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
              <button onClick={() => handleOptionClick('What I offer')}>What I offer</button>
              <button onClick={() => handleOptionClick('Menu')}>Menu</button>
            </div>
          )}

          {chatResponse && (
            <div className="chat-response">
              <p>{chatResponse}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatBubble;
