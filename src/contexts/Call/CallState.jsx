import React, { useReducer } from 'react';
import CallReducer from './CallReducer';
import CallContext from './CallContext';

const CallState = ({ children }) => {
  const initialState = () => ({
    me: {
      name: null,
      color: null,
      stream: null,
      video: false,
      audio: false
    },
    guest: {
      name: null,
      color: null,
      stream: null,
      video: false,
      audio: false
    },
    messages: []
  });
  
  const [state, dispatch] = useReducer(CallReducer, initialState);

  // Setters ----------
  
  const setMyStream = stream => dispatch({
    type: 'SET_MY_STREAM',
    payload: stream
  });

  const setGuestStream = stream => dispatch({
    type: 'SET_GUEST_STREAM',
    payload: stream
  });

  const setMyInfo = info => dispatch({
    type: 'SET_MY_INFO',
    payload: info
  });

  const setGuestInfo = info => dispatch({
    type: 'SET_GUEST_INFO',
    payload: info
  });

  const setMyVideo = video => dispatch({
    type: 'SET_MY_VIDEO',
    payload: video
  });

  const setGuestVideo = video => dispatch({
    type: 'SET_GUEST_VIDEO',
    payload: video
  });

  const setMyAudio = audio => dispatch({
    type: 'SET_MY_AUDIO',
    payload: audio
  });

  const setGuestAudio = audio => dispatch({
    type: 'SET_GUEST_AUDIO',
    payload: audio
  });

  const addMessage = message => dispatch({
    type: 'ADD_MESSAGE',
    payload: message
  });
  
  return (
    <CallContext.Provider value={{
      state,
      setMyStream,
      setGuestStream,
      setMyInfo,
      setGuestInfo,
      setMyVideo,
      setGuestVideo,
      setMyAudio,
      setGuestAudio,
      addMessage
    }}>
      { children }
    </CallContext.Provider>
  );
};

export default CallState;