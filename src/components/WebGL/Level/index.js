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

    this.terrain = Terrain;
    this.player = Player;

    this.add( this.terrain );
    this.add( this.player );

    this.boundingBox = BoundingBox;
    this.boundingBox.position.y = ( this.terrain.geometry.boundingBox.max.z - this.terrain.geometry.boundingBox.min.z );

    this.add( this.boundingBox );

  }

  /**
   * update function
   * @param {number} time  Elapsed time from three global clock
   * @param {number} delta Delta time from three global clock
   */
  update( time, delta ) {

    this.player.update( time, delta );

  }
}

export default Level;