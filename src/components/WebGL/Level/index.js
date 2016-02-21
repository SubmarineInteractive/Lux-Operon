import Container from 'Container';

/**
 * Level class
 */
class Level extends THREE.Object3D {

  /**
   * Constructor function
   * @param {Terrain} Terrain instance
   * @param {Player}  Player instance
   */
  constructor( Terrain, Player ) {

    super();

    this.player = Player;
    this.terrain = Terrain;
    this.camera = Container.get( 'Camera' );

    this.add( this.terrain );
    this.add( this.player );

    this.rays = [
      new THREE.Vector3( 0, 1, 0 ),  // Up
      new THREE.Vector3( 0, -1, 0 ), // Down
      new THREE.Vector3( -1, 0, 0 ), // Left
      new THREE.Vector3( 1, 0, 0 ),  // Right
      new THREE.Vector3( 0, 0, 1 ),  // Front
      new THREE.Vector3( 0, 1, -1 )  // Back
    ];

    this.distance = 15;

    this.caster = new THREE.Raycaster();

  }

  /**
   * checkCollisions function
   * Check player collisions and disable direction accordingly
   */
  checkCollisions() {

    for ( let i = 0; i < this.rays.length; i++ ) {

      // We reset the raycaster to this direction
      this.caster.set( this.player.position, this.rays[ i ] );

      // Test if we intersect with any obstacle mesh
      const collisions = this.caster.intersectObjects( [ this.terrain ] );

      // And disable that direction if we do
      if ( collisions.length > 0 && collisions[ 0 ].distance <= this.distance ) {

        let directionVector = this.camera.getWorldDirection();

        directionVector = Object.keys( directionVector ).map( axis => directionVector[ axis ].toFixed( 2 ) );

        console.log( 'BOOOOOOOMM BOOOOOOM', i, directionVector );
      }
    }

  }

  /**
   * update function
   * @param {number} time  Elapsed time from three global clock
   * @param {number} delta Delta time from three global clock
   */
  update( time, delta ) {

    this.player.update( time, delta );
    this.checkCollisions();

  }
}

export default Level;