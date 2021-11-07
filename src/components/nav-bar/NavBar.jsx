import React from 'react';
import Logo from '../logo/Logo';
import { Link } from "react-router-dom";
import BalloonButton from '../balloon-button/BalloonButton';

import '../../index.css';

function NavBar({ classNames }) {
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
    </div>
  );
}

export default NavBar;