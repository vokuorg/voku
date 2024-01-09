import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';

import { AppContext } from '../../contexts/AppContext/AppContext';

import '../../index.css';
import './VideoBox.css';

function SmallSizeVideoBox({ user, name, color, onClickVideo, classNames }) {
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
        flex flex-wrap content-center justify-center rounded-lg bg-dark-secondary border-gray w-4/12 h-auto md:w-3/12 md:h-auto`
      }
    >
      { !mediaStatus.video &&
        <div className="pading-squared-aspect-ratio">
          <div
            className={
              `${ color || '' }
              flex flex-wrap content-center justify-center w-16 h-16 md:w-24 md:h-24 my-3 md:m-6 text-4xl md:text-5xl text-white rounded-full`
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
          w-full h-full bg-black rounded-lg`
        }
        muted={ user === 'local' }
      ></video>

    </div>
  );
}

export default SmallSizeVideoBox;