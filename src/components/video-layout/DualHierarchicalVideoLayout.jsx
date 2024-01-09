import React, { useContext, useRef } from 'react';

import { AppContext } from '../../contexts/AppContext/AppContext';

import FullSizeVideoBox from '../user-video-box/FullSizeVideoBox';
import SmallSizeVideoBox from '../user-video-box/SmallSizeVideoBox';

function DualVideoLayout(classNames) {
  const videoRef = useRef();
  
  const { 
    focusedUserVideo,
    focusLocalUserVideo,
    focusGuestUserVideo,
    splitUserVideos,
    myName,
    guestName,
    peerConnection
  } = useContext(AppContext);

  const handleFullSizeVideoClick = () => {
    splitUserVideos();
  }

  const handleSmallSizeVideoClick = () => {
    if (focusedUserVideo === 'local') {
      focusGuestUserVideo();
    } else {
      focusLocalUserVideo();
    }
    
  }

  return (
    <div className="relative flex flex-wrap content-center justify-center w-full h-full video-area">

      { focusedUserVideo &&
        <FullSizeVideoBox
          user={  focusedUserVideo === 'local' ? 'local' : 'guest' }
          name={ focusedUserVideo === 'local' ? myName : guestName }
          color="bg-primary"
          onClickVideo={ handleFullSizeVideoClick }
          ref={ videoRef }
          classNames={ '' }
        >
          { peerConnection &&
            <div className='absolute top-3 right-3 w-auto justify-end flex'>
              <SmallSizeVideoBox
                user={ focusedUserVideo === 'local' ? 'guest' : 'local' }
                name={ focusedUserVideo === 'local' ? guestName : myName }
                color="bg-primary"
                onClickVideo={ handleSmallSizeVideoClick }
              />
            </div>
          }
        </FullSizeVideoBox>
      }

    </div>
  );
}

export default DualVideoLayout;