/**
 * TerrainMaterial class
 */
class TerrainMaterial extends THREE.MeshPhongMaterial {

  /**
   * Constructor function
   * @param {Configuration} Configuration instance
   * @param {TextureLoader} TextureLoader instance
   * @param  {GUI} gui GUI instance
   */
  constructor(Configuration, TextureLoader, gui) {

    super();

    this.gui = gui;

    this.configuration = Configuration.get('terrain.material');

    const heightMapTexture = TextureLoader.get('heightMap');

    // Set properties
    this.color = this.configuration.color;

    this.map = heightMapTexture;

    this.displacementMap = heightMapTexture;

    this.displacementScale = 900;

    this.shading = THREE.FlatShading;

    this.shininess = 80;

    this.fog = false;

    this.initGUI();
  }

  /**
   * initGUI function
   * Add datGui folder
   */
  initGUI() {

    const folder = this.gui.addFolder('Terrain Material');

    folder.addColor(this, 'color').onChange((c) => {

      return new THREE.Color(`rgb(${~~c.r},${~~c.g},${~~c.b})`);

    });

    folder.add(this, 'shininess', 0, 300);

    folder.add(this, 'displacementScale', 1, 3000);
  }
}

export default TerrainMaterial;