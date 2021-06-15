import {
  SET_MY_STREAM,
  SET_GUEST_STREAM,
  SET_MY_INFO,
  SET_GUEST_INFO,
  SET_MY_VIDEO,
  SET_GUEST_VIDEO,
  SET_MY_AUDIO,
  SET_GUEST_AUDIO,
  ADD_MESSAGE
} from '../actions';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MY_STREAM:
      return {
        ...state,
        me: { ...state.me, stream: payload }
      };
    case SET_GUEST_STREAM:
      return {
        ...state,
        guest: { ...state.guest, stream: payload }
      };
    case SET_MY_INFO:
      return {
        ...state,
        me: { ...state.me, ...payload } 
      };
    case SET_GUEST_INFO:
      return {
        ...state,
        guest: { ...state.guest, ...payload } 
      };
    case SET_MY_VIDEO:
      return {
        ...state,
        me: { ...state.me, video: payload } 
      };
    case SET_GUEST_VIDEO:
      return {
        ...state,
        guest: { ...state.guest, video: payload } 
      };
    case SET_MY_AUDIO:
      return {
        ...state,
        me: { ...state.me, audio: payload } 
      };
    case SET_GUEST_AUDIO:
      return {
        ...state,
        guest: { ...state.guest, audio: payload } 
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload]
      };
    default:
      return state;
  }
}