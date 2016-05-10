import BoundingBox from './BoundingBox';
import FishGroup from '../FishGroup';

/**
 * Level class
 */
class Level extends THREE.Object3D {

  /**
   * Constructor function
   * @param {Terrain} Terrain           Terrain instance
   * @param {Player}  Player            Player instance
   * @param {Object}  boundingBoxConfig Bounding box configuration
   * @param {Object}  fishGroupConfig   Fish group configuration
   * @param {Object}  resources         Resources
   */
  constructor( Terrain, Player, boundingBoxConfig, fishGroupConfig, resources ) {

    super();

    this.terrain = Terrain;
    this.player = Player;
    this.resources = resources;
    this.fishGroups = [];

    fishGroupConfig.map( config => {
      const fishGroup = new FishGroup( config, this.resources );
      this.fishGroups.push( fishGroup );
      this.add( fishGroup );
    });

    this.add( this.terrain );
    this.add( this.player );

    this.boundingBox = new BoundingBox( boundingBoxConfig, this.terrain );
    this.boundingBox.position.y = ( this.terrain.geometry.boundingBox.max.z - this.terrain.geometry.boundingBox.min.z );

    // this.add( this.boundingBox );

  }
}

export default Level;