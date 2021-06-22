import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AppContext } from '../../contexts/AppContext/AppContext';

import Button from '../button/Button';

import '../../index.css';
import './CallControls.css';

function CallControls() {
  const {
    finishCall,
    localMediaStatus,
    enableLocalVideo,
    enableLocalAudio,
    disableLocalVideo,
    disableLocalAudio
  } = useContext(AppContext);

  const history = useHistory();
  

  const handleVideoButton = () => {
    if (localMediaStatus.video) disableLocalVideo();
    else enableLocalVideo();
  }

  const handleAudioButton = () => {
    if (localMediaStatus.audio) disableLocalAudio();
    else enableLocalAudio();
  }

  const handleFinishCallButton = () => {
    history.replace('/');
    finishCall();
  }
  

  return (
    <div className="relative flex content-center justify-center space-x-3">
      { /* Volume Button */ }
      <Button classNames="h-9 my-auto bg-dark-tertiary text-white absolute left-3">
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
        </svg>

        <svg className="hidden w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Button>

      
      { /* Audio Button */ }
      <Button
        onClick={handleAudioButton}
        classNames={
          `${localMediaStatus.audio ? 'text-white' : 'text-gray-500'}
          h-9 my-auto bg-dark-tertiary hover:bg-dark-tertiary`
        }
      >
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
        </svg>
      </Button>
      
      { /* Finish Call Button */ }
      <Button
        onClick={handleFinishCallButton}
        classNames="h-10 bg-danger hover:bg-danger-dark text-white"
      >
        <svg className="w-6 h-6 rotate-135" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>

        <span className="hidden ml-2 text-lg">Sekva alvoko</span>
      </Button>

      { /* Video Button */ }
      <Button
        onClick={handleVideoButton}
        classNames={
          `${localMediaStatus.video ? 'text-white' : 'text-gray-500'}
          h-9 my-auto bg-dark-tertiary hover:bg-dark-tertiary`
        }
      >
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      </Button>


      { /* Expand Button */ }
      <Button classNames="h-9 my-auto bg-dark-tertiary hover:bg-dark-tertiary text-white absolute right-3">
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </Button>
    </div>
  );
}

export default CallControls;