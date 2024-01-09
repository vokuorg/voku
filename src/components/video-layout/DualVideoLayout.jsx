import React, { useContext } from 'react';

import { AppContext } from '../../contexts/AppContext/AppContext';

import MediumSizeVideoBox from '../user-video-box/MediumSizeVideoBox';

function DualVideoLayout() {
  const {
    focusLocalUserVideo,
    focusGuestUserVideo,
    myName,
    guestName,
    peerConnection
  } = useContext(AppContext);

  return (
    <div className="flex flex-wrap content-center justify-center w-full h-full video-area">

      { peerConnection &&
        <MediumSizeVideoBox
          user="guest"
          name={ guestName }
          color="bg-primary"
          classNames={ 'm-3' }
          onClickVideo={ focusGuestUserVideo }
        />
      }
      
      <MediumSizeVideoBox
        user="local"
        name={ myName }
        color="bg-primary"
        classNames={ 'm-3' }
        onClickVideo={ focusLocalUserVideo }
      />

    </div>
  );
}

export default DualVideoLayout;