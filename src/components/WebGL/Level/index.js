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
    this.fog = Container.get('Fog');
    this.add(this.terrain);
  }

  /**
   * update function
   */
  update() {
    this.fog.update();
  }

}

export default Level;
