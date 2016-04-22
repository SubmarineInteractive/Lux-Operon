// Action types
const LOAD = 'resources/LOAD';
const UPDATE_LOADING_PROGRESS = 'resources/UPDATE_LOADING_PROGRESS';

const initialState = {
  loading: true,
  progress: 0,
  resources: {}
};

// Reducer
export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case LOAD:
      return {
        ...state,
        loading: false,
        resources: action.resources
      };
    case UPDATE_LOADING_PROGRESS:
      return {
        ...state,
        progress: action.progress
      };
    default:
      return state;
  }
}

// Action creators
export function loadResources( resources ) {

  return {
    type: LOAD,
    resources
  };
}

export function updateLoadingProgress( progress ) {

  return {
    type: UPDATE_LOADING_PROGRESS,
    progress
  };
}