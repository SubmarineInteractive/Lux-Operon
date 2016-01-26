import Container from 'Container';

/**
 * Level class
 */
class Level extends THREE.Object3D {

  /**
   * Constructor function
   */
  constructor() {
    super();

    this.terrain = Container.get('Terrain');
    this.add(this.terrain);
  }

}

export default Level;