import Container from 'Container';

/**
 * Terrain class
 */
class Terrain extends THREE.Object3D {

  /**
   * Constructor function
   * @param  {object} options Options
   * @return {void}
   */
  constructor() {
    super();
    this.mesh = null;
    this.texture = null;
    this.clock = Container.get('Clock');
  }

  /**
   * Constructor function
   * @return {void}
   */
  init() {

  }

  /**
   * Constructor function
   * @return {void}
   */
  animate() {

  }

}

export default Terrain;