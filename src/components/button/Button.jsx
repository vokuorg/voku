import React from 'react';

import '../../index.css';
import './Button.css';

function Button({ type, onClick, classNames, children }) {
  return (
    <button type={type} onClick={onClick} className={`inline-flex items-center px-2 py-1 rounded-lg focus:outline-none ${classNames || ''}`}>
      { children }
    </button>
  );
}

export default Button;