import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Isotype } from '../../assets/logo.svg';

import '../../index.css';

function Logo({ textColor, linkTo = '#' }) {
  return (
    <div className={ textColor === 'black' ? 'text-black' : 'text-white' }>
      <Link to={ linkTo }>
        <Isotype className="inline-block w-10 h-10 mr-3" />
        <span className="inline-block text-4xl tracking-wide align-middle alata-font">videovoko</span>
      </Link>
    </div>
  );
}

export default Logo;