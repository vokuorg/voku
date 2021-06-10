import React, { useState } from 'react';

import '../../index.css';
import './UserVideoBox.css';

function UserVideoBox({ user, name, color, onClickVideo }) {
  const [playing, setPlaying] = useState(false);

  const handlePlay = e => {
    setPlaying(true);
  };

  return (
    <div className="relative flex flex-wrap content-center justify-center border-2 border-solid rounded-lg bg-dark-secondary border-gray medium-size">
      <div className={playing ? 'hidden' : `${color || ''} flex flex-wrap content-center justify-center w-24 h-24 my-auto text-5xl text-white rounded-full`}>
        { name[0] }
      </div>

      <video 
        id={`${user}-video`}
        className={playing ? 'w-full h-full bg-black rounded-lg' : 'hidden'}
        onClick={onClickVideo}
        onPlay={handlePlay}
      ></video>

      <div className="absolute bottom-0 left-0 px-2 py-1 text-white rounded-tr-lg rounded-bl-md bg-dark-tertiary">
        {name}
      </div>
    </div>
  );
}

export default UserVideoBox;