/**
 * TerrainGeometry class
 */
class TerrainGeometry extends THREE.PlaneGeometry {

  /**
   * Constructor function
   * @param {Configuration} Configuration instance
   * @param {TextureLoader} TextureLoader instance
   * @param  {GUI} gui GUI instance
   */
  constructor(Configuration, TextureLoader, gui) {
    const terrainGeomConfig = Configuration.get('terrain.geometry');

    super(terrainGeomConfig.width, terrainGeomConfig.depth, terrainGeomConfig.segments.width, terrainGeomConfig.segments.depth);

    this.gui = gui;

    // this.initGUI();
  }

  /**
   * initGUI function
   * Add datGui folder
   */
  initGUI() {

    const folder = this.gui.addFolder('Terrain Geometry');

    folder.add(this.parameters, 'width', 0, 4000).onChange(()=> {
      this.verticesNeedUpdate = true;

    });
    folder.add(this.parameters, 'height', 0, 4000);
    folder.add(this.parameters, 'widthSegments', 0, 90);
    folder.add(this.parameters, 'heightSegments', 0, 90);
  }

}

export default TerrainGeometry;