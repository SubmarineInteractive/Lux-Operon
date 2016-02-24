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

    this.testAngle = 0;

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
    this.add( this.cube );

    this.boundingBox = BoundingBox;
    this.boundingBox.position.y = ( this.terrain.geometry.boundingBox.max.z - this.terrain.geometry.boundingBox.min.z );

    this.add( this.boundingBox );

    this.axis = new THREE.Vector3( 0, 1, 1 );

    window.onkeydown = (ev) => {
      switch(ev.keyCode) {
        case 87 : //w
          this.axis.x -= 0.1;
          break;
        case 88 : //x
          this.axis.x += 0.1;
          break;
        case 67 : //c
          this.axis.y -= 0.1;
          break;
        case 86 : //v
          this.axis.y += 0.1;
          break;
        case 66 : //b
          this.axis.z -= 0.1;
          break;
        case 78 : //n
          this.axis.z += 0.1;
        case 79 : //o
          this.testAngle -= 5;
        case 80 : //p
          this.testAngle += 5;
          break;
      }

      const material = new THREE.LineBasicMaterial({
        color: 0xff00ff
      });

      var geom = new THREE.Geometry();
      geom.verticesNeedUpdate = true;

      const vector = this.camera.getWorldDirection();
      vector.multiplyScalar( 100 );
      vector.applyAxisAngle(this.axis, this.testAngle);

      // console.info(this.camera.getWorldDirection(), vector);

      const array = [
        vector,
        this.player.position
      ];
      geom.vertices = array;

      const line = new THREE.Line( geom, material );
      this.add( line );

      console.log(this.axis);
      console.log(this.testAngle);

    }
    //
    // var config = this.gui.addFolder('Config');
    // config.add(this.axis, 'x');
    // config.add(this.axis, 'y');
    // config.add(this.axis, 'z');

  }

  /**
   * checkCollisions function
   * Check player collisions and disable direction accordingly
   * @todo Check collisions on mouseMove only
   */
  checkCollisions() {
    // console.log(this.player.rotation);
    // We reset the raycaster to this direction

    // console.log(this.camera.controls.target);
    // console.log(this.camera.controls.target.normalize(), this.camera.getWorldDirection());
    var vec = this.camera.controls.target.clone();
    this.caster.set( this.camera.position, vec.normalize() );
    // this.caster.set( this.player.position, this.camera.getWorldDirection() );

    const material = new THREE.LineBasicMaterial({
      color: 0x0000ff
    });
// console.log(this.camera.getWorldDirection());
    this.geometry = new THREE.Geometry();
    this.geometry.verticesNeedUpdate = true;

    // const angle =  Math.PI / 2;
    // const vector = this.camera.getWorldDirection();
    // vector.multiplyScalar( 100 );
    // vector.applyAxisAngle(this.axis, angle);

    // console.info(this.camera.getWorldDirection(), vector);
// console.log(this.camera.controls.target);
    const array = [
      this.player.position,
      this.camera.controls.target
    ];
    this.geometry.vertices = array;

    const line = new THREE.Line( this.geometry, material );
    this.add( line );

    // Test if we intersect with any obstacle mesh
    const collisions = this.caster.intersectObjects( [ this.terrain, this.cube ] );
    if(collisions.length)
    console.log(collisions);
    // And disable that direction if we do
    if ( collisions.length > 0 && collisions[ 0 ].distance <= this.distance ) {

      this.isTweening = true;

      // let directionVector = this.camera.getWorldDirection();

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
        x: this.camera.position.x - this.camera.controls.target.normalize().x * 200,
        y: this.camera.position.y - this.camera.controls.target.normalize().y * 200,
        z: this.camera.position.z - this.camera.controls.target.normalize().z * 200,
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