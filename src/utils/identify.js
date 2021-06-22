const generateId = () => {
  let abc = 'abcdefghijklmnopqrstuvwxyz';
  let id = '';
  
  for (let i = 0; i < 9; i++) {
    if (i === 4) id += '-';
    else id += abc[Math.ceil(Math.random() * 26) - 1];
  }

  return id;
};

const setRoomId = (id) => {
  if (window.location.hash) {
    window.history.replaceState(null, null, `#${id}`);
  } else {
    window.location.hash = id;
  }
};

const getRoomId = () => {
  return window.location.hash.substr(1);
};

export { generateId, setRoomId, getRoomId };