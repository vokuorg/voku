import React, { useState } from 'react';
import ChatMessage from '../chat-message/ChatMessage';
import ChatInput from '../chat-input/ChatInput';

import '../../index.css';
import './Chat.css'

function Chat() {
  const [messages, setMessages] = useState([]);

  const newMessage = (side, message) => {
    setMessages(prevMessages => [...prevMessages, {
      side: side,
      text: message
    }]);
  }

  const handleChatInput = (message) => {
    newMessage('local', message);
  }

  const messageList = messages.map((message, index) => {
    const local = message.side === 'local';

    return (
      <ChatMessage
        kk={index}
        text={message.text}
        side={local ? 'right' : 'left'}
        classNames={local ? 'bg-primary' : 'bg-gray'}
      />
    );
  });
  
  return (
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="flex flex-col h-full px-3 pb-1 overflow-x-hidden overflow-y-auto">
          <div className="h-full"></div>
          {messageList}
        </div>

        <div className="w-full">
          <ChatInput
            onSend={handleChatInput}
            placeholder="Aa"
          />
        </div>
      </div>
  );
}

export default Chat;