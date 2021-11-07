import React from 'react';

import '../../index.css';

function Button({ type, onClick, classNames, children, disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center px-2 py-1 rounded-lg focus:outline-none disabled:opacity-50 ${classNames || ''}`}
      disabled={ disabled }
      >
      { children }
    </button>
  );
}

export default Button;