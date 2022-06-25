import React, { useState } from 'react';

import '../../index.css';

function SecondaryModal({ id, title, classNames, ref, children, initialVisibility = false, onClose }) {
  const [visibility, setVisibility] = useState(initialVisibility);

  const hideModal = () => {
    setVisibility(false);
    onClose();
  };
  
  return (
    <div
      id={ id }
      ref={ ref }
      className={`
        ${ classNames || '' }
        ${ !visibility ? 'hidden' : '' }
        fixed z-40 w-max text-white rounded-lg top-5 left-5 md:w-max bg-dark-tertiary
      `}
    >
      <div className="flex justify-between px-5 py-3 mb-5 text-4xl md:text-2xl">
        { title }

        <button onClick={ hideModal } className="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="h-full">
        { children }
      </div>
    </div>
  );
};

export default SecondaryModal;