import config from '../config'
import get from 'lodash.get'
import set from 'lodash.set'

/**
 * Configuration class
 */
class Configuration {

  constructor() {

  }

  get( value ) {
    return get( config, value )
  }

  set( index, value ) {
    return set( config, index, value )
  }
}

export default Configuration