import React from 'react';
import { ReactComponent as HomeIllustration } from '../../assets/home-illustration.svg';
import BalloonButton from '../../components/balloon-button/BalloonButton';

function Home() {
  return (
    <div className = 'w-full h-screen overflow-hidden bg-dark'>
      <div className = 'container flex flex-row justify-center pl-12'>
        <div className = 'flex flex-col justify-center w-1/2 h-screen'>
          <div className = 'flex flex-col justify-center h-full'> 
            <h1 className = 'mb-4 text-5xl font-bold leading-snug text-left text-white roboto-font'>Speak Esperanto With Someone Around The World<font className = 'color-primary'>.</font></h1>
            <p className = 'w-9/12 mb-6 text-2xl leading-normal text-left text-gray-400 roboto-font'>Be part of the hub of Esperanto speakers and promote this beautiful language.</p>
            <div className = 'flex justify-start space-x-5'>
              <BalloonButton
                classNames = 'text-3xl text-white roboto-font font-medium bg-primary border-primary'
                side = 'left'
                text = 'Random Call'
              />
              <BalloonButton
                classNames = 'text-3xl text-white roboto-font font-medium bg-secondary border-secondary'
                side = 'right'
                text = 'Call Friend'
              />
            </div>
          </div>
          <p className = 'mb-8 text-xl leading-normal text-left text-gray-400 roboto-font'>© 2021 videovoko</p>
        </div>
        <div className = 'flex flex-col justify-center w-1/2 h-screen p-5'>
          <HomeIllustration className = 'w-full h-full'/>
        </div>
      </div>
    </div>
  );
}

export default Home;