import THREE from 'three';

/**
 * PlaneGeometry class
 */
class PlaneGeometry extends THREE.PlaneGeometry {

  /**
   * Constructor function
   */
  constructor() {
    super( 5000, 2000, 20, 20 );
  }
}

export default PlaneGeometry;