import React, { createContext, useRef } from 'react';
import { firestore } from '../../firebase';

const SignalContext = createContext();

const SignalProvider = ({ children }) => {
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
  }
  
  const getSignal = async (id) => {
    return await callsDB.doc(id).get();
  }
  
  const getStatus = async (id) => {
    let signal = await getSignal(id);
    return signal.data() ? signal.data().status : undefined;
  }
  
  const getOffer = async (id) => {
    let signal = await getSignal(id);
    return signal.data() ? signal.data().offer : undefined;
  }
  
  const getAnswer = async (id) => {
    let signal = await getSignal(id);
    return signal.data() ? signal.data().answer : undefined;
  }
  
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
  }
  
  const pushOffer = async (id, offer, type) => {
    await callsDB.doc(id).set({ 
      type: (type ? type : 'direct'),
      status: 'open',
      date: Date.now(),
      offer: offer,
      answer: null
    });
  }
  
  const pushAnswer = async (id, answer) => {
    await callsDB.doc(id).update({
      status: 'signaling',
      answer: answer
    });
  }
  
  const listenOffer = (id, callback) => {
    return callsDB.doc(id).onSnapshot(doc => {
      let data = doc.data();
  
      if (data.answer) callback(data.offer);
    });
  }
  
  const listenAnswer = (id, callback) => {
    return callsDB.doc(id).onSnapshot(doc => {
      let data = doc.data();
  
      if (data.answer) callback(data.answer);
    });
  }
  
  const deleteSignal = (id) => {
    callsDB.doc(id).delete();
  }

  return (
    <SignalContext.Provider value={{
      setStopListenAnswer,
      stopListenAnswer,
      waitSignalServerConnection,
      getSignal,
      getStatus,
      getOffer,
      getAnswer,
      getRandom,
      pushOffer,
      pushAnswer,
      listenOffer,
      listenAnswer,
      deleteSignal
    }}>
      { children }
    </SignalContext.Provider>
  );
};

export { SignalContext, SignalProvider };