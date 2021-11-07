import React, { useState } from 'react';
import Button from '../button/Button';

import '../../index.css';

function ChatInput({ placeholder, onSend }) {
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    let value = e.target.value;
    
    let lastChar = value[value.length - 1];

    if (value && lastChar.toLowerCase() === 'x') {
      let specialLetter = value[value.length - 2];
      let beforeSpecialLetter = value.slice(0, value.length - 2);

      switch (specialLetter) {
        case 'C':
          value = beforeSpecialLetter + 'Ĉ';
          break;
        case 'c':
          value = beforeSpecialLetter + 'ĉ';
          break;

        case 'G':
          value = beforeSpecialLetter + 'Ĝ';
          break;
        case 'g':
          value = beforeSpecialLetter + 'ĝ';

        case 'H':
          value = beforeSpecialLetter + 'Ĥ';
          break;
        case 'h':
          value = beforeSpecialLetter + 'ĥ';
          break;

        case 'J':
          value = beforeSpecialLetter + 'Ĵ';
          break;
        case 'j':
          value = beforeSpecialLetter + 'ĵ';
          break;

        case 'S':
          value = beforeSpecialLetter + 'Ŝ';
          break;
        case 's':
          value = beforeSpecialLetter + 'ŝ';
          break;

        case 'U':
          value = beforeSpecialLetter + 'Ŭ';
          break;
        case 'u':
          value = beforeSpecialLetter + 'ŭ';
          break;

        default:
          break;
      }
    }

    setMessage(value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (message.trim()) onSend(message);
    
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-3 border-t-2 border-gray">
      <textarea
        className="w-full h-10 px-4 py-1 mr-2 overflow-auto border-2 border-solid rounded-lg resize-none border-gray bg-dark-secondary focus:outline-none focus:border-primary"
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      ></textarea>

      <Button type="submit" classNames='transform rotate-90 bg-primary hover:bg-primary-dark'>
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </Button>
    </form>
  );
}

export default ChatInput;