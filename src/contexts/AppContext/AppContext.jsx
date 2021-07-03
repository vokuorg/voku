import React, { createContext, useState, useRef } from 'react';
import Peer from 'simple-peer';

import { firestore } from '../../firebase';

import { generateId, setRoomId, getRoomId } from '../../utils/identify';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  // ╔══════════════════════════════════════════════════════════╗
  // ║                       Peer Module                        ║                            
  // ╚══════════════════════════════════════════════════════════╝

  let peer = useRef(null);

  // Set the peer configuration
  const setPeer = (isInitiator) => {
    peer.current = new Peer({
      initiator: isInitiator,
      trickle: false,
      stream: localStream.current,
      config: {
        iceServers: [
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" },
          { urls: "stun:global.stun.twilio.com:3478" }
        ]
      }
    });

    peer.current.on('connect', () => {
      stopListenAnswer();
      deleteSignal(getRoomId());
      
      console.log('CONNECTED!');
    });

    peer.current.on('signal', async data => {
      let sdp = JSON.stringify(data);

      if (data.sdp) {
        let roomId = getRoomId();

        if (peer.current.initiator) {
          await pushOffer(roomId, sdp, callType.current);
          setStopListenAnswer(listenAnswer(roomId, call));
        } else {
          await pushAnswer(roomId, sdp);
        }
      }
    });

    peer.current.on('stream', stream => {
      guestStream.current = stream;
      setGuestMediaStatus({ video: true, audio: true });
    });

    peer.current.on('data', data => {
      let decodedData = new TextDecoder().decode(data);
      let type = decodedData[0];
      let corpus = decodedData.substr(2);

      switch (type) {
        case 'm': // Message
          addMessage('guest', corpus);
          break;
          
        case 's': // Status
          let status = JSON.parse(corpus);
          setGuestMediaStatus(status);
          break;

        case 'i': // Info
          //setGuestInfo(JSON.parse(corpus));
          //break;
        default:
          break;
      };
    });

    peer.current.on('error', (err) => {
      console.error('Connection error!');

      console.log(err);
    });

    peer.current.on('close', () => {
      console.warn('Connection closed');

      peer.current.destroy();

      if (callType.current === 'random') {
        randomCall();
      } else if (window.location.hash) {
        waitSignalServerConnection(reconnectCall);
      }
    });
  };

  const isPeerSetted = () => !!peer.current;

  const signalPeer = (sdp) => {
    peer.current.signal(sdp);
  };

  const isPeerConnected = () => {
    return peer.current.connected;
  };

  const sendToPeer = (data) => {
    if (isPeerConnected()) peer.current.send(data);
  };

  const destroyPeer = () => {
    peer.current.destroy();

    stopListenAnswer();
  };

  
  // ╔══════════════════════════════════════════════════════════╗
  // ║                      Signal Module                       ║
  // ╚══════════════════════════════════════════════════════════╝

  const callsDB = firestore.collection('calls');

  // This stores a function that is redefined to stop the onSnapshot event for SDP answer.
  const listenAnswerFinisher = useRef(() => 0);

  const setStopListenAnswer = (finisher) => {
    listenAnswerFinisher.current = finisher;
  };

  const stopListenAnswer = () => {
    listenAnswerFinisher.current();

    listenAnswerFinisher.current = () => 0;
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

  const callType = useRef(undefined);

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

      await getLocalStream(setPeer, false);

      signalPeer(JSON.parse(randomSignal.offer));
    } else {
      startRoom('random');
    }
  };

  const startRoom = (type, id = generateId()) => {
    callType.current = type;

    setRoomId(id);

    getLocalStream(setPeer, true);
  };

  const joinRoom = async (id) => {
    callType.current = 'direct';

    setRoomId(id);

    await getLocalStream(setPeer, false);
    
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
    sendToPeer('m=' + message);
    
    addMessage('me', message);
  };


  // ╔══════════════════════════════════════════════════════════╗
  // ║                       Media Module                       ║
  // ╚══════════════════════════════════════════════════════════╝

  const localStream = useRef(null);
  const guestStream = useRef(null);
  const [localMediaStatus, setLocalMediaStatus] = useState({video: false, audio: false });
  const [guestMediaStatus, setGuestMediaStatus] = useState({ video: false, audio: false });
  
  const getLocalStream = async (callback, callbackParam) => {
    return navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      localStream.current = stream;
      setLocalMediaStatus({ video: true, audio: true });

      callback(callbackParam);
    }).catch(err => console.log(err));
  };

  const stopLocalStream = () => {
    localStream.current.getTracks().forEach(track => track.stop());

    //setLocalMediaStatus({ video: false, audio: false });
  };

  // Send a message to the other user
  // to update his guest's status
  const sendStatus = (status) => {
    let data = 's=' + JSON.stringify(status);
    sendToPeer(data);
  };
  
  
  const enableLocalVideo = () => {
    localStream.current.getVideoTracks()[0].enabled = true;

    setLocalMediaStatus(prevStatus => {
      let newStatus = { ...prevStatus, video: true };
      sendStatus(newStatus);
      return newStatus;
    })
  };
  
  const enableLocalAudio = () => {
    localStream.current.getAudioTracks()[0].enabled = true;

    setLocalMediaStatus(prevStatus => {
      let newStatus = { ...prevStatus, audio: true };
      sendStatus(newStatus);
      return newStatus;
    })
  };
  
  
  const disableLocalVideo = () => {
    localStream.current.getVideoTracks()[0].enabled = false;

    setLocalMediaStatus(prevStatus => {
      let newStatus = { ...prevStatus, video: false };
      sendStatus(newStatus);
      return newStatus;
    })
  };
  
  const disableLocalAudio = () => {
    localStream.current.getAudioTracks()[0].enabled = false;
    
    setLocalMediaStatus(prevStatus => {
      let newStatus = { ...prevStatus, audio: false };
      sendStatus(newStatus);
      return newStatus;
    })
  };


  return (
    <AppContext.Provider value={{
      isPeerSetted, // Peer Module
      destroyPeer,
      callType, // Call Module's Start
      call,
      finishCall,
      reconnectCall,
      randomCall,
      startRoom,
      joinRoom, // Call Module's End
      Messages, // Call Messages Module's Start
      sendMessage, // Call Messages Module's End
      getLocalStream, // Media Module's Start
      stopLocalStream,
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