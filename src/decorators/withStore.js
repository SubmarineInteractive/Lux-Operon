import observeStore from 'helpers/observeStore';
import { store } from 'store';

/**
 * Bind decorator
 * @param  {Object} methods Methods to bind
 * @return {function}       Wrapped class
 */
function bind( methods ) {

  return WrappedClass =>
    class extends WrappedClass {
      constructor( ...args ) {

        super( ...args );

        for ( let method in methods ) {
          if ( methods.hasOwnProperty( method ) ) {
            observeStore( store, methods[ method ], state => this[ method ]( state ) );
          }
        }
      }
    };
}

export default bind;