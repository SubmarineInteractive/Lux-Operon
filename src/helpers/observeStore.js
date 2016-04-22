import shallowEqual from 'recompose/shallowEqual';

/**
 * ObserveStore function
 * @param  {object} store      Store
 * @param  {function} select   Selector
 * @param  {function} onChange Callback called when a store change occurs
 * @return {function}          Unsubscribe
 */
function observeStore( store, select, onChange ) {

  let currentState = select( store.getState() );

  function handleChange() {

    let nextState = select( store.getState() );
    if ( ! shallowEqual( nextState, currentState ) ) {
      currentState = nextState;
      onChange( currentState );
    }
  }

  onChange( currentState );
  let unsubscribe = store.subscribe( handleChange );
  return unsubscribe;
}

export default observeStore;