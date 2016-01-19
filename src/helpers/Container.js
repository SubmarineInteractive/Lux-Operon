import Bottle from 'bottlejs'
import dependencies  from '../config/dependencies'

/**
 * Container class
 */
class Container extends Bottle {

  /**
   * Constructor function
   * @param  {object} dependencies Dependencies
   * @return {void}
   */
  constructor( dependencies = {} ) {
    super()
    this.register( dependencies )
  }

  /**
   * Register function
   * @param  {object} dependencies Dependencies
   * @return {void}
   */
  register( dependencies ) {

    dependencies.forEach(( dependency ) => {

      switch ( dependency.type ) {
        case 'factory':
        case 'value':
        case 'constant':
          this[ dependency.type ]( dependency.name, dependency.value )
          break
        case 'service':
          this[ dependency.type ].apply( this, [ dependency.name, dependency.constructor, ...dependency.dependencies || [] ] )
          break
        default:
          return false
      }
    })
  }

  /**
   * GetSingleton function
   * @param  {string} service Service name
   * @return {object}         Service
   */
  get( service ) {
    return this.container[ service ]
  }
}

export default new Container( dependencies )