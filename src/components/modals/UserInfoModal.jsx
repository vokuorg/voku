import React, { useContext, useState, useRef, useEffect } from 'react';

import { AppContext } from '../../contexts/AppContext/AppContext';

import Modal from './Modal';
import Input from '../input/Input';
import Button from '../button/Button';

const UserInfoModal = ({ id, title, onSubmit, initialVisibility }) => {
  const { myName, setMyName } = useContext(AppContext);

  const [name, setName] = useState(myName);

  useEffect(() => {
    document.querySelector(`#${id} input`).focus();
  });

  const handleInputChange = (e) => {
    let value = e.target.value;

    setName(value);
  };

  const handleKeyDown= (e) => {
    if (e.keyCode === 13) {
      //e.preventDefault();
      submitName();
    }
  };

  const submitName = () => {
    setMyName(name);
    
    onSubmit();

    document.getElementById(id).click();
  };


  return (
    <Modal
      id={ id }
      title={ title }
      initialVisibility={ initialVisibility }
    >
      <div className="flex flex-col px-5 pb-5">

        <p className="pb-5 text-xl">
          Set your name:
        </p>

        <div className="space-x-2">
          <Input
            classNames="w-2/4 text-xl focus:border-primary text-center"
            type="text"
            maxLength="20"
            placeholder={ myName }
            onChange={ handleInputChange }
            onKeyDown={ handleKeyDown }
            autoFocus
          />

          <Button
            onClick={ submitName }
            classNames='h-10 text-xl bg-primary hover:bg-primary-dark'
          >
            Continue
          </Button>
        </div>
        
      </div>
    </Modal>
  );
};

export default UserInfoModal;
