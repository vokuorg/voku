import React from 'react';

import Chat from '../components/chat/Chat'

function CallRoom() {
  return (
    <div className="grid w-full h-screen grid-cols-8 overflow-hidden bg-gray-800">
      <div className="col-span-6 main-panel">
        videovoko
      </div>

      <div className="h-screen col-span-2 text-white bg-gray-700 rounded-l-lg side-panel">
        <Chat />
        <span></span>
      </div>
    </div>
  );
}

export default CallRoom;