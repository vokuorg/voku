const generateId = () => {
  let abc = 'abcdefghijklmnopqrstuvwxyz';
  let id = '';
  
  for (let i = 0; i < 9; i++) {
    if (i === 4) id += '-';
    else id += abc[Math.ceil(Math.random() * 26) - 1];
  }

  return id;
};

const isValidId = (id) => {
  return /^[a-z]{4}-[a-z]{4}$/.test(id);
}

const setRoomId = (id) => {
  let pathname = window.location.pathname.slice(1);

  if (isValidId(pathname)) {
    window.history.replaceState(null, null, id);
  } else {
    window.location.pathname = id;
  }
};

const getRoomId = () => {
  let pathname = window.location.pathname.slice(1);

  if (isValidId(pathname)) return pathname;
  else return undefined;
};

export { generateId, isValidId, setRoomId, getRoomId };