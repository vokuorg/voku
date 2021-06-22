import React from 'react';

const Input = ({ type, value, classNames, placeholder, onChange, onKeyDown, maxLength }) => {
  return(
    <input
      type={ type }
      className={`${classNames || ''} h-10 px-4 py-1 mr-2 overflow-auto border-2 border-solid rounded-lg resize-none border-gray bg-dark-secondary focus:outline-none`}
      value={ value }
      onChange={ onChange }
      onKeyDown={ onKeyDown }
      placeholder={ placeholder }
      maxlength={ maxLength }
    ></input>
  );
};

export default Input;