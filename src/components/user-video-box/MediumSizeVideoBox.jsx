import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';

import { AppContext } from '../../contexts/AppContext/AppContext';

import '../../index.css';
import './VideoBox.css';

function MediumSizeVideoBox({ user, name, color, onClickVideo, classNames }) {
  const videoRef = useRef();

  const {
    localStream,
    guestStream,
    localMediaStatus,
    guestMediaStatus
  } = useContext(AppContext);

  const stream = user === 'local' ? localStream.current : guestStream.current;
  const mediaStatus = user === 'local' ? localMediaStatus : guestMediaStatus;

  useEffect(() => {
    let video = videoRef.current;

    if (video && !video.srcObject && stream) {
      video.srcObject = stream;
      video.play();
    }
  });

  return (
    <div
      className={
        `${classNames || ''}
         relative flex flex-wrap content-center justify-center border-2 border-solid rounded-lg bg-dark-secondary border-gray w-full h-2/5 md:w-2/5 md:h-fit`
      }
    >
      {!mediaStatus.video &&
        <div
          className={
            `${color || ''}
            flex flex-wrap content-center justify-center w-24 h-24 my-auto text-5xl text-white rounded-full`
          }
        >
          {name[0]}
        </div>
      }

      <video
        id={`${user}-video`}
        ref={videoRef}
        onClick={onClickVideo}
        className={
          `${user === 'local' ? 'mirrored' : ''}
          ${!mediaStatus.video ? 'hidden' : ''}
          absolute w-full h-full bg-black rounded-lg`
        }
        muted={user === 'local'}
      ></video>

      <div className="absolute bottom-0 left-0 px-2 py-1 text-white rounded-tr-lg rounded-bl-md bg-dark-tertiary">
        {name}
      </div>
    </div>
  );
}

export default MediumSizeVideoBox;