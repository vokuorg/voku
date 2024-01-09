import React, { useContext, useState, useEffect } from 'react';

import { getRoomId } from '../../utils/identify'

import { AppContext } from '../../contexts/AppContext/AppContext';

import Chat from '../../components/chat/Chat';
import UserInfoModal from '../../components/modals/UserInfoModal';
import CallLinkModal from '../../components/modals/CallLinkModal';
import DualVideoLayout from '../../components/video-layout/DualVideoLayout';
import DualHierarchicalVideoLayout from '../../components/video-layout/DualHierarchicalVideoLayout';
import CallControls from '../../components/call-controls/CallControls';

import '../../index.css';

function CallRoom() {
  const [mobileChatVisibility, setMobileChatVisibility] = useState(false);

  const { 
    focusedUserVideo,
    callLinkModalVisibility,
    isPeerConnected,
    callType,
    joinRoom
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

  const handleMobileChatVisibility = () => {
    setMobileChatVisibility(prev => !prev);
  }
  
  return (
    <div className="grid w-full h-page grid-cols-8 overflow-hidden bg-dark">
      
      { focusedUserVideo !== 'none' &&
        <div className="fixed z-30 top-0 left-0 p-3 block md:hidden">
          <span className="text-xl text-white">
            { getRoomId() }
          </span>
        </div>
      }

      <UserInfoModal
        id={ 'userInfoModal' }
        title={ 'User Name' }
        initialVisibility={ true }
        onSubmit={ joinByLink }
      />

      { callLinkModalVisibility &&
        <CallLinkModal />
      }

      <div className="flex flex-col h-full col-span-8 md:col-span-6 main-panel">

        { focusedUserVideo === 'none' &&
          <div className="w-full h-full pb-16 md:pb-0">
            <DualVideoLayout />
          </div>
        }

        { focusedUserVideo !== 'none' &&
          <div className="w-full h-full md:p-3">
            <DualHierarchicalVideoLayout />
          </div>
        }

        <div className="py-3 bottom-0 inset-x-0 mx-auto z-20 absolute md:static">
          <CallControls mobileChatVisibilityHandler={ handleMobileChatVisibility } />
        </div>

      </div>

      <div className={ `
        ${ mobileChatVisibility ? 'visible ' : 'hidden ' }
        fixed top-0 md:static md:flex flex-col w-full md:w-auto h-full z-40 col-span-2 overflow-hidden text-white md:rounded-l-lg bg-dark-tertiary`
      }>

        <div className="absolute md:static w-full py-3 border-b-2 border-solid border-gray bg-dark-tertiary">
          <span className="text-xl text-white">
            Chat
          </span>

          <button
            onClick={ handleMobileChatVisibility }
            className="visible md:hidden absolute right-3 focus:outline-none"
          >
            <svg
              className="text-white w-7 h-7" 
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className='h-full md:hauto pt-16 md:pt-3 overflow-hidden'>
          <Chat />
        </div>

        <span></span>
        
      </div>
    </div>
  );
}

export default CallRoom;