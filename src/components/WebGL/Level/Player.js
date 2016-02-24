import PointLight from '../Light/PointLight';
import randomInt from 'utils/random-int';

/**
 * Player class
 * @param {Configuration} Configuration Configuration
 */
class Player extends THREE.Object3D {

  /**
   * constructor function
   */
  constructor( Configuration ) {

    super();

    this.configuration = Configuration.get( 'player.pointLights' );

    this.lights = [];
    this.nbLights = this.configuration.number;

    this.initLights();
  }

  /**
   * initLights function
   */
  initLights() {

    for ( let i = 0; i < this.nbLights; i++ ) {

      const plight = new PointLight({
        hex: parseInt( this.configuration.colors[ randomInt( 0, this.configuration.colors.length - 1 ) ], 16 ),
        intensity: this.configuration.intensity,
        distance: this.configuration.distance,
        decay: this.configuration.decay
      });

      plight.addSphere();

      this.lights.push( plight );

      this.add( plight );
    }
  }

  /**
   * move function
   * Move the light where the camera is
   * @param {object} newPos Position vector of the camera
   */
  move( newPos ) {

    this.position.copy( newPos );
  }

  /**
   * rotate function
   * Move the light where the camera is
   * @param {object} newRotation Rotation vector of the camera
   */
  rotate( newRotation ) {

    this.rotation.copy( newRotation );
  }

  /**
   * update function
   * @param {number} time  Elapsed time from three global clock
   * @param {number} delta Delta time from three global clock
   */
  update( time, delta ) {

    for ( let i = 0; i < this.nbLights; i++ ) {
      this.updateLight( this.lights[ i ], time, delta );
    }
  }

  /**
   * updateLight function
   * @param {Light} light Light to update
   * @param {time} time   Elapsed time from three global clock
   */
  updateLight( light, time ) {

    const gOption = light.gravitationOptions;
    light.position.x = Math.sin( gOption.x.velocity * time + gOption.x.offset ) * gOption.x.distance;
    light.position.y = Math.sin( gOption.y.velocity * time + gOption.y.offset ) * gOption.y.distance;
    light.position.z = Math.cos( gOption.z.velocity * time + gOption.z.offset ) * gOption.z.distance;
  }
}

export default Player;