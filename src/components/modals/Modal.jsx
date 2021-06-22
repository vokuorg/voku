import React, { useState } from 'react';

import '../../index.css';
import './Modal.css';

function Modal({ id, title, ref, children }) {
  const [visibility, setVisibility] = useState(false);

  const handleVisibility = (e) => {
    if (e.target.id === id) {
      setVisibility(prevVisibility => !prevVisibility);
    }
  };

  const hideModal = () => {
    setVisibility(false);
  };
  
  return (
    <div
    id={id}
    ref={ref}
    onClick={handleVisibility}
    className={`${!visibility ? 'hidden' : ''} fixed inset-0 inset-x-0 z-50 flex items-center w-full h-full bg-black bg-opacity-50`}
    >

      <div className="w-1/3 mx-auto text-white rounded-lg bg-dark-tertiary">
        <div className="flex justify-between px-5 py-3 mb-5 text-2xl">
          { title }

          <button onClick={hideModal} className="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="h-full">
          { children }
        </div>
      </div>

    </div>
  );
};

export default Modal;