import Container from 'Container';

/**
 * AmbientLight class
 */
class AmbientLight extends THREE.AmbientLight {

  /**
   * Constructor function
   * @param {Configuration} Configuration instance
   */
  constructor(Configuration) {

    const lightColor = Configuration.get('lights.ambientLight.color');

    super(lightColor);

  }

}

export default AmbientLight;