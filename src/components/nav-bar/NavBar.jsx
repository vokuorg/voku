import React from 'react';
import Logo from '../logo/Logo';
import { Link } from "react-router-dom";
import BalloonButton from '../balloon-button/BalloonButton';

import './NavBar.css';
import '../../index.css';

function NavBar({ classNames }) {
  return (
    <div className={`flex justify-between py-3 ${classNames || ''}`}>
      <div className="flex space-x-10">
        <Link to="/">
          <Logo textColor="white" />
        </Link>

        <Link to="/call" 
          className="mt-auto text-2xl align-bottom text-gray-light hover:text-secondary" href="#">
          About
        </Link>

        <a className="mt-auto text-2xl text-gray-light hover:text-secondary" href="#">
          Donate
        </a>
        
        <a className="mt-auto text-2xl text-gray-light hover:text-secondary" href="https://github.com/videovoko/videovoko-org" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>

      <div className="space-x-5">
        <BalloonButton classNames="bg-trasparent text-white font-semibold roboto-font text-sm border-4 border-gray h-10 py-1"
          side="left" text="Sign In" />
        <BalloonButton classNames="bg-secondary text-white font-semibold roboto-font text-sm border-secondary h-10 py-1"
          side="right" text="Sign Up" />
      </div>
    </div>
  );
}

export default NavBar;