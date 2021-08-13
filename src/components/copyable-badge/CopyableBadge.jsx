import React from 'react';

import '../../index.css';

function CopyableBadge({ text, buttonColor, classNames }) {
  return (
    <div
      className={`
      ${classNames || ''}
        inline-flex items-center px-3 py-2 rounded-lg bg-dark w-max text-gray-light
      `}
    >

      <span className="font-bold text-md">
        { text }
      </span>

      <button
        onClick={ () => navigator.clipboard.writeText(text) }
        className="ml-3 focus:outline-none"
      >
        <svg
          className={`
            ${ buttonColor || 'text-secondary' }
            w-6 h-6
          `}
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
}

export default CopyableBadge;