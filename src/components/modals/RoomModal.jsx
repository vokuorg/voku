import React, { useContext, useState } from 'react';

import { AppContext } from '../../contexts/AppContext/AppContext';

import Modal from './Modal';
import Input from '../input/Input';
import Button from '../button/Button';

const RoomModal = ({ id, title }) => {
  const [roomId, setRoomId] = useState();
  const isValidId = !/^[a-z]{4}-[a-z]{4}$/.test(roomId);

  const {
    setCallLinkModalVisibility,
    startRoom,
    joinRoom
  } = useContext(AppContext);


  const _startRoom = () => {
    setCallLinkModalVisibility(true);
    
    startRoom('direct');
  };

  const _joinRoom = () => {
    setCallLinkModalVisibility(false);
    
    joinRoom(roomId);
  };

  const handleInputChange = (e) => {
    let value = e.target.value;

    value = value.length === 4 && value.length > roomId.length ? `${value}-` : value;

    setRoomId(value);
  };


  return (
    <Modal id={ id } title={ title }>
      <div className="flex flex-col w-auto px-5 pb-5">
        <div classNames="text-center">
          <Button
            onClick={ _startRoom }
            classNames='h-10 w-full md:w-72 justify-center text-xl bg-primary hover:bg-primary-dark'
          >
            Start Room
          </Button>
        </div>

        <span className="py-6">Or join with ID:</span>

        <div className="flex justify-center">
          <Input
            classNames="w-full text-center md:w-36 md:mb-0 mb-2 mr-2 block text-xl focus:border-primary md:col-span-1 col-span-2"
            type="text"
            maxLength="9"
            placeholder="abcd-wxyz"
            value={ roomId }
            onChange={ handleInputChange }
          />

          <Button
            onClick={ _joinRoom }
            classNames='w-full justify-center md:w-36 h-10 block text-xl bg-secondary md:col-span-1 col-span-2 hover:bg-secondary-dark'
            disabled={ isValidId }
          >
            Join Room
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RoomModal;
