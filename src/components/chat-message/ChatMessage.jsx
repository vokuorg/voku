import React from 'react';
import Linkify from 'react-linkify';

import '../../index.css';
import './ChatMessage.css';

function ChatMessage({ text, side, classNames }) {
  const componentDecorator = (href, text, key) => (
    <a
      href={ href }
      key={ key }
      target="_blank"
      className="font-bold text-secondary-dark"
    >
      {text}
    </a>
  );

  return (
    <div className={ side === 'left' ? 'pr-6' : 'pl-6' }>
      <div className={ `message ${side} ${classNames || ''}` }>
        <Linkify componentDecorator={ componentDecorator }>
          { text }
        </Linkify>
      </div>
    </div>
  );
}

export default ChatMessage;