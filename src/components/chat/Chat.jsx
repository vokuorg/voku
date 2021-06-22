import React, { useContext, useRef, useEffect } from 'react';

import { AppContext } from '../../contexts/AppContext/AppContext';

import ChatMessage from '../chat-message/ChatMessage';
import ChatInput from '../chat-input/ChatInput';

import '../../index.css';
import './Chat.css'

function Chat() {
  const { Messages, sendMessage } = useContext(AppContext);
  const messagesAnchor = useRef();

  const handleChatInput = (message) => {
    sendMessage(message);
  }

  useEffect(() => {
    messagesAnchor.current.scrollIntoView({ behavior: "smooth" });
  });

  const messageList = Messages.map((message, index) => {
    const localUser = message.user === 'me';

    return (
      <ChatMessage
        kk={ index }
        text={ message.text }
        side={ localUser ? 'right' : 'left' }
        classNames={ localUser ? 'bg-primary' : 'bg-gray' }
      />
    );
  });
  
  return (
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="flex flex-col h-full px-3 pb-1 overflow-x-hidden overflow-y-auto">
          <div className="h-full"></div>

          { messageList }
          
          <div ref={ messagesAnchor }></div>
        </div>

        <div className="w-full">
          <ChatInput
            onSend={ handleChatInput }
            placeholder="Aa"
          />
        </div>
      </div>
  );
}

export default Chat;