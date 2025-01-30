import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5001');

const ChatApp = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat-message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat-message');
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit('chat-message', message); // Send message to server
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <input
      className='inputChatApp'
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
