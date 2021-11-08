import React, { useState } from 'react';
import Logo from '../logo/Logo';
import { Link } from "react-router-dom";
import BalloonButton from '../balloon-button/BalloonButton';

import '../../index.css';

function NavBar({ classNames }) {
  const [menuVisibility, setMenuVisibility] = useState(false);

  const handleMenuVisibility = () => {
    setMenuVisibility(prev => !prev);
  };

  return (
    <div className={ `flex justify-between py-3 ${classNames || ''}` }>
      <div className="flex items-end">
        <Logo textColor="white" linkTo="/" />

        <div className="hidden space-x-10 md:block">
          <Link to="/call" 
            className="hidden mt-auto text-2xl text-gray-light hover:text-secondary" href="#">
            About
          </Link>

          <a
            href="https://github.com/videovoko/videovoko-org/"
            className="mt-auto text-2xl text-gray-light hover:text-secondary"
            target="_blank" rel="noopener noreferrer"
          >
            Donate
          </a>
          
          <a
            href="https://github.com/videovoko/videovoko-org/"
            className="mt-auto text-2xl text-gray-light hover:text-secondary" href="https://github.com/videovoko/videovoko-org"
            target="_blank" rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="hidden space-x-5">
        <BalloonButton classNames="bg-trasparent text-white font-semibold roboto-font text-sm border-4 border-gray h-10 py-1"
          side="left" text="Sign In" />
        <BalloonButton classNames="bg-secondary text-white font-semibold roboto-font text-sm border-secondary h-10 py-1"
          side="right" text="Sign Up" />
      </div>

      { /* Open mobile menu button */ }
      <button
        onClick={ handleMenuVisibility }
        className="block md:hidden focus:outline-none"
      >
        <svg
          className="text-white w-7 h-7"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      { /* Mobile Menu */ }
      <div
        className={
          "fixed top-0 flex flex-col justify-center left-0 z-10 w-screen h-screen pt-4 bg-dark-secondary" +
          (menuVisibility ? " block" : " hidden")
        }
      >
        { /* Header with close button */ }
        <div className="flex justify-end pr-3 mb-10">
          <button onClick={ handleMenuVisibility } className="focus:outline-none">
            <svg
              className="text-white w-7 h-7" 
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        { /* Menu items */ }
        <div className="flex flex-col h-full">
          <div className="flex flex-col">

            <Link to="/about" 
              onClick={ handleMenuVisibility }
              className="hidden mb-6 text-3xl text-gray-ligh" href="#">
              About
            </Link>

            <a
              onClick={ handleMenuVisibility }
              href="https://github.com/videovoko/videovoko-org/"
              className="mb-6 text-3xl text-gray-light"
              target="_blank" rel="noopener noreferrer"
            >
              Donate
            </a>
            
            <a
              onClick={ handleMenuVisibility }
              href="https://github.com/videovoko/videovoko-org/"
              className="text-3xl text-gray-light" href="https://github.com/videovoko/videovoko-org"
              target="_blank" rel="noopener noreferrer"
            >
              GitHub
            </a>

          </div>

          <div className="flex items-end justify-center h-full">
            <p className="text-lg text-left text-gray-400 roboto-font">
              © 2021 videovoko
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default NavBar;