// import React, { useState } from 'react';
// import './ChatBubble.css';

// function ChatBubble() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [optionsVisible, setOptionsVisible] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [userMessage, setUserMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleBubbleClick = () => {
//     setIsOpen(true);
//     setTimeout(() => setOptionsVisible(true), 1000);
//   };

//   const closeChat = () => {
//     setIsOpen(false);
//     setOptionsVisible(false);
//     setChatHistory([]);
//     setUserMessage('');
//   };

//   const addToChat = (sender, text) => {
//     setChatHistory((prev) => [...prev, { sender, text }]);
//   };

//   const handleOptionClick = (option) => {
//     addToChat("user", option);

//     let botResponse = '';
//     switch (option) {
//       case 'Book appointment':
//         botResponse = 'Scroll down toward the bottom of the page and click book now!';
//         break;
//       case 'Services I offer':
//         botResponse = 'I offer personalized beauty services tailored to your needs for weddings, proms, parties, photoshoots, and more.';
//         break;
//       case 'Menu':
//         botResponse = "Here's the menu: Nails, Hair, Makeup.";
//         break;
//       default:
//         botResponse = "I'm not sure how to help with that.";
//     }

//     addToChat("bot", botResponse);
//   };

//   const handleMessageSend = async (e) => {
//     e.preventDefault();
//     if (userMessage.trim() === '') return;

//     addToChat("user", userMessage);
//     setIsLoading(true);

//     try {
//       const response = await fetch('http://localhost:5000/api/chatbot', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: userMessage }),
//       });

//       const data = await response.json();
//       addToChat("bot", data.reply || 'Sorry, no reply from chatbot.');
//     } catch (error) {
//       console.error('Error sending message:', error);
//       addToChat("bot", 'Error communicating with chatbot server.');
//     }

//     setUserMessage('');
//     setIsLoading(false);
//   };

//   return (
//     <div className={`chat-bubble ${isOpen ? 'open' : ''}`} onClick={!isOpen ? handleBubbleClick : null}>
//       {!isOpen && (
//         <div className="chat-icon">
//           <span>💬</span>
//         </div>
//       )}

//       {isOpen && (
//         <div className="chat-content">
//           <div className="welcome-message">
//             <p>Hello, welcome to Si Beauty Bar. How may I help you?</p>
//           </div>

//           {optionsVisible && (
//             <div className="chat-options">
//               <button onClick={() => handleOptionClick('Book appointment')}>Book appointment</button>
//               <button onClick={() => handleOptionClick('Services I offer')}>Services I offer</button>
//               <button onClick={() => handleOptionClick('Menu')}>Menu</button>
//             </div>
//           )}

//           <div className="chat-history">
//             {chatHistory.map((msg, i) => (
//               <div key={i} className={`message ${msg.sender}`}>
//                 <p>{msg.text}</p>
//               </div>
//             ))}
//             {isLoading && <div className="message bot"><p>Typing...</p></div>}
//           </div>

//           <form className="chat-input" onSubmit={handleMessageSend}>
//             <input
//               type="text"
//               value={userMessage}
//               onChange={(e) => setUserMessage(e.target.value)}
//               placeholder="Type a message..."
//             />
//             <button type="submit">Send</button>
//           </form>

//           <button className="close-button" onClick={closeChat}>
//             ✖
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatBubble;
