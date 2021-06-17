import React, { useContext } from 'react';

import { CallMessagesContext } from '../../contexts/CallMessages/CallMessages';

import ChatMessage from '../chat-message/ChatMessage';
import ChatInput from '../chat-input/ChatInput';

import '../../index.css';
import './Chat.css'

function Chat() {
  const { Messages, addMessage } = useContext(CallMessagesContext);

  const handleChatInput = (message) => {
    addMessage('me', message);
  }

  const messageList = Messages.map((message, index) => {
    const localUser = message.user === 'me';

    return (
      <ChatMessage
        kk={index}
        text={message.text}
        side={localUser ? 'right' : 'left'}
        classNames={localUser ? 'bg-primary' : 'bg-gray'}
      />
    );
  });
  
  return (
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="flex flex-col h-full px-3 pb-1 overflow-x-hidden overflow-y-auto">
          <div className="h-full"></div>
          { messageList }
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