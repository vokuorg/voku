import React from 'react';
import Logo from '../logo/Logo';
import BalloonButton from '../balloon-button/BalloonButton';

import './NavBar.css';
import '../../index.css';

function NavBar( {classNames} ) {
    return (
        <div className = { `${classNames}` }>
            <div className = 'flex inline-block'>
                <div className = 'pt-2 pr-4'>
                    <Logo textColor = 'white' />
                </div>
                <a href="http://localhost:3000/"
                    className = 'flex-1 inline-block p-4 text-2xl text-gray-light'>
                    About
                </a>
                <a href="http://localhost:3000/"
                    className = 'flex-1 inline-block p-4 text-2xl text-gray-light'>
                    Donate
                </a>
                <a href="https://github.com/videovoko/videovoko-org"
                    target = "_blank"
                    rel = "noopener noreferrer"
                    className = 'flex-1 inline-block p-4 text-2xl text-gray-light'>
                    GitHub
                </a>
            </div>
            <div className = 'flex inline-block pr-3 mr-32 space-x-5'>
                <BalloonButton
                    classNames = 'bg-trasparent text-white roboto-font text-sm border-4 border-gray h-10 py-1 mt-2'
                    side = "left"
                    text = "Sign In"
                />
                <BalloonButton
                    classNames = 'bg-secondary text-white roboto-font text-sm border-secondary h-10 py-1 mt-2'
                    side = "right"
                    text = "Sign Up"
                />
            </div>
        </div>
    );
}

export default NavBar;