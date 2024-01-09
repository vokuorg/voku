import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';

import { AppContext } from '../../contexts/AppContext/AppContext';

import '../../index.css';
import './VideoBox.css';

function FullSizeVideoBox({ user, name, color, onClickVideo, children, classNames }) {
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
        `${ classNames || '' }
        relative flex flex-wrap content-center justify-center md:border-2 md:border-solid md:rounded-lg md:bg-dark-secondary md:border-gray h-full md:h-full md:w-fit`
      }
    >
      { !mediaStatus.video &&
        <div className="pading-squared-aspect-ratio">
          <div
            className={
              `${ color || '' }
              flex flex-wrap content-center justify-center w-24 h-24 my-auto mx-full text-5xl text-white rounded-full`
            }
          >
            { name[0] }
          </div>
        </div>
      }
      
      <video
        id={ `${user}-video` }
        ref={ videoRef }
        onClick={ onClickVideo }
        className={
          `${ user === 'local' ? 'mirrored' : '' }
          ${ !mediaStatus.video ? 'hidden' : '' }
          w-full h-full md:rounded-lg bg-black`
        }
        muted={ user === 'local' }
      ></video>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 md:top-auto md:bottom-0 md:left-0 md:-translate-x-0 md:px-2 md:py-1 text-white text-xl md:text-lg md:rounded-tr-lg md:rounded-bl-md md:bg-dark-tertiary">
        { name }
      </div>

      { children }
    </div>
  );
}

export default FullSizeVideoBox;