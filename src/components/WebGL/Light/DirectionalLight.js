/**
 * DirectionalLight class
 */
class DirectionalLight extends THREE.DirectionalLight {

  /**
   * Constructor function
   * @param {Configuration} Configuration instance
   */
  constructor(Configuration, gui) {

    const {color, intensity, position, shadow} = Configuration.get('lights.directionalLight');

    super(color, intensity);

    this.gui = gui;

    this.position.copy( position );
    this.castShadow = true;
    this.shadowDarkness = shadow.darkness;
    this.shadowMapWidth = shadow.width;
    this.shadowMapHeight = shadow.height;

    this.initGUI();

  }

  /**
   * initGUI function
   * Add datGui folder
   */
  initGUI() {

    const folder = this.gui.addFolder('Directional Light');

    folder.addColor(this, 'color').onChange((c) => {

      return new THREE.Color(`rgb(${~~c.r},${~~c.g},${~~c.b})`);

    });

    console.info(this);

    folder.add(this.position, 'x', -1000, 1000);

    folder.add(this.position, 'y', -1000, 1000);

    folder.add(this.position, 'z', -1000, 1000);


    folder.add(this.shadow, 'darkness', 0, 1000);

    folder.add(this.shadow.mapSize, 'x', 0, 9000).name('shadow X');

    folder.add(this.shadow.mapSize, 'y', 0, 9000).name('shadow Y');

  }

}

export default DirectionalLight;