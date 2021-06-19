import React, { createContext, useContext, useState } from 'react';
import Peer from 'simple-peer';

import { getRoomId } from '../../utils/identify';

import { MediaContext } from '../../contexts/Media/Media';
import { SignalContext } from '../../contexts/Signal/Signal';
import { CallMessagesContext } from '../../contexts/CallMessages/CallMessages';

const PeerContext = createContext();

const PeerProvider = ({ children }) => {
  let peer;

  const { localStream, setGuestStream } = useContext(MediaContext);
  const { addMessage } = useContext(CallMessagesContext);

  const {
    waitSignalServerConnection,
    setStopListenAnswer,
    stopListenAnswer,
    deleteSignal,
    pushOffer,
    pushAnswer,
    listenAnswer
  } = useContext(SignalContext);

  // Set the peer configuration
  const setPeer = (isInitiator) => {
    peer = new Peer({
      initiator: isInitiator,
      trickle: false,
      stream: localStream,
      config: {
        iceServers: [
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" },
          { urls: "stun:global.stun.twilio.com:3478" }
        ]
      }
    });

    peer.on('connect', () => {
      stopListenAnswer();
      deleteSignal(getRoomId());
      
      console.log('CONNECTED!');
    });

    peer.on('signal', async data => {
      let sdp = JSON.stringify(data);

      if (data.sdp) {
        let roomId = getRoomId();

        if (peer.initiator) {
          await pushOffer(roomId, sdp, callType);
          setStopListenAnswer(listenAnswer(roomId, call));
        } else {
          await pushAnswer(roomId, sdp);
        }
      }
    });

    peer.on('stream', stream => {
      setGuestStream(stream);
    });

    peer.on('data', data => {
      addMessage('guest', data);
    });

    peer.on('error', (err) => {
      console.log('Connection error!');

      console.log(err);
    });

    peer.on('close', () => {
      console.warn('Connection closed');

      peer.destroy();

      if (callType === 'random') {
        randomCall();
      } else {
        waitSignalServerConnection(reconnectCall);
      }
    });
  };

  const signalPeer = (sdp) => {
    peer.signal(sdp);
  };

  const isPeerConnected = () => {
    return peer.connected;
  };

  const sendToPeer = (data) => {
    peer.send(data);
  };

  const destroyPeer = () => {
    peer.destroy();
  };

  return (
    <PeerContext.Provider value={{
      peer,
      setPeer,
      signalPeer,
      isPeerConnected,
      sendToPeer,
      destroyPeer,
    }}>
      { children }
    </PeerContext.Provider>
  );
};

export { PeerContext, PeerProvider };