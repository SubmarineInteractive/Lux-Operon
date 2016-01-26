/**
 * TerrainGeometry class
 */
class TerrainGeometry extends THREE.PlaneBufferGeometry {

  /**
   * Constructor function
   */
  constructor() {
    super(2000, 2000, 32, 32);

    this.computeFaceNormals();
    this.computeVertexNormals();
  }
}

export default TerrainGeometry;