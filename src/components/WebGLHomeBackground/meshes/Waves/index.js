import WavesGeometry from './WavesGeometry';
import WavesMaterial from './WavesMaterial';

/**
 * Waves class
 */
class Waves extends THREE.Mesh {

  /**
   * Constructor function
   * @param {Object} configuration Configuration
   */
  constructor({ geometry, material }) {
    super( new WavesGeometry( geometry ), new WavesMaterial( material ) );

    this.rotation.x = Math.PI / 2;
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    this.material.update( time );
  }
}

export default Waves;