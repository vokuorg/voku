import React, { useContext, useState } from 'react';

import { AppContext } from '../../contexts/AppContext/AppContext';

import Modal from './Modal';
import Input from '../input/Input';
import Button from '../button/Button';

const RoomModal = ({ id, title }) => {
  const [roomId, setRoomId] = useState();
  const isValidId = !/^[a-z]{4}-[a-z]{4}$/.test(roomId);

  const { startRoom, joinRoom } = useContext(AppContext);


  const _startRoom = () => {
    startRoom('direct');
  };

  const _joinRoom = () => {
    joinRoom(roomId);
  };

  const handleInputChange = (e) => {
    let value = e.target.value;

    value = value.length === 4 && value.length > roomId.length ? `${value}-` : value;

    setRoomId(value);
  };


  return (
    <Modal id={ id } title={ title }>
      <div className="flex flex-col px-5 pb-5">
        <div classNames="text-center">
          <Button
            onClick={ _startRoom }
            classNames='h-10 px-20 text-xl bg-primary'
          >
            Start Room
          </Button>
        </div>

        <span className="py-6">Or join with ID:</span>

        <div className="space-x-1">
          <Input
            classNames="w-36 pl-5 text-xl focus:border-primary"
            type="text"
            maxLength="9"
            placeholder="aaaa-bbbb"
            value={ roomId }
            onChange={ handleInputChange }
          />

          <Button
            onClick={ _joinRoom }
            classNames='w-auto h-10 text-xl bg-secondary'
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
