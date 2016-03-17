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
    this.gui = Container.get( 'GUI' );

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
    this.player.add( this.cube );

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

    const destination = this.camera.controls.target.clone().normalize();


    const targetPosition = new THREE.Vector3(
      this.player.position.x + Math.abs(destination.x * 10),
      this.player.position.y + Math.abs(destination.y * 1),
      this.player.position.z + Math.abs(destination.z * 10) * -1
    );

    this.caster.set( this.camera.position, destination.normalize() );

    /**
     * Checking Collisions
     */
    const collisions = this.caster.intersectObjects( [ this.terrain, this.cube ] );

    // And disable that direction if we do
    if ( collisions.length > 0 && collisions[ 0 ].distance <= this.distance ) {

      this.isTweening = true;

      TweenMax.to( this.camera.position, 0.8, {
        x: this.camera.position.x - this.camera.controls.target.normalize().x * 200,
        y: this.camera.position.y - this.camera.controls.target.normalize().y * 200,
        z: this.camera.position.z - this.camera.controls.target.normalize().z * 200,
        ease: Expo.easeOut,
        onComplete: () => {
          this.isTweening = false;
        }
      });

    }

  }

  /**
   * update function
   * @param {number} time  Elapsed time from three global clock
   * @param {number} delta Delta time from three global clock
   */
  update( time, delta ) {

    this.player.update( time, delta );
    // this.checkCollisions();

  }
}

export default Level;