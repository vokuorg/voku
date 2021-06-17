import React, { createContext, useState } from 'react';

const CallMessagesContext = createContext();

const CallMessagesProvider = ({ children }) => {
  const [Messages, setMessages] = useState([]);

  const addMessage = (user, message) => {
    setMessages(prevMessages => [...prevMessages, {
      user: user,
      text: message
    }]);
  }

  return (
    <CallMessagesContext.Provider value={{
      Messages,
      addMessage
    }}>
      { children }
    </CallMessagesContext.Provider>
  );
};

export { CallMessagesContext, CallMessagesProvider };