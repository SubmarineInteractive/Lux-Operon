/**
 * AmbientLight class
 */
class AmbientLight extends THREE.AmbientLight {

  /**
   * Constructor function
   * @param {Configuration} configuration Configuration instance
   */
  constructor( configuration ) {

    const lightColor = configuration.color;
    super( lightColor );
  }
}

export default AmbientLight;