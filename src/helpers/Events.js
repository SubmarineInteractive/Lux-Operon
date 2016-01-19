import Minivents from 'minivents'
import { on } from 'dom-events'

/**
 * Events class
 */
class Events extends Minivents {

  /**
   * Constructor function
   * @return {void}
   */
  constructor() {
    super()

    this.bindEvents()
  }

  /**
   * BindEvents function
   * @return {void}
   */
  bindEvents() {

    // Resize listener
    on( window, 'resize', () => {
      this.emit( 'resize', window.innerWidth, window.innerHeight )
    })
  }
}

export default new Events()