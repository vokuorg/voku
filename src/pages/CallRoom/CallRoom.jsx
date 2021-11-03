import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getRoomId } from '../../utils/identify'

import { AppContext } from '../../contexts/AppContext/AppContext';

import Logo from '../../components/logo/Logo';
import Chat from '../../components/chat/Chat';
import CopyableBadge from '../../components/copyable-badge/CopyableBadge';
import UserInfoModal from '../../components/modals/UserInfoModal';
import CallLinkModal from '../../components/modals/CallLinkModal';
import UserVideoBox from '../../components/user-video-box/UserVideoBox';
import CallControls from '../../components/call-controls/CallControls';

function CallRoom() {
  const { 
    callLinkModalVisibility,
    myName,
    guestName,
    isPeerConnected,
    callType,
    joinRoom,
    peerConnection
  } = useContext(AppContext);

  useEffect(() => {
    window.onbeforeunload = (e) => {
      if (isPeerConnected()) {
        return 'Are you sure you want to leave?';
      }
    };
  });

  const joinByLink = () => {
    if (!callType.current) {
      joinRoom(getRoomId());
    }
  };
  
  return (
    <div className="grid w-full h-screen grid-cols-8 overflow-hidden bg-dark">
      <UserInfoModal
        id={ 'userInfoModal' }
        title={ 'User Name' }
        initialVisibility={ true }
        onSubmit={ joinByLink }
      />

      { callLinkModalVisibility &&
        <CallLinkModal />
      }

      <div className="flex flex-col h-full col-span-6 main-panel">
        <div className="py-3">
          <Logo textColor="white" linkTo="/" />
        </div>

        <div className="flex flex-wrap content-center justify-center w-full h-full space-x-8 video-area">
          <UserVideoBox
            user="local"
            name={ myName }
            color="bg-primary"
          />

          { peerConnection &&
            <UserVideoBox
              user="remote"
              name={ guestName }
              color="bg-primary"
            />
          }
        </div>

        <div className="py-3">
          <CallControls />
        </div>
      </div>

      <div className="flex flex-col h-full col-span-2 overflow-hidden text-white rounded-l-lg bg-dark-tertiary side-panel">
        <div className="py-3 border-b-2 border-solid border-gray">
          <span className="text-xl font-bold text-secondary">
            { getRoomId() }
          </span>
        </div>
        <Chat />
        <span></span>
      </div>
    </div>
  );
}

export default CallRoom;