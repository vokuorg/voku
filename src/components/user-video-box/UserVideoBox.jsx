import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';
import { MediaContext } from '../../contexts/Media/Media';

import '../../index.css';
import './UserVideoBox.css';

function UserVideoBox({ user, name, color, onClickVideo }) {
  const videoRef = useRef();

  const {
    localStream,
    guestStream,
    localMediaStatus,
    guestMediaStatus
  } = useContext(MediaContext);

  const stream = user === 'local' ? localStream : guestStream;
  const mediaStatus = user === 'local' ? localMediaStatus : guestMediaStatus;

  useEffect(() => {
    let video = videoRef.current;
    
    if (!video.srcObject && stream) {
      video.srcObject = stream;
      video.play();
    }
  });

  return (
    <div className="relative flex flex-wrap content-center justify-center border-2 border-solid rounded-lg bg-dark-secondary border-gray medium-size">
      <div className={mediaStatus.video ? 'hidden' : `${color || ''} flex flex-wrap content-center justify-center w-24 h-24 my-auto text-5xl text-white rounded-full`}>
        {name[0]}
      </div>

      <video
        id={`${user}-video`}
        ref={videoRef}
        className={
          mediaStatus.video
          ? (`w-full h-full bg-black rounded-lg ${user === 'local' ? 'mirrored' : ''}`)
          : 'hidden'
        }
        onClick={onClickVideo}
        muted={user === 'local'}
      ></video>

      <div className="absolute bottom-0 left-0 px-2 py-1 text-white rounded-tr-lg rounded-bl-md bg-dark-tertiary">
        {name}
      </div>
    </div>
  );
}

export default UserVideoBox;