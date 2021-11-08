import React, { useContext } from 'react';

import { AppContext } from '../../contexts/AppContext/AppContext';

import { ReactComponent as HomeIllustration } from '../../assets/home-illustration.svg';

import BalloonButton from '../../components/balloon-button/BalloonButton';
import NavBar from '../../components/nav-bar/NavBar';
import RoomModal from '../../components/modals/RoomModal';

function Home() {
  const {
    setCallLinkModalVisibility,
    isPeerSetted,
    destroyPeer,
    randomCall,
    stopLocalStream
  } = useContext(AppContext);

  const openRoomModal = () => {
    document.getElementById('roomModal').click();
  };

  const _randomCall = () => {
    setCallLinkModalVisibility(false);

    randomCall();
  }


  if (isPeerSetted()) {
    destroyPeer();
    //stopLocalStream();
  }

  
  return (
    <div className="flex flex-col w-full h-full px-3 md:h-screen md:px-24 bg-dark">
      <NavBar classNames="" />

      <div className="grid content-center justify-center h-full grid-cols-2 pt-3 md:pt-0">

        {/* Illustration */}
        <div className="flex justify-center order-1 w-full h-full col-span-2 mb-8 md:col-span-1 md:order-2 md:mb-0">
          <HomeIllustration className="object-none object-center w-3/5 h-full md:w-10/12" />
        </div>

        {/* Text and call to action*/}
        <div className="flex flex-col order-2 w-full h-auto col-span-2 md:col-span-1 md:order-1">
          
          <div className="flex flex-col w-full h-full md:justify-center">
            <h1 className="mb-3 text-2xl font-bold leading-snug text-center text-white md:text-left md:leading-snug md:text-5xl roboto-font">
              Speak Esperanto With Someone Around The World
              <font className="text-esperanto">.</font>
            </h1>
            
            <p className="text-lg leading-normal text-center md:text-left md:leading-normal md:w-9/12 md:text-2xl mb-7 text-gray-light roboto-font">
              <span className="hidden md:block">
                Be part of the hub of esperanto speakers and promote this beautiful language.
              </span>

              <span className="md:hidden">
              Be part of the hub of esperanto speakers.
              </span>
            </p>

            <div className="grid grid-cols-1 mt-3 md:mt-0 md:w-max md:grid-cols-2 md:space-x-5 md:justify-start">          
              <BalloonButton
                onClick={ openRoomModal }
                classNames="md:w-auto w-full text-2xl md:text-3xl text-white roboto-font font-medium bg-dark-tertiary hover:bg-gray border-dark-tertiary hover:border-gray"
                side="left"
                text="Call Friend"
              />

              <BalloonButton
                onClick={ _randomCall }
                classNames="md:w-auto my-3 md:my-0 w-full text-2xl md:text-3xl text-white roboto-font font-medium bg-esperanto hover:bg-esperanto-dark border-esperanto hover:border-esperanto-dark"
                side="right"
                text="Random Call"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden py-1 md:block">
        <p className="text-lg text-left text-gray-400 roboto-font">
          © 2021 videovoko
        </p>
      </div>

      <RoomModal id="roomModal" title="Call Friend" />
    </div>
  );
}

export default Home;