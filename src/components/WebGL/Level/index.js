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

    this.distance = 10;

    this.caster = new THREE.Raycaster();

    const boundingBoxOffset = 200;

    this.terrain.geometry.computeBoundingBox();
    this.boundingBoxHeight = ( this.terrain.geometry.boundingBox.max.z - this.terrain.geometry.boundingBox.min.z ) + boundingBoxOffset;

    this.boundingBoxGeometry = new THREE.BoxGeometry(
      this.terrain.geometry.parameters.width - 600,
      this.boundingBoxHeight,
      this.terrain.geometry.parameters.height - 600
    );
    this.boundingBoxMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe: true });

    this.boundingBox = new THREE.Mesh( this.boundingBoxGeometry, this.boundingBoxMaterial );
    this.boundingBox.position.y = ( this.terrain.geometry.boundingBox.max.z - this.terrain.geometry.boundingBox.min.z );
    this.add( this.boundingBox );

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
      const collisions = this.caster.intersectObjects( [ this.terrain, this.boundingBox ] );

      // And disable that direction if we do
      if ( collisions.length > 0 && collisions[ 0 ].distance <= this.distance ) {

        let directionVector = this.camera.getWorldDirection();

        TweenMax.to( this.camera.position, 1, {
          x: this.camera.position.x - directionVector.x * 80,
          y: this.camera.position.y - directionVector.y * 80,
          z: this.camera.position.z - directionVector.z * 80,
          ease: Back.easeOut
        });
      }
    }

  }

  killTweens() {

    TweenMax.killTweensOf( this.camera.position, {
      x: true,
      y: true,
      z: true
    });
  }

  /**
   * update function
   * @param {number} time  Elapsed time from three global clock
   * @param {number} delta Delta time from three global clock
   */
  update( time,
    delta ) {

    this.player.update( time, delta );
    this.checkCollisions();

  }
}

export default Level;