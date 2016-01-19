import { Events } from 'helpers'

/**
 * Renderer class
 */
class Renderer extends THREE.WebGLRenderer {

  /**
   * Constructor function
   * @param  {object} options Options
   * @return {void}
   */
  constructor( options = { antialias: true, alpha: true } ) {
    super( options )
    this.setClearColor( 0xFFFFFF, 0 )
    this.setPixelRatio( window.devicePixelRatio )
    this.clear()

    // Resize listener
    Events.on( 'resize', ::this.resize )
  }

  /**
   * Resize function
   * @param  {integer} width  Width
   * @param  {integer} height Height
   * @return {void}
   */
  resize( width, height ) {
    this.setSize( width, height, false)
  }
}

export default Renderer