import Container from 'Container';

/**
 * Level class
 */
class Level extends THREE.Object3D {

  /**
   * Constructor function
   * @param {Terrain}     Terrain instance
   * @param {BoundingBox} BoundingBox instance
   * @param {Player}      Player instance
   */
  constructor( Terrain, BoundingBox, Player ) {

    super();

    this.player = Player;
    this.terrain = Terrain;
    this.camera = Container.get( 'Camera' );

    this.isTweening = false;

    this.add( this.terrain );
    this.add( this.player );

    this.rays = {
      right: new THREE.Vector3( 0, 0, -1 ),
      left: new THREE.Vector3( 0, 0, 1 ),
      down: new THREE.Vector3( 0, 1, 0 ),
      up: new THREE.Vector3( 0, -1, 0 ),
      front: new THREE.Vector3( 1, 0, 0 ),
      back: new THREE.Vector3( -1, 0, 0 )
    };

    this.distance = 30;

    this.caster = new THREE.Raycaster();

    this.cube = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00ffff }) );
    this.cube.position.set( 200, 900, 0 );
    this.add( this.cube );

    this.boundingBox = BoundingBox;
    this.boundingBox.position.y = ( this.terrain.geometry.boundingBox.max.z - this.terrain.geometry.boundingBox.min.z );

    this.add( this.boundingBox );

  }

  /**
   * checkCollisions function
   * Check player collisions and disable direction accordingly
   * @todo Check collisions on mouseMove only
   */
  checkCollisions() {

    // We reset the raycaster to this direction
    this.caster.set( this.player.position, this.camera.getWorldDirection() );

    // Test if we intersect with any obstacle mesh
    const collisions = this.caster.intersectObjects( [ this.terrain, this.boundingBox, this.cube ] );

    // And disable that direction if we do
    if ( collisions.length > 0 && collisions[ 0 ].distance <= this.distance ) {

      this.isTweening = true;

      let directionVector = this.camera.getWorldDirection();

      // if( rayDirection === 'back' ) {
      //
      //   TweenMax.to( this.camera.position, 0.4, {
      //     x: this.camera.position.y + directionVector.y * 500,
      //     y: this.camera.position.y + directionVector.y * 500,
      //     z: this.camera.position.z + directionVector.z * 500,
      //     ease: Expo.easeOut,
      //     onComplete: () => {
      //       this.isTweening = false;
      //     }
      //   });
      //
      // } else {
      TweenMax.to( this.camera.position, 0.8, {
        x: this.camera.position.x - directionVector.x * 400,
        y: this.camera.position.y - directionVector.y * 400,
        z: this.camera.position.z - directionVector.z * 400,
        ease: Expo.easeOut,
        onComplete: () => {
          this.isTweening = false;
        }
      });
      // }

    }

  }

  /**
   * update function
   * @param {number} time  Elapsed time from three global clock
   * @param {number} delta Delta time from three global clock
   */
  update( time, delta ) {

    if( this.isTweening ) {
      this.checkCollisions();
    }

    this.player.update( time, delta );
    this.checkCollisions();

  }
}

export default Level;