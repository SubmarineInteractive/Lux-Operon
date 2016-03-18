import Cannon from 'cannon';
import PointLight from '../Light/PointLight';
import randomInt from 'utils/random-int';

/**
 * Player class
 * @param {Configuration} Configuration Configuration
 * @param {World} World instance
 */
class Player extends THREE.Object3D {

  /**
   * constructor function
   */
  constructor( Configuration, World ) {

    super();

    this.world = World;

    this.configuration = Configuration.get( 'player.pointLights' );
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
    this.sphereBody = new Cannon.Body({ mass: 5 });
    this.sphereBody.addShape( sphereShape );
    this.sphereBody.linearDamping = 0.9;
    this.world.add( this.sphereBody );

    const geometry = new THREE.SphereGeometry( 100, 10, 10 );
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true });
    this.sphere = new THREE.Mesh( geometry, material );
    this.add( this.sphere );

    this.sphereBody.addEventListener( 'collide', e => {
      console.log('COLLISION', e.contact.bi.shapes[0], e.contact.bj.shapes[0]);

      // var contact = e.contact;
      //
      // // contact.bi and contact.bj are the colliding bodies, and contact.ni is the collision normal.
      // // We do not yet know which one is which! Let's check.
      // if(contact.bi.id == cannonBody.id)  // bi is the player body, flip the contact normal
      //     contact.ni.negate(contactNormal);
      // else
      //     contactNormal.copy(contact.ni); // bi is something else. Keep the normal as it is
      //
      // // If contactNormal.dot(upAxis) is between 0 and 1, we know that the contact normal is somewhat in the up direction.
      // if(contactNormal.dot(upAxis) > 0.5) // Use a "good" threshold value between 0 and 1 here!
      //     canJump = true;
    });
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

    this.world.update();
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