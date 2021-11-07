import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Isotype } from '../../assets/logo.svg';

import '../../index.css';

function Logo({ textColor, linkTo = '#' }) {
  return (
    <div className={ textColor === 'black' ? 'text-black' : 'text-white' }>
      <Link to={ linkTo }>
        <Isotype className="inline-block w-8 h-8 mr-3 md:w-10 md:h-10" />
        <span className="inline-block text-3xl tracking-wide align-middle md:text-4xl alata-font">videovoko</span>
      </Link>
    </div>
  );
}

export default Logo;