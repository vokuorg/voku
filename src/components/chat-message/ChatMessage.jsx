import React from 'react';

import '../../index.css';
import './ChatMessage.css';

function ChatMessage({ text, side, classNames }) {
  return (
    <div className={ side === 'left' ? 'pr-6' : 'pl-6' }>
      <div className={ `message ${side} ${classNames || ''}` }>
        { text }
      </div>
    </div>
  );
}

export default ChatMessage;