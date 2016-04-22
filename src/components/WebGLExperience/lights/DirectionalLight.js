/**
 * DirectionalLight class
 */
class DirectionalLight extends THREE.DirectionalLight {

  /**
   * Constructor function
   * @param {Object} configuration Configuration instance
   */
  constructor( configuration ) {

    const { color, intensity } = configuration;

    super( color, intensity );
  }

  /**
   * move function
   * Move the light where the camera is
   * @param {object} newPos Position vector of the camera
   */
  move( newPos ) {
    this.position.copy( newPos );
  }

}

export default DirectionalLight;