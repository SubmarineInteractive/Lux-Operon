import OrbitControls from './Utils/OrbitControls'
import { Events } from 'helpers'

/**
 * Camera class
 */
class Camera extends THREE.PerspectiveCamera {

  /**
   * Constructor function
   * @param  {object} configuration Configuration
   * @return {void}
   */
  constructor( configuration ) {

    const { fov, aspect, near, far, position, target, orbitControls } = configuration.get('camera')

    super( fov, aspect, near, far )
    this.position.set( position.x, position.y, position.z )
    this.lookAt(target)

    if( orbitControls ) {
      this.controls = new OrbitControls( this, document.querySelector( '#container canvas' ) )
      this.controls.enableZoom = false
    }

    this.bindEvents()
  }

  /**
   * BindEvents function
   * @return {void}
   */
  bindEvents() {
    Events.on( 'resize', ::this.resize )
  }

  /**
   * Resize function
   * @param  {integer} width  Width
   * @param  {integer} height Height
   * @return {void}
   */
  resize( width, height ) {
    this.aspect = width / height
    this.updateProjectionMatrix()
  }
}

export default Camera