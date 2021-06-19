import React, { createContext, useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';

import { firestore } from '../../firebase';

import { generateId, setRoomId, getRoomId } from '../../utils/identify';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  // ╔══════════════════════════════════════════════════════════╗
  // ║                       Peer Module                        ║                            
  // ╚══════════════════════════════════════════════════════════╝

  let peer;

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

  
  // ╔══════════════════════════════════════════════════════════╗
  // ║                      Signal Module                       ║
  // ╚══════════════════════════════════════════════════════════╝

  const callsDB = firestore.collection('calls');

  // This stores a function that is redefined to stop the onSnapshot event for SDP answer.
  const listenAnswerFinisher = useRef(() => console.log('Finisher has not yet been defined...'));

  const setStopListenAnswer = (finisher) => {
    listenAnswerFinisher.current = finisher;
  };

  const stopListenAnswer = () => {
    listenAnswerFinisher.current();
  };

  const waitSignalServerConnection = async (callback) => {
    firestore.collection('tests').doc('connection').get().then(doc => {
      callback();
    }).catch(err => {
      waitSignalServerConnection(callback);
    });
  };
  
  const getSignal = async (id) => {
    return await callsDB.doc(id).get();
  };
  
  const getStatus = async (id) => {
    let signal = await getSignal(id);
    return signal.data() ? signal.data().status : undefined;
  };
  
  const getOffer = async (id) => {
    let signal = await getSignal(id);
    return signal.data() ? signal.data().offer : undefined;
  };
  
  const getAnswer = async (id) => {
    let signal = await getSignal(id);
    return signal.data() ? signal.data().answer : undefined;
  };
  
  const getRandom = async () => {
    let calls = await callsDB.where('type', '==', 'random').where('status', '==', 'open');
    let signal;
  
    await calls.get().then(snapshot => {
      snapshot.forEach(doc => {
        if (!signal) {
          signal = doc.data();
          signal.id = String(doc.id);
        }
      });
    });
  
    return signal;
  };
  
  const pushOffer = async (id, offer, type) => {
    await callsDB.doc(id).set({ 
      type: (type ? type : 'direct'),
      status: 'open',
      date: Date.now(),
      offer: offer,
      answer: null
    });
  };
  
  const pushAnswer = async (id, answer) => {
    await callsDB.doc(id).update({
      status: 'signaling',
      answer: answer
    });
  };
  
  const listenOffer = (id, callback) => {
    return callsDB.doc(id).onSnapshot(doc => {
      let data = doc.data();
  
      if (data.answer) callback(data.offer);
    });
  };
  
  const listenAnswer = (id, callback) => {
    return callsDB.doc(id).onSnapshot(doc => {
      let data = doc.data();
  
      if (data.answer) callback(data.answer);
    });
  };
  
  const deleteSignal = (id) => {
    callsDB.doc(id).delete();
  };


  // ╔══════════════════════════════════════════════════════════╗
  // ║                       Call Module                        ║
  // ╚══════════════════════════════════════════════════════════╝

  let callType = undefined;

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


  // ╔══════════════════════════════════════════════════════════╗
  // ║                   Call Messages Module                   ║
  // ╚══════════════════════════════════════════════════════════╝

  const [Messages, setMessages] = useState([]);

  const addMessage = (user, message) => {
    setMessages(prevMessages => [...prevMessages, {
      user: user,
      text: message
    }]);
  };

  const sendMessage = (message) => {
    sendToPeer(message);
    addMessage('me', message);
  };


  // ╔══════════════════════════════════════════════════════════╗
  // ║                       Media Module                       ║
  // ╚══════════════════════════════════════════════════════════╝

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
  };
  
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
  };
  
  const enableGuestAudio = () => {
    setGuestMediaStatus(prevStatus => ({ ...prevStatus, audio: true }));
  };
  
  
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
    <AppContext.Provider value={{
      callType, // Call Module's Start
      call,
      finishCall,
      reconnectCall,
      randomCall,
      startRoom,
      joinRoom, // Call Module's End
      Messages, // Call Messages Module's Start
      addMessage,
      sendMessage, // Call Messages Module's End
      getLocalStream, // Media Module's Start
      localStream,
      guestStream,
      localMediaStatus,
      guestMediaStatus,
      enableLocalVideo,
      enableLocalAudio,
      disableLocalVideo,
      disableLocalAudio // Media Module's End
    }}>
      { children }
    </AppContext.Provider>
  );


};

export { AppContext, AppContextProvider };