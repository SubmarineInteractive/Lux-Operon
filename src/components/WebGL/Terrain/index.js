import Cannon from 'cannon';
import Container from 'Container';

/**
* Terrain class
*/
class Terrain extends THREE.Mesh {

  /**
  * Constructor function
  * @param {TerrainGeometry} TerrainGeometry instance
  * @param {TerrainMaterial} TerrainMaterial instance
  * @param {World} World instance
  */
  constructor( TerrainGeometry, TerrainMaterial, World ) {

    super( TerrainGeometry, TerrainMaterial );

    this.world = World;

    this.receiveShadow = true;
    this.castShadow = true;

    this.position.set( 0, 0, 0 );
    this.rotation.x = -Math.PI / 2;

    const data = [];

    for( let i = 0; i < 26; i++ ) {

      data.push( [] );

      for( let j = 0; j < 31; j++ ) {
        data[ i ].push( this.geometry.vertices[ i * j ].clone().z / 10 );
      }
    }

console.log(data);
    // Create the heightfield shape
    this.heightfieldShape = new Cannon.Heightfield( data, {
      elementSize: 27
    });

//     var matrix = [];
//               var sizeX = 500,
//                   sizeY = 500;
//               for (var i = 0; i < sizeX; i++) {
//                   matrix.push([]);
//                   for (var j = 0; j < sizeY; j++) {
//                       var height = Math.cos(i/sizeX * Math.PI * 2)*Math.cos(j/sizeY * Math.PI * 2) + 20;
//                       if(i===0 || i === sizeX-1 || j===0 || j === sizeY-1)
//                           height = 400;
//                       matrix[i].push(height);
//                   }
//               }
// console.log(matrix);
//
//     this.body = new Cannon.Body({ mass: 0 });
//     this.body.position.set( 0, 0, 0 );
//     this.body.addShape( this.heightfieldShape );
//     this.world.addBody( this.body );
//
//
//     const geometryTerrain = new THREE.Geometry();
//
//                var v0 = new Cannon.Vec3();
//                var v1 = new Cannon.Vec3();
//                var v2 = new Cannon.Vec3();
//                for (var xi = 0; xi < this.heightfieldShape.data.length - 1; xi++) {
//                    for (var yi = 0; yi < this.heightfieldShape.data[xi].length - 1; yi++) {
//                        for (var k = 0; k < 2; k++) {
//                            this.heightfieldShape.getConvexTrianglePillar(xi, yi, k===0);
//                            v0.copy(this.heightfieldShape.pillarConvex.vertices[0]);
//                            v1.copy(this.heightfieldShape.pillarConvex.vertices[1]);
//                            v2.copy(this.heightfieldShape.pillarConvex.vertices[2]);
//                            v0.vadd(this.heightfieldShape.pillarOffset, v0);
//                            v1.vadd(this.heightfieldShape.pillarOffset, v1);
//                            v2.vadd(this.heightfieldShape.pillarOffset, v2);
//                            geometryTerrain.vertices.push(
//                                new THREE.Vector3(v0.x, v0.y, v0.z),
//                                new THREE.Vector3(v1.x, v1.y, v1.z),
//                                new THREE.Vector3(v2.x, v2.y, v2.z)
//                            );
//                            var i = geometryTerrain.vertices.length - 3;
//                            geometryTerrain.faces.push(new THREE.Face3(i, i+1, i+2));
//                        }
//                    }
//                }
//                geometryTerrain.computeBoundingSphere();
//                geometryTerrain.computeFaceNormals();
//                const meshTerrain = new THREE.Mesh(geometryTerrain, new THREE.MeshPhongMaterial({color: 0xff000}));
//
// this.add(meshTerrain)
//     const groundShape = new Cannon.Box( new Cannon.Vec3( 100, 100, 100 ) );
//     const groundBody = new Cannon.Body({ mass: 0 });
//     groundBody.addShape( groundShape );
//     this.world.addBody( groundBody );
//
//     const geometry = new THREE.BoxGeometry( 100 * 2, 100 * 2, 100 * 2 );
//     const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
//
//     const mesh = new THREE.Mesh( geometry, material );
//     mesh.position.x = 200;
//     this.add( mesh );
  }
}

export default Terrain;