import React, { createContext, useContext } from 'react';

import { generateId, setRoomId, getRoomId } from '../../utils/identify';

import { SignalContext } from '../../contexts/Signal/Signal';
import { PeerContext } from '../../contexts/Peer/Peer';

const CallContext = createContext();

const CallProvider = ({ children }) => {
  let callType = undefined;

  const {
    setPeer,
    isPeerConnected,
    signalPeer,
    destroyPeer
  } = useContext(SignalContext);

  const {
    getOffer,
    getRandom
  } = useContext(PeerContext);


  // Call to other user by his SDP description
  const call = (sdp) => {
    if (!isPeerConnected()) {
      signalPeer(JSON.parse(sdp));
    }
  };

  const finishCall = () => {
    destroyPeer();
  };

  const reconnectCall = async () => {
    let offer = await getOffer(getRoomId());

    if (offer) {
      setPeer(false);
      signalPeer(JSON.parse(offer));
    } else {
      setPeer(true);
    }
  };

  const randomCall = async () => {
    let randomSignal = await getRandom();

    if (randomSignal) {
      setRoomId(randomSignal.id);

      setPeer(false);
      signalPeer(JSON.parse(randomSignal.offer));
    } else {
      startRoom('random');
    }
  };

  const startRoom = (type, id) => {
    callType = type;

    if (id) setRoomId(id);
    else setRoomId(generateId());

    setPeer(true);
  };

  const joinRoom = (id) => {
    setRoomId(id);
    
    setPeer(false);
    getOffer(id).then(offer => call(offer));
  };

  return (
    <CallContext.Provider value={{
      callType,
      call,
      finishCall,
      reconnectCall,
      randomCall,
      startRoom,
      joinRoom
    }}>
      { children }
    </CallContext.Provider>
  );
};

export { CallContext, CallProvider };