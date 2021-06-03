import React from 'react';

import Chat from '../components/chat/Chat'
import Logo from '../components/logo/Logo'

function CallRoom() {
  return (
    <div className="grid w-full h-screen grid-cols-8 overflow-hidden bg-gray-800">
      <div className="col-span-6 main-panel">
        <div className="py-3">
          <Logo textColor="white" />
        </div>
      </div>

      <div className="h-screen col-span-2 text-white bg-gray-700 rounded-l-lg side-panel">
        <Chat />
        <span></span>
      </div>
    </div>
  );
}

export default CallRoom;