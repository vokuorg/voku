import React, { useContext } from 'react';

import { getRoomId } from '../../utils/identify'

import { AppContext } from '../../contexts/AppContext/AppContext';

import SecondaryModal from './SecondaryModal';
import CopyableBadge from '../copyable-badge/CopyableBadge';

const CallLinkModal = ({ id, classNames }) => {
  const {
    setCallLinkModalVisibility
  } = useContext(AppContext);

  return (
    <SecondaryModal
      id={ id }
      title={ 'Invite a friend' }
      classNames={ classNames }
      initialVisibility={ true }
      onClose={ () => setCallLinkModalVisibility(false) }
    >
      <div className="flex flex-col px-5 pb-5">

        <p className="mb-3 text-xl">
          Share this call link to your friend:
        </p>
        
        <CopyableBadge
          classNames="mx-auto"
          text={ `${ window.location.origin }/#${ getRoomId() }` }
        />
      </div>
    </SecondaryModal>
  );
};

export default CallLinkModal;
