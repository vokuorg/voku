import React, { createContext, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import useSound from 'use-sound';
import Peer from 'simple-peer';

import { firestore } from '../../firebase';

import { generateId, setRoomId, getRoomId } from '../../utils/identify';

import joinSfx from '../../sounds/join.mp3';
import messageSfx from '../../sounds/message.mp3';

const AppContext = createContext();


const AppContextProvider = ({ children }) => {

  const history = useHistory();

  const [playJoinSfx] = useSound(joinSfx, { volume: 0.5 });
  const [playMessageSfx] = useSound(messageSfx, { volume: 0.5 });

  // ╔══════════════════════════════════════════════════════════╗
  // ║                    User Info Module                      ║                            
  // ╚══════════════════════════════════════════════════════════╝

  let [myName, _setMyName] = useState('Esperantisto');
  let myNameRef = useRef('Esperantisto');

  let [guestName, setGuestName] = useState('Esperantisto');

  const setMyName = (name) => {
    _setMyName(name);
    myNameRef.current = name;

    sendMyUserInfo({ name: name }); 
  };

  const resetGuestName = () => setGuestName('Esperantisto'); 

  const sendMyUserInfo = (info) => {
    if (isPeerConnected()) {
      let data = 'i=' + JSON.stringify(info);
      sendToPeer(data);
    }
  };

  // ╔══════════════════════════════════════════════════════════╗
  // ║                       Peer Module                        ║                            
  // ╚══════════════════════════════════════════════════════════╝

  let peer = useRef(null);
  const [peerConnection, setPeerConnection] = useState(false);

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
      setPeerConnection(true);

      sendMyUserInfo({ name: myNameRef.current });

      playJoinSfx();

      stopListenAnswer();
      deleteSignal(getRoomId());
      
      console.log('CONNECTED!');
    });

    peer.current.on('close', () => {
      console.warn('Connection closed');

      setPeerConnection(false);

      resetGuestName();
      cleanGuestMediaStream();

      if (callType.current === 'random') {
        nextRandomCall();
      } else if (window.location.hash) {
        peer.current.destroy();
        waitSignalServerConnection(reconnectCall);
      }
    });

    peer.current.on('error', (err) => {
      console.error('Connection error!');

      console.log(err);
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
          playMessageSfx();
          break;
          
        case 's': // Status
          let status = JSON.parse(corpus);
          setGuestMediaStatus(status);
          break;

        case 'i': // Info
          let info = JSON.parse(corpus);
          setGuestName(info.name);
          break;

        default:
          break;
      };
    });
  };

  const isPeerSetted = () => !!peer.current;

  const isPeerConnected = () => {
    if (isPeerSetted()) {
      return peer.current.connected;
    } else {
      return false;
    }
  };

  const signalPeer = (sdp) => {
    peer.current.signal(sdp);
  };

  const sendToPeer = (data) => {
    if (isPeerConnected()) peer.current.send(data);
  };

  const destroyPeer = () => {
    peer.current.destroy();
    peer.current = null;

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
    let calls = await callsDB.where('type', '==', 'random').where('status', '==', 'open').where('date', '>', Date.now() - 60000);
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

  const updateSignalDate = async (id) => {
    await callsDB.doc(id).update({
      date: Date.now()
    });
  };

  const signalDateRefresher = (id, milliseconds) => {
    setTimeout(() => {
      if (!peerConnection) {
        updateSignalDate(id);
        signalDateRefresher(id, milliseconds);
      }
    }, milliseconds);
  };
  
  const pushOffer = async (id, offer, type = 'direct') => {
    await callsDB.doc(id).set({ 
      type: type,
      status: 'open',
      date: Date.now(),
      offer: offer,
      answer: null
    });

    if (type === 'random') {
      signalDateRefresher(id, 60000);
    }
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

  const nextRandomCall = () => {
    if (isPeerSetted()) {
      destroyPeer();
      cleanMessages();

      randomCall();
    }
  };

  const finishCall = () => {
    callType.current = null;

    destroyPeer();
    cleanMessages();

    history.replace('/');
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
      callType.current = 'random';
      
      setRoomId(randomSignal.id);

      await getLocalStream(setPeer, false);

      signalPeer(JSON.parse(randomSignal.offer));
    } else {
      startRoom('random');
    }
  };

  const startRoom = (type, id = generateId()) => {
    if (!callType.current) {
      playJoinSfx();
    }

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

  const cleanMessages = () => {
    setMessages([]);
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

  const cleanGuestMediaStream = () => {
    guestStream.current = null;
    setGuestMediaStatus({ video: false, audio: false });
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
      myName, // User Info Module's Start
      setMyName,
      guestName,
      setGuestName, // User Info Module's End
      peerConnection, // Peer Module's Start
      isPeerSetted,
      isPeerConnected,
      destroyPeer, // Peer Module's End
      callType, // Call Module's Start
      call,
      nextRandomCall,
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