/**
 * TerrainMaterial class
 */
class TerrainMaterial extends THREE.MeshPhongMaterial {

  /**
   * Constructor function
   * @param {Configuration} Configuration instance
   * @param  {GUI} gui GUI instance
   */
  constructor(Configuration, gui) {

    super();

    this.gui = gui;

    this.configuration = Configuration.get('terrain.material');

    // Set properties
    this.color = this.configuration.color;

    this.shading = THREE.FlatShading;

    this.shininess = this.configuration.shininess;

    this.emissive = this.configuration.emissive;

    this.specular = this.configuration.specular;

    this.fog = false;

    this.initGUI();
    this.keyboardDebug();
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

    folder.addColor(this, 'specular').onChange((c) => {

      return new THREE.Color(`rgb(${~~c.r},${~~c.g},${~~c.b})`);

    });

    folder.addColor(this, 'emissive').onChange((c) => {

      return new THREE.Color(`rgb(${~~c.r},${~~c.g},${~~c.b})`);

    });

    folder.add(this, 'shininess', 0, 300);
  }

  /**
   * keyboardDebug function
   * Add / Dims displacement scale with B / N key
   */
  keyboardDebug() {

    document.addEventListener('keyup', ev => {

      if(ev.keyCode === 66) {
        this.displacementScale += 50;
      } else if(ev.keyCode === 78) {
        this.displacementScale -= 50;
      }

    }, false);
  }
}

export default TerrainMaterial;