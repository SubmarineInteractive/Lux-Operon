import config from '../config';
import get from 'lodash.get';
import set from 'lodash.set';

/**
 * Configuration class
 */
class Configuration {

  /**
   * Get function
   * @param  {string}               index Index
   * @return {number|string|Object}       Value
   */
  get( index ) {
    return get( config, index );
  }

  /**
   * Set function
   * @param  {string}                index Index
   * @param  {number|string|Object}  value Value
   * @return {number|string|Object}        Value
   */
  set( index, value ) {
    return set( config, index, value );
  }
}

export default Configuration;