import OrbitControls from '../Utils/OrbitControls';
import NicePersonControls from './NicePersonControls';
import Container from 'Container';
import { Events } from 'helpers';

/**
 * Camera class
 */
class Camera extends THREE.PerspectiveCamera {

  /**
   * Constructor function
   * @param {object} onfiguration Configuration
   * @param {Renderer} Renderer Renderer
   */
  constructor( Configuration, Renderer ) {

    const { fov, aspect, near, far, position, target, orbitControls, firstPersonControls, lookSpeed, movementSpeed } = Configuration.get( 'camera' );

    super( fov, aspect, near, far );

    // this.position.set( position.x, position.y, position.z );

    // this.lookAt( target );

    this.directionalLight = Container.get( 'DirectionalLight' );

    this.player = Container.get( 'Player' );


    if( orbitControls ) {
      this.controls = new OrbitControls( this, Configuration.get( 'canvas' ) );
    }

    if( firstPersonControls ) {
      this.controls = new NicePersonControls( this, this.player );
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
   * @param {number} delta Delta time from three global clock
   */
  update( delta ) {

    this.controls.update( delta );

    this.directionalLight.move( this.controls.getObject().position.clone() );

    this.player.move( this.controls.getObject().position.clone() );
    this.player.rotate( this.controls.getObject().rotation.clone() );

        // console.log('cam : ', this.position, 'shpereBody : ', this.controls.getObject().position);
  }
}

export default Camera;