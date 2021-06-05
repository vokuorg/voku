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
                    className = 'inline-block p-4 flex-1 text-gray-400 text-2xl'>
                    About
                </a>
                <a href="http://localhost:3000/"
                    className = 'inline-block p-4 flex-1 text-gray-400 text-2xl'>
                    Donate
                </a>
                <a href="https://github.com/videovoko/videovoko-org"
                    target = "_blank"
                    rel = "noopener noreferrer"
                    className = 'inline-block p-4 flex-1 text-gray-400 text-2xl'>
                    GitHub
                </a>
            </div>
            <div className = 'flex mr-32 inline-block space-x-5 pr-3'>
                <BalloonButton
                    classNames = 'bg-trasparent text-white roboto-font text-sm border-4 border-secondary h-10 py-1 mt-2'
                    side = "left"
                    text = "Sign In"
                />
                <BalloonButton
                    classNames = 'bg-tertiary text-white roboto-font text-sm border-tertiary h-10 py-1 mt-2'
                    side = "right"
                    text = "Sign Up"
                />
            </div>
        </div>
    );
}

export default NavBar;