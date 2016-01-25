import Container from 'Container';
import TerrainGeometry from './TerrainGeometry';
import TerrainMaterial from './TerrainMaterial';

/**
 * Terrain class
 */
class Terrain extends THREE.Mesh {

  /**
   * Constructor function
   * @param  {object} options Options
   * @return {void}
   */
  constructor() {
    super();

    this.material = new TerrainMaterial();
    this.geometry = new TerrainGeometry();

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
