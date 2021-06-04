import React from 'react';

import '../../index.css';
import './Button.css';

function Button({ height, color, classNames, children}) {
  return (
    <button className={`inline-flex items-center px-2 py-1 font-medium transform rounded-lg focus:outline-none ${classNames || ''}`}>
      { children }
    </button>
  );
}

export default Button;