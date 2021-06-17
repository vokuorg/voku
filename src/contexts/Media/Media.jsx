import React, { createContext, useState, useEffect } from 'react';

const MediaContext = createContext();

const MediaProvider = ({ children }) => {
  const [localStream, setLocalStream] = useState();
  const [guestStream, setGuestStream] = useState();
  const [localMediaStatus, setLocalMediaStatus] = useState({video: false, audio: false });
  const [guestMediaStatus, setGuestMediaStatus] = useState({ video: false, audio: false });

  useEffect(() => {
    getLocalStream();
  });
  
  const getLocalStream = () => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      setLocalStream(stream);
      setLocalMediaStatus({ video: true, audio: true });
    }).catch(err => console.log(err));
  }
  
  const enableLocalVideo = () => {
    localStream.getVideoTracks()[0].enabled = true;
    setLocalMediaStatus(prevStatus => ({ ...prevStatus, video: true }));
  };

  const enableGuestVideo = () => {
    setGuestMediaStatus(prevStatus => ({ ...prevStatus, video: true }));
  };

  
  const enableLocalAudio = () => {
    localStream.getAudioTracks()[0].enabled = true;
    setLocalMediaStatus(prevStatus => ({ ...prevStatus, audio: true }));
  }
  
  const enableGuestAudio = () => {
    setGuestMediaStatus(prevStatus => ({ ...prevStatus, audio: true }));
  }
  
  
  const disableLocalVideo = () => {
    localStream.getVideoTracks()[0].enabled = false;
    setLocalMediaStatus(prevStatus => ({ ...prevStatus, video: false }));
  };

  const disableGuestVideo = () => {
    setGuestMediaStatus(prevStatus => ({ ...prevStatus, video: false }));
  };

  
  const disableLocalAudio = () => {
    localStream.getAudioTracks()[0].enabled = false;
    setLocalMediaStatus(prevStatus => ({ ...prevStatus, audio: false }));
  };
  
  const disableGuestAudio = () => {
    setGuestMediaStatus(prevStatus => ({ ...prevStatus, audio: false }));
  };


  return (
    <MediaContext.Provider value={{
      getLocalStream,
      setGuestStream,
      localStream,
      guestStream,
      localMediaStatus,
      guestMediaStatus,
      enableLocalVideo,
      enableGuestVideo,
      enableLocalAudio,
      enableGuestAudio,
      disableLocalVideo,
      disableGuestVideo,
      disableLocalAudio,
      disableGuestAudio
    }}>
      { children }
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaProvider };