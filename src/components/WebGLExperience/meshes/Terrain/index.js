import Cannon from 'cannon';
import TerrainGeometry from './TerrainGeometry';
import TerrainMaterial from './TerrainMaterial';

/**
* Terrain class
*/
class Terrain extends THREE.Mesh {

  /**
  * Constructor function
  * @param {World} World instance
  */
  constructor( World, { geometry, material }, heightMapTexture ) {

    super( new TerrainGeometry( geometry, heightMapTexture ), new TerrainMaterial( material ) );

    this.world = World;

    // Shadows
    this.receiveShadow = true;
    this.castShadow = true;

    this.geometry.computeBoundingBox();

    // Position
    this.position.set( - ( this.geometry.boundingBox.max.x - this.geometry.boundingBox.min.x ) / 2, 0, ( this.geometry.boundingBox.max.z - this.geometry.boundingBox.min.z ) );
    this.rotation.x = - Math.PI / 2;

    // Create the heightfield shape
    this.heightfieldShape = new Cannon.Heightfield( this.geometry.matrix, {
      elementSize: 200
    });

    // Physics
    this.body = new Cannon.Body({ mass: 0 });
    this.body.position.copy( this.position );
    this.body.addShape( this.heightfieldShape );

    this.world.addBody( this.body );

    this.body.quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), - Math.PI / 2 );

    // const geometryTerrain = new THREE.Geometry();
    //
    // let v0 = new Cannon.Vec3();
    // let v1 = new Cannon.Vec3();
    // let v2 = new Cannon.Vec3();
    // for ( let xi = 0; xi < this.heightfieldShape.data.length - 1; xi++ ) {
    //   for ( let yi = 0; yi < this.heightfieldShape.data[ xi ].length - 1; yi++ ) {
    //     for ( let k = 0; k < 2; k++ ) {
    //       this.heightfieldShape.getConvexTrianglePillar( xi, yi, k===0 );
    //       v0.copy( this.heightfieldShape.pillarConvex.vertices[ 0 ] );
    //       v1.copy( this.heightfieldShape.pillarConvex.vertices[ 1 ] );
    //       v2.copy( this.heightfieldShape.pillarConvex.vertices[ 2 ] );
    //       v0.vadd( this.heightfieldShape.pillarOffset, v0 );
    //       v1.vadd( this.heightfieldShape.pillarOffset, v1 );
    //       v2.vadd( this.heightfieldShape.pillarOffset, v2 );
    //       geometryTerrain.vertices.push(
    //         new THREE.Vector3( v0.x, v0.y, v0.z ),
    //         new THREE.Vector3( v1.x, v1.y, v1.z ),
    //         new THREE.Vector3( v2.x, v2.y, v2.z )
    //       );
    //       let i = geometryTerrain.vertices.length - 3;
    //       geometryTerrain.faces.push( new THREE.Face3( i, i+1, i+2 ) );
    //     }
    //   }
    // }
    // geometryTerrain.computeBoundingSphere();
    // geometryTerrain.computeBoundingBox();
    // geometryTerrain.computeFaceNormals();

    // const meshTerrain = new THREE.Mesh( geometryTerrain, new THREE.MeshPhongMaterial({ color: 0xff000 }) );
    // this.add( meshTerrain );
  }
}

export default Terrain;