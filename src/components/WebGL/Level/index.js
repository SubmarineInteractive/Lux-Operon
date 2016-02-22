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
      up: new THREE.Vector3( 0, 1, 0 ),
      down: new THREE.Vector3( 0, -1, 0 ),
      left: new THREE.Vector3( -1, 0, 0 ),
      right: new THREE.Vector3( 1, 0, 0 ),
      front: new THREE.Vector3( 0, 0, 1 ),
      back: new THREE.Vector3( 0, 0, -1 )
    }


    this.distance = 20;

    this.caster = new THREE.Raycaster();

    this.boundingBox = BoundingBox;
    this.boundingBox.position.y = ( this.terrain.geometry.boundingBox.max.z - this.terrain.geometry.boundingBox.min.z );

    this.add( this.boundingBox );

  }

  /**
   * checkCollisions function
   * Check player collisions and disable direction accordingly
   */
  checkCollisions() {
    for ( let rayDirection in this.rays) {
      const ray = this.rays[rayDirection];

      // We reset the raycaster to this direction
      this.caster.set( this.player.position, ray );

      // Test if we intersect with any obstacle mesh
      const collisions = this.caster.intersectObjects( [ this.terrain, this.boundingBox ] );

      // And disable that direction if we do
      if ( collisions.length > 0 && collisions[ 0 ].distance <= this.distance) {

        this.isTweening = true;

        let directionVector = this.camera.getWorldDirection();

        if(rayDirection === 'back') {
          alert('BACK');
          TweenMax.to( this.camera.position, 0.4, {
            x: this.camera.position.y - directionVector.y * -500,
            y: this.camera.position.y - directionVector.y * -500,
            z: this.camera.position.z - directionVector.z * -500,
            ease: Expo.easeOut,
            onComplete: ()=> {
              this.isTweening = false;
            }
          });

        }
        else {

          TweenMax.to( this.camera.position, 0.8, {
            x: this.camera.position.x - directionVector.x * 300,
            y: this.camera.position.y - directionVector.y * 300,
            z: this.camera.position.z - directionVector.z * 300,
            ease: Expo.easeOut,
            onComplete: ()=> {
              this.isTweening = false;
            }
          });
        }

      }
    }

  }

  killTweens() {

    TweenMax.killTweensOf( this.camera.position, {
      x: true,
      y: true,
      z: true
    });

    this.isTweening = false;
  }

  /**
   * update function
   * @param {number} time  Elapsed time from three global clock
   * @param {number} delta Delta time from three global clock
   */
  update( time, delta ) {

    if(this.isTweening) {
        this.checkCollisions('tweening');
    }
    this.player.update( time, delta );
    this.checkCollisions();

  }
}

export default Level;
