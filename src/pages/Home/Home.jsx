import React, { useContext } from 'react';

import { AppContext } from '../../contexts/AppContext/AppContext';

import { ReactComponent as HomeIllustration } from '../../assets/home-illustration.svg';

import BalloonButton from '../../components/balloon-button/BalloonButton';
import NavBar from '../../components/nav-bar/NavBar';
import RoomModal from '../../components/modals/RoomModal';

function Home() {
  const {
    isPeerSetted,
    destroyPeer,
    randomCall,
    stopLocalStream
  } = useContext(AppContext);

  const openRoomModal = () => {
    document.getElementById('roomModal').click();
  };

  const _randomCall = () => {
    randomCall();
  }


  if (isPeerSetted()) {
    destroyPeer();
    stopLocalStream();
  }

  
  return (
    <div className="flex flex-col w-full h-screen px-20 bg-dark">
      <NavBar classNames="" />

      <div className="grid justify-center h-full grid-cols-2">

        {/* Text and call to action*/}
        <div className="flex flex-col content-center w-full h-auto col-span-1">
          
          <div className="flex flex-col justify-center w-full h-full">
            <h1 className="mb-3 text-5xl font-bold leading-snug text-left text-white roboto-font">Speak Esperanto With
              Someone Around The World<font className="text-primary">.</font>
            </h1>
            
            <p className="w-9/12 text-2xl leading-normal text-left mb-7 text-gray-light roboto-font">Be part of the hub of
              Esperanto speakers and promote this beautiful language.
            </p>

            <div className="flex justify-start space-x-5">
              <BalloonButton onClick={ _randomCall } classNames="text-3xl text-white roboto-font font-medium bg-esperanto border-esperanto"
                side="left" text="Random Call" />
                
              <BalloonButton onClick={ openRoomModal } classNames="text-3xl text-white roboto-font font-medium bg-dark-tertiary border-dark-tertiary"
                side="right" text="Call Friend" />
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex justify-center w-full h-full col-span-1">
          <HomeIllustration className="h-full" />
        </div>
      </div>

      <div className="py-1">
        <p className="text-lg text-left text-gray-400 roboto-font">
          © 2021 videovoko
        </p>
      </div>

      <RoomModal id="roomModal" title="Call Friend" />
    </div>
  );
}

export default Home;