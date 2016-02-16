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
   */
  constructor( configuration ) {

    const { fov, aspect, near, far, position, target, orbitControls, firstPersonControls, lookSpeed, movementSpeed } = configuration.get('camera');

    super( fov, aspect, near, far );

    this.position.set( position.x, position.y, position.z );

    this.lookAt(target);

    this.directionalLight = Container.get('DirectionalLight');

    this.player = Container.get('Player');

    if( orbitControls ) {
      this.controls = new OrbitControls( this, configuration.get('canvas') );
    }

    if( firstPersonControls ) {
      this.controls = new FirstPersonControls(this);
      this.controls.lookSpeed = lookSpeed;
      this.controls.movementSpeed = movementSpeed;
    }

    this.bindEvents();
  }

  /**
   * BindEvents function
   */
  bindEvents() {
    Events.on( 'resize', ::this.resize );
  }

  /**
   * Resize function
   * @param {number} width  Width
   * @param {number} height Height
   */
  resize( width, height ) {
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }

  /**
   * Update function
   * @param {number} delta  Delta time from three global clock
   */
  update(delta) {
    this.controls.update( delta );

    this.directionalLight.move(this.position.clone());
    
    this.player.move(this.position.clone());
  }
}

export default Camera;