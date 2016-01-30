import Container from 'Container';

/**
 * AmbientLight class
 */
class AmbientLight extends THREE.AmbientLight {

  /**
   * Constructor function
   * @param {Configuration} Configuration instance
   * @param {Level} Level instance
   */
  constructor(Configuration, Level) {
    const lightColor = Configuration.get('lights').ambientLight.color;

    super(lightColor);

    this.level = Level;

  }

}

export default AmbientLight;