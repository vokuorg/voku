import React from 'react';

import '../../index.css';
import './UserVideoBox.css';

function UserVideoBox({ user, name, color }) {
  return (
    <div className="flex flex-wrap content-center justify-center bg-gray-700 border-2 border-gray-600 border-solid rounded-lg video-container">
      <div className={`${color || ''} flex flex-wrap content-center justify-center w-1/3 text-5xl text-white rounded-full h-1/3`}>
        { name[0] }
      </div>
      <video id={`${user}-video`} className="hidden"></video>
    </div>
  );
}

export default UserVideoBox;