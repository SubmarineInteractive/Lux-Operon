/**
 * TerrainMaterial class
 */
class TerrainMaterial extends THREE.MeshPhongMaterial {

  /**
   * Constructor function
   * @param {Configuration} Configuration instance
   * @param {GUI} Gui       GUI instance
   */
  constructor( Configuration, Gui ) {

    super();

    this.gui = Gui;

    this.configuration = Configuration.get( 'terrain.material' );

    // Set properties
    this.color = this.configuration.color;

    this.shading = THREE.FlatShading;

    this.shininess = this.configuration.shininess;

    this.emissive = this.configuration.emissive;

    this.specular = this.configuration.specular;

    this.fog = true;

    this.initGUI();
  }

  /**
   * initGUI function
   * Add datGui folder
   */
  initGUI() {

    const folder = this.gui.addFolder( 'Terrain Material' );

    folder.addColor( this, 'color' ).onChange( c => new THREE.Color( `rgb(${~~c.r},${~~c.g},${~~c.b})` ) );

    folder.addColor( this, 'specular' ).onChange( c => new THREE.Color( `rgb(${~~c.r},${~~c.g},${~~c.b})` ) );

    folder.addColor( this, 'emissive' ).onChange( c => new THREE.Color( `rgb(${~~c.r},${~~c.g},${~~c.b})` ) );

    folder.add( this, 'shininess', 0, 300 );
  }
}

export default TerrainMaterial;