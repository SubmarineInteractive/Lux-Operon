/**
 * TerrainGeometry class
 */
class TerrainGeometry extends THREE.PlaneBufferGeometry {

  /**
   * Constructor function
   */
  constructor(Configuration) {
    const terrainGeomConfig = Configuration.get('terrain.geometry');

    super(terrainGeomConfig.width,terrainGeomConfig.depth, terrainGeomConfig.segments.width, terrainGeomConfig.segments.depth);

    this.computeFaceNormals();
    this.computeVertexNormals();
  }
}

export default TerrainGeometry;
