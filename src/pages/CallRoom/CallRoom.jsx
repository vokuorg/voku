import React from 'react';

import Logo from '../../components/logo/Logo';
import Chat from '../../components/chat/Chat';
import UserVideoBox from '../../components/user-video-box/UserVideoBox';
import CallControls from '../../components/call-controls/CallControls';

function CallRoom() {
  return (
    <div className="grid w-full h-screen grid-cols-8 overflow-hidden bg-gray-800">
      <div className="flex flex-col h-full col-span-6 main-panel">
        <div className="py-3">
          <Logo textColor="white" />
        </div>

        <div className="flex flex-wrap content-center justify-center w-full h-full space-x-8 video-area">
          <UserVideoBox
            user="local"
            name="Kenny"
            color="bg-indigo-800"
          />

          <UserVideoBox 
            user="remote"
            name="Jokenox"
            color="bg-blue-800"
          />
        </div>

        <div className="py-3">
          <CallControls />
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