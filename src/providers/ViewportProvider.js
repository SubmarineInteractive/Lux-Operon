// Action types
const RESIZE = 'viewport/RESIZE';

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Reducer
export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESIZE:
      return {
        ...state,
        width: action.width,
        height: action.height
      };
    default:
      return state;
  }
}

// Action creators
export function resize( width, height ) {

  return {
    type: RESIZE,
    meta: {
      debounce: {
        time: 100
      }
    },
    width,
    height
  };
}