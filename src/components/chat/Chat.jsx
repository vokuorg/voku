import React from 'react';
import ChatMessage from '../chat-message/ChatMessage';
import ChatInput from '../chat-input/ChatInput';

import '../../index.css';
import './Chat.css'

function Chat() {
  return (
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="flex flex-col h-full px-3 pb-1 overflow-x-hidden overflow-y-auto">
          <div className="h-full"></div>
          
          <ChatMessage
            text="Hola mundo"
            side="left"
          />

          <ChatMessage
            text="Cómo andas?"
            side="left"
          />

          <ChatMessage
            text="Test :)"
            side="left"
          />

          <ChatMessage
            text="Este es un mensaje de prueba"
            side="left"
          />

          <ChatMessage
            text="Muy bien, estoy de acuerdo"
            side="right"
            color="bg-green-500"
          />

          <ChatMessage
            text="Hola mundo!"
            side="right"
            color="bg-green-500"
          />

          <ChatMessage
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut suscipit tellus, in ultrices ligula. Nullam tortor urna, placerat non eros laoreet, consequat luctus nisi. Integer sapien eros, varius at massa non, venenatis ornare odio. Etiam egestas cursus eleifend. Nunc vitae luctus lorem. Cras aliquet nibh magna, quis ultrices erat porta quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum eget erat vitae pharetra. Sed elementum efficitur fermentum. Aenean mi lorem, tristique bibendum sem sed, pharetra lacinia elit."
            side="right"
            color="bg-green-500"
          />
        </div>

        <div className="w-full">
          <ChatInput
            placeholder="Aa"
          />
        </div>
      </div>
  );
}

export default Chat;