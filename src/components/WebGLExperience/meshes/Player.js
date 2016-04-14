import Cannon from 'cannon';
import PointLight from '../lights/PointLight';
import { randomInt } from 'utils';

/**
 * Player class
 * @param {Configuration} Configuration Configuration
 * @param {World} World instance
 */
class Player extends THREE.Object3D {

  /**
   * constructor function
   * @param {World}  World         World instance
   * @param {Object} configuration Configuration
   */
  constructor( World, configuration ) {

    super();

    this.world = World;

    this.configuration = configuration.pointLights;
    this.lights = [];
    this.nbLights = this.configuration.number;

    this.createSphere();
    this.initLights();

  }

  /**
   * createSphere function
   */
  createSphere() {

    // Create a sphere
    const sphereShape = new Cannon.Sphere( 10 );
    this.sphereBody = new Cannon.Body({ mass: 300 });
    this.sphereBody.addShape( sphereShape );
    this.sphereBody.linearDamping = 0.9;
    this.sphereBody.position.x = 500;
    this.sphereBody.position.y = 1500;
    this.world.add( this.sphereBody );

    const geometry = new THREE.SphereGeometry( 10, 10, 10 );
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true });
    this.sphere = new THREE.Mesh( geometry, material );
    // this.add( this.sphere );
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
   * Move the player where the camera is
   * @param {object} newPos Position vector of the camera
   */
  move( newPos ) {

    this.position.copy( newPos );
  }

  /**
   * rotate function
   * Rotate the player where the camera is
   * @param {object} newRotation Rotation vector of the camera
   */
  rotate( newRotation ) {

    this.sphere.quaternion.setFromEuler( newRotation );
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