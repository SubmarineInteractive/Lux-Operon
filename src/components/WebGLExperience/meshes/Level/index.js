import FishGroup from '../FishGroup';

import points from '../Path/paths/path_1.dae';
import createSpline from 'utils/create-spline';
import { loopIndex, degreeToRadian } from 'utils';

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

    this.curve = createSpline( points );
    this.points = this.curve.getSpacedPoints( 100 );

    fishGroupConfig.map( config => {
      const fishGroup = new FishGroup( config, this.resources, this.curve );
      this.fishGroups.push( fishGroup );

      const geometry = new THREE.Geometry();
      geometry.vertices = this.points;

      const material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, transparent: true, opacity: 0 });

      const path = new THREE.Line( geometry, material );
      path.position.copy( config.position );
      path.rotation.y = degreeToRadian( 90 );

      this.add( path );
      path.add( fishGroup );
    });

    // window.position = path.position;
    //
    // document.addEventListener( 'keydown', ( event ) => {
    //
    //   switch ( event.keyCode ) {
    //     case 90:
    //       path.position.x += 10;
    //       break;
    //     case 65:
    //       path.position.x -= 10;
    //       break;
    //     case 83:
    //       path.position.y += 10;
    //       break;
    //     case 81:
    //       path.position.y -= 10;
    //       break;
    //     case 88:
    //       path.position.z += 10;
    //       break;
    //     case 87:
    //       path.position.z -= 10;
    //       break;
    //   }
    // });

    this.add( this.terrain );
    this.add( this.player );

    this.norm = 0;
  }

  update( time ) {
    this.norm = loopIndex( this.norm + 0.001, 1 );
    this.fishGroups.map( group => {
      group.update( time );
    });
  }
}

export default Level;