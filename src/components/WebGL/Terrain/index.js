import Cannon from 'cannon';

/**
* Terrain class
*/
class Terrain extends THREE.Mesh {

  /**
  * Constructor function
  * @param {TerrainGeometry} TerrainGeometry instance
  * @param {TerrainMaterial} TerrainMaterial instance
  */
  constructor( TerrainGeometry, TerrainMaterial ) {

    super( TerrainGeometry, TerrainMaterial );

    this.receiveShadow = true;
    this.castShadow = true;

    this.position.set( 0, 0, 0 );
    this.rotation.x = -Math.PI / 2;

    this.world = new Cannon.World();
    this.world.gravity.set( 0, 0, 0 );
    this.world.broadphase = new Cannon.NaiveBroadphase();
    this.world.solver.iterations = 10;


    const data = [];
    const matrix = [];
    const sizeX = 25;
    const sizeY = 30;

    for( let i = 0; i < this.geometry.vertices.length; i + 3) {
      data.push(this.geometry.vertices[i]);
      data.push(this.geometry.vertices[i + 1]);
      data.push(this.geometry.vertices[i + 2]);
    }

    // for (var i = 0; i < sizeX; i++) {
    //     matrix.push([]);
    //     for (var j = 0; j < sizeY; j++) {
    //         var height = Math.cos(i/sizeX * Math.PI * 2)*Math.cos(j/sizeY * Math.PI * 2) + 2;
    //         if(i===0 || i === sizeX-1 || j===0 || j === sizeY-1)
    //             height = 3;
    //         matrix[i].push(height);
    //     }
    // }



    // Create the heightfield shape
    this.heightfieldShape = new Cannon.Heightfield( data, {
      elementSize: 1 // Distance between the data points in X and Y directions
    });

    this.body = new Cannon.Body();
    this.body.addShape( this.heightfieldShape );
    this.world.addBody( this.body );

  }
}

export default Terrain;