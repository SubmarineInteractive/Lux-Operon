/**
 * AmbientLight class
 */
class AmbientLight extends THREE.AmbientLight {

  /**
   * Constructor function
   * @param {Configuration} Configuration instance
   * @param {GUI} Gui instance
   */
  constructor( Configuration, Gui ) {

    const lightColor = Configuration.get( 'lights.ambientLight.color' );
    super( lightColor );

    this.gui = Gui;

    this.initGUI();

  }

  /**
   * initGUI function
   * Add datGui folder
   */
  initGUI() {

    const folder = this.gui.addFolder( 'Ambient Light' );

    folder.addColor( this, 'color' ).onChange( c => new THREE.Color( `rgb(${~~c.r},${~~c.g},${~~c.b})` ) );

  }
}

export default AmbientLight;