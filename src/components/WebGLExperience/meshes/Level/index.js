import BoundingBox from './BoundingBox';

/**
 * Level class
 */
class Level extends THREE.Object3D {

  /**
   * Constructor function
   * @param {Terrain}     Terrain instance
   * @param {Player}      Player instance
   */
  constructor( Terrain, Player, boundingBoxConfig ) {

    super();

    this.terrain = Terrain;
    this.player = Player;

    this.add( this.terrain );
    this.add( this.player );

    this.boundingBox = new BoundingBox( boundingBoxConfig, this.terrain );
    this.boundingBox.position.y = ( this.terrain.geometry.boundingBox.max.z - this.terrain.geometry.boundingBox.min.z );

    // this.add( this.boundingBox );

  }
}

export default Level;