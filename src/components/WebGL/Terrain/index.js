/**
 * Terrain class
 */
class Terrain extends THREE.Mesh {

  /**
   * Constructor function
   * @param {TerrainGeometry} TerrainGeometry instance
   * @param {TerrainMaterial} TerrainMaterial instance
   */
  constructor(TerrainGeometry, TerrainMaterial) {
    super();

    this.geometry = TerrainGeometry;
    this.material = TerrainMaterial;

    this.position.set( 0, -200, 0 );
    this.rotation.x = -Math.PI / 2;
    this.visible = true;
  }
}

export default Terrain;