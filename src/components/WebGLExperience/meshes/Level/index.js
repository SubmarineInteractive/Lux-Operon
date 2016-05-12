import FishGroup from '../FishGroup';

import points from '../Path/paths/path_2.dae';
import createSpline from 'utils/create-spline';
import degToRad from 'utils/degree-to-radian';

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

    const curve = createSpline( points );

    const geometry = new THREE.Geometry();
    geometry.vertices = curve.getPoints( 100 );

    const material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });

    const path = new THREE.Line( geometry, material );
    path.position.copy( new THREE.Vector3( -600, 1331, -1194 ) );
    path.rotation.y = degToRad( 90 );
    this.add( path );

    window.position = path.position;

    document.addEventListener( 'keydown', ( event ) => {

      switch ( event.keyCode ) {
        case 90:
          path.position.x += 10;
          break;
        case 65:
          path.position.x -= 10;
          break;
        case 83:
          path.position.y += 10;
          break;
        case 81:
          path.position.y -= 10;
          break;
        case 88:
          path.position.z += 10;
          break;
        case 87:
          path.position.z -= 10;
          break;
      }
    });

    this.add( this.terrain );
    this.add( this.player );

    // this.boundingBox = new BoundingBox( boundingBoxConfig, this.terrain );
    // this.add( this.boundingBox );

    // const groundShape = new Cannon.Box( new Cannon.Vec3( 1700, 1700, 1700 ) );
    // const groundShape = new Cannon.Box( new Cannon.Vec3( this.boundingBox.geometry.parameters.width / 3, this.boundingBox.geometry.parameters.height / 3, this.boundingBox.geometry.parameters.depth / 3 ) );
    // const groundBody = new Cannon.Body({ mass: 0 });
    // groundBody.position.copy( this.boundingBox.position );
    // groundBody.addShape( groundShape );
    // this.world.addBody( groundBody );

    // const debugGeometry = new THREE.BoxGeometry( this.boundingBox.geometry.parameters.width, this.boundingBox.geometry.parameters.height, this.boundingBox.geometry.parameters.depth );
    // const debugGeometry = new THREE.BoxGeometry( 1700 * 2, 1700 * 2, 1700 * 2 );
    // const debugMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00, wireframe: true, wireframeLinewidth: 5 });
    //
    // const mesh = new THREE.Mesh( debugGeometry, debugMaterial );
    // mesh.position.copy( groundBody.position );
    // this.add( mesh );
  }

  update( time ) {
    this.fishGroups.map( group => group.update( time ) );
  }
}

export default Level;