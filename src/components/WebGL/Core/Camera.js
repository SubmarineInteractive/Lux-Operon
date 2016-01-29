import OrbitControls from '../Utils/OrbitControls';
import FirstPersonControls from '@fabienmotte/three-first-person-controls';
import Container from 'Container';
import { Events } from 'helpers';

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

    const { fov, aspect, near, far, position, target, orbitControls, firstPersonControls } = configuration.get('camera');

    super( fov, aspect, near, far );
    this.position.set( position.x, position.y, position.z );
    this.lookAt(target);

    if( orbitControls ) {
      this.controls = new OrbitControls( this, Container.get('Configuration').get('canvas') );
    }

    if( firstPersonControls ) {
      this.controls = new FirstPersonControls(this);
      this.controls.lookSpeed = 0.1;
      this.controls.movementSpeed = 100;
    }

    this.bindEvents();
  }

  /**
   * BindEvents function
   * @return {void}
   */
  bindEvents() {
    Events.on( 'resize', ::this.resize );
  }

  /**
   * Resize function
   * @param  {integer} width  Width
   * @param  {integer} height Height
   * @return {void}
   */
  resize( width, height ) {
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }

  update(delta) {
    this.controls.update( delta );
  }
}

export default Camera;