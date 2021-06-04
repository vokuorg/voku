import React from 'react';
import Button from '../button/Button';

import '../../index.css';
import './ChatInput.css';

function ChatInput({ placeholder }) {
  return (
    <div className="flex p-3 border-t-2 border-gray-600">
      <textarea className="w-full h-10 px-4 py-1 mr-2 overflow-auto bg-gray-800 border-2 border-gray-600 border-solid rounded-lg resize-none focus:outline-none" placeholder={placeholder}></textarea>

      <Button classNames='transform rotate-90 bg-green-500'>
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </Button>
    </div>
  );
}

export default ChatInput;