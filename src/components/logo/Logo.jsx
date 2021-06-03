import React from 'react';
import { ReactComponent as Isotype } from '../../assets/logo.svg';

import '../../index.css';
import './Logo.css';

function Logo({ textColor }) {
  return (
    <div className={ textColor === 'black' ? 'text-black' : 'text-white' }>
      <Isotype className="inline-block w-10 h-10 mr-3" />
      <span className="inline-block text-4xl tracking-wide align-middle">videovoko</span>
    </div>
  );
}

export default Logo;